"use client";

import React, {useState, useEffect, useRef} from "react";
import {BsCart4} from "react-icons/bs";
import {TbFileInvoice} from "react-icons/tb";
import {MdDoneAll, MdSync} from "react-icons/md";
import {BiError, BiSearch} from "react-icons/bi";
import {HiSortAscending, HiRefresh} from "react-icons/hi";
import {FaAngleDown, FaCheck} from "react-icons/fa";
import {useUserActivity} from "@/contexts/UserActivityProvider";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import OrderDetailsModal from "./OrderDetailsModal";

function DashboardOrders() {
  const {orders, refetchOrders} = useUserActivity();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [sortType, setSortType] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [pendingStatusChanges, setPendingStatusChanges] = useState<
    Record<string, string>
  >({});
  const [localOrders, setLocalOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [dialogMessage, setDialogMessage] = useState<{
    title: string;
    description: string;
  } | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const syncLockRef = useRef(false);

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Auto-sync courier status when switching to courier tab
  useEffect(() => {
    if (activeTab === "courier" && !syncLockRef.current) {
      syncLockRef.current = true;
      handleSyncCourierStatus().finally(() => {
        // Allow periodic re-sync without spam
        setTimeout(() => {
          syncLockRef.current = false;
        }, 30000);
      });
    }
  }, [activeTab]);

  const ordersArray = Array.isArray(orders) ? orders : [];

  // Sync local orders with fetched orders (initial load)
  React.useEffect(() => {
    if (
      !searchQuery &&
      !statusFilter &&
      statusFilter === "all" &&
      !dateFrom &&
      !dateTo
    ) {
      setLocalOrders(ordersArray);
    }
  }, [orders]);

  // Debounced backend search
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // If no filters, use the original orders
    const hasFilters =
      searchQuery.trim() || statusFilter !== "all" || dateFrom || dateTo;

    if (!hasFilters) {
      setLocalOrders(ordersArray);
      return;
    }

    // Set 300ms debounce
    searchTimeoutRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const token = localStorage.getItem("accessToken");
        const params = new URLSearchParams();

        if (searchQuery.trim()) params.append("query", searchQuery.trim());
        if (statusFilter !== "all") params.append("status", statusFilter);
        if (dateFrom) params.append("dateFrom", dateFrom);
        if (dateTo) params.append("dateTo", dateTo);

        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_SERVER_URL
          }/api/orders/search?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (data.success) {
          setLocalOrders(data.orders);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, statusFilter, dateFrom, dateTo, ordersArray]);

  // Apply tab filter on top of search results
  const filteredOrders = React.useMemo(() => {
    let result = localOrders;

    // Tab filter
    switch (activeTab) {
      case "courier":
        result = result.filter((o) => o.courierInfo?.consignmentId);
        break;
      case "abandoned":
        result = result.filter((o) => o.orderStatus === "abandoned");
        break;
    }

    return result;
  }, [activeTab, localOrders]);

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const ordersPerPage = filteredOrders.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(filteredOrders.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Sorting
  const sortedItems = () => {
    const items = [...ordersPerPage];
    switch (sortType) {
      case "latest":
        return items.sort(
          (a: any, b: any) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      case "old":
        return items.sort(
          (a: any, b: any) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      default:
        return items;
    }
  };

  const displayItems = sortType === "" ? ordersPerPage : sortedItems();

  const handleCheckboxClick = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Select All handler
  const handleSelectAll = () => {
    if (selectedIds.length === displayItems.length && displayItems.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(displayItems.map((order: any) => order._id));
    }
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/deleteOrder`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ids: selectedIds}),
      });

      // Update local state by filtering out deleted orders
      setLocalOrders((prev) =>
        prev.filter((order) => !selectedIds.includes(order._id))
      );
      setSelectedIds([]);
    } catch (err) {
      console.error(err);
      setDialogMessage({
        title: "Error",
        description: "Failed to delete orders. Please try again.",
      });
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setPendingStatusChanges((prev) => ({...prev, [orderId]: newStatus}));
  };

  const handleSaveStatus = async (orderId: string) => {
    const newStatus = pendingStatusChanges[orderId];
    if (!newStatus) return;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/orderstatus`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ids: [orderId], status: newStatus}),
      });

      // Update local state
      setLocalOrders((prev) =>
        prev.map((o: any) =>
          o._id === orderId ? {...o, orderStatus: newStatus} : o
        )
      );

      // Remove pending change
      setPendingStatusChanges((prev) => {
        const newState = {...prev};
        delete newState[orderId];
        return newState;
      });
    } catch (err) {
      console.error(err);
      setDialogMessage({
        title: "Error",
        description: "Failed to update status. Please try again.",
      });
    }
  };

  const handleUpdateStatus = async (status: string) => {
    if (selectedIds.length === 0) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/orderstatus`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ids: selectedIds, status}),
      });

      // Update local state with the new status for selected orders
      setLocalOrders((prev) =>
        prev.map((order) =>
          selectedIds.includes(order._id)
            ? {...order, orderStatus: status}
            : order
        )
      );
      setSelectedIds([]);
    } catch (err) {
      console.error(err);
      setDialogMessage({
        title: "Error",
        description: "Failed to update status. Please try again.",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "cancelled":
        return "bg-red-100 text-red-700 hover:bg-red-200";
      case "delivered":
        return "bg-green-100 text-green-700 hover:bg-green-200";
      case "shipped":
        return "bg-blue-100 text-blue-700 hover:bg-blue-200";
      case "processing":
        return "bg-purple-100 text-purple-700 hover:bg-purple-200";
      case "returned":
        return "bg-gray-100 text-gray-700 hover:bg-gray-200";
      default:
        return "bg-orange-100 text-orange-700 hover:bg-orange-200";
    }
  };

  const getCourierStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "hold":
        return "bg-yellow-100 text-yellow-700";
      case "in_review":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-orange-100 text-orange-700";
      case "partial_delivered":
        return "bg-emerald-100 text-emerald-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getCourierStatusLabel = (status: string) => {
    if (!status) return "Sent";
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleSendToCourier = async (orderId: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setDialogMessage({
          title: "Authentication Required",
          description: "Please log in to send orders to courier.",
        });
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/order/courier`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({orderId}),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Update local state with courier info and new status
        setLocalOrders((prev) =>
          prev.map((order) =>
            order._id === orderId
              ? {
                  ...order,
                  courierInfo: data.courierInfo,
                  orderStatus: "shipped", // Sync with backend change
                }
              : order
          )
        );
        setDialogMessage({
          title: "Success",
          description: "Order sent to Steadfast Courier successfully!",
        });
      } else {
        setDialogMessage({
          title: "Error",
          description:
            data.message || "Failed to send to courier. Please try again.",
        });
      }
    } catch (err) {
      console.error(err);
      setDialogMessage({
        title: "Error",
        description: "Failed to connect to courier service. Please try again.",
      });
    }
  };

  const handleRefreshOrders = async () => {
    setIsRefreshing(true);
    try {
      await refetchOrders();
    } catch (err) {
      console.error(err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSyncCourierStatus = async () => {
    const courierOrders = localOrders.filter(
      (o) => o.courierInfo?.consignmentId
    );
    if (courierOrders.length === 0) {
      setDialogMessage({
        title: "No Courier Orders",
        description: "There are no orders with courier information to sync.",
      });
      return;
    }

    setIsSyncing(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/order/sync-courier`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({orderIds: courierOrders.map((o) => o._id)}),
        }
      );

      const data = await response.json();
      if (data.success) {
        if (data.updatedOrders && data.updatedOrders.length > 0) {
          const updatedMap = new Map(
            data.updatedOrders.map((o: any) => [o._id, o])
          );
          setLocalOrders((prev) =>
            prev.map((order) =>
              updatedMap.has(order._id)
                ? {...order, ...updatedMap.get(order._id)}
                : order
            )
          );
        }

        // Removed dialog for silent sync
      }
    } catch (err) {
      console.error(err);
      setDialogMessage({
        title: "Error",
        description: "Failed to sync with courier service.",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="py-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <div className="flex items-center gap-4 bg-card border border-border p-5 rounded-xl hover:shadow-md transition-shadow">
          <BsCart4 className="text-4xl p-2 w-12 h-12 rounded-lg bg-primary/10 text-primary" />
          <div>
            <p className="text-muted-foreground text-sm">Total Orders</p>
            <p className="text-2xl font-bold">{localOrders.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-card border border-border p-5 rounded-xl hover:shadow-md transition-shadow">
          <TbFileInvoice className="text-4xl p-2 w-12 h-12 rounded-lg bg-green-500/10 text-green-500" />
          <div>
            <p className="text-muted-foreground text-sm">Delivered</p>
            <p className="text-2xl font-bold">
              {
                localOrders.filter((o: any) => o.orderStatus === "delivered")
                  .length
              }
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-card border border-border p-5 rounded-xl hover:shadow-md transition-shadow">
          <MdDoneAll className="text-4xl p-2 w-12 h-12 rounded-lg bg-blue-500/10 text-blue-500" />
          <div>
            <p className="text-muted-foreground text-sm">Courier</p>
            <p className="text-2xl font-bold">
              {
                localOrders.filter((o: any) => o.courierInfo?.consignmentId)
                  .length
              }
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-card border border-border p-5 rounded-xl hover:shadow-md transition-shadow">
          <BiError className="text-4xl p-2 w-12 h-12 rounded-lg bg-red-500/10 text-red-500" />
          <div>
            <p className="text-muted-foreground text-sm">Abandoned</p>
            <p className="text-2xl font-bold">
              {
                localOrders.filter(
                  (o: any) =>
                    o.orderStatus === "cancelled" ||
                    o.orderStatus === "returned"
                ).length
              }
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters Row */}
      <div className="flex flex-wrap items-center gap-3 mb-6 bg-card border border-border p-4 rounded-xl">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Order ID, Name, or Phone..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-border rounded-lg px-3 py-2 bg-background text-sm min-w-[140px]"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
          <option value="returned">Returned</option>
        </select>

        {/* Date Range */}
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => {
              setDateFrom(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-border rounded-lg px-3 py-2 bg-background text-sm"
            title="From Date"
          />
          <span className="text-gray-400">to</span>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => {
              setDateTo(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-border rounded-lg px-3 py-2 bg-background text-sm"
            title="To Date"
          />
        </div>

        {/* Clear Filters */}
        {(searchQuery || statusFilter !== "all" || dateFrom || dateTo) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
              setDateFrom("");
              setDateTo("");
              setCurrentPage(1);
            }}
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            Clear Filters
          </Button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Tabs
            value={activeTab}
            onValueChange={(value) => {
              setActiveTab(value);
              setCurrentPage(1);
              setSelectedIds([]);
            }}
            className="w-auto"
          >
            <TabsList className="mb-0">
              <TabsTrigger value="all">All ({localOrders.length})</TabsTrigger>
              <TabsTrigger value="abandoned">
                Abandoned (
                {
                  localOrders.filter(
                    (o: any) =>
                      o.orderStatus === "cancelled" ||
                      o.orderStatus === "returned"
                  ).length
                }
                )
              </TabsTrigger>
              <TabsTrigger value="courier">
                Courier (
                {
                  localOrders.filter((o: any) => o.courierInfo?.consignmentId)
                    .length
                }
                )
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-2 bg-card"
            onClick={handleRefreshOrders}
            disabled={isRefreshing}
          >
            <HiRefresh
              className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>

        <div className="flex items-center gap-3">
          {selectedIds.length > 0 && (
            <span className="text-sm text-muted-foreground mr-2 font-medium">
              {selectedIds.length} selected
            </span>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="default"
                size="sm"
                className="h-9 bg-gray-800 text-white hover:bg-gray-700"
                disabled={selectedIds.length === 0}
              >
                Bulk Actions <FaAngleDown className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleDelete}>
                Delete Selected
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleUpdateStatus("pending")}>
                Mark Pending
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleUpdateStatus("processing")}
              >
                Mark Processing
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleUpdateStatus("shipped")}>
                Mark Shipped
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleUpdateStatus("delivered")}>
                Mark Delivered
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleUpdateStatus("cancelled")}
                className="text-red-600"
              >
                Cancel Selected
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <select
            value={postsPerPage}
            onChange={(e) => {
              setPostsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-border rounded-md px-3 h-9 bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <HiSortAscending className="text-lg" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortType("latest")}>
                Latest First
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortType("old")}>
                Oldest First
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsContent value={activeTab} className="mt-0">
          {/* Orders Table */}
          <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        selectedIds.length === displayItems.length &&
                        displayItems.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="w-52">Status</TableHead>
                  <TableHead className="w-44">Courier</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayItems.map((order: any, index: number) => (
                  <TableRow
                    key={order._id}
                    className="hover:bg-muted/30 h-[64px]"
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.includes(order._id)}
                        onCheckedChange={() => handleCheckboxClick(order._id)}
                      />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {indexOfFirstPost + index + 1}
                    </TableCell>
                    <TableCell
                      className="text-xs font-medium text-primary cursor-pointer hover:underline"
                      onClick={() => setSelectedOrder(order)}
                    >
                      #{order.orderId || order._id.slice(0, 8).toUpperCase()}
                    </TableCell>
                    <TableCell className="font-medium">{order.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(order.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col text-xs">
                        <span className="font-medium">{order.contact}</span>
                        <span className="text-muted-foreground">
                          {order.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 min-h-[32px]">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-7 text-xs px-3 rounded-full capitalize font-medium ${getStatusColor(
                                pendingStatusChanges[order._id] ||
                                  order.orderStatus ||
                                  "pending"
                              )}`}
                            >
                              {pendingStatusChanges[order._id] ||
                                order.orderStatus ||
                                "pending"}
                              <FaAngleDown className="ml-1.5 h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(order._id, "pending")
                              }
                            >
                              Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(order._id, "processing")
                              }
                            >
                              Processing
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(order._id, "shipped")
                              }
                            >
                              Shipped
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(order._id, "delivered")
                              }
                            >
                              Delivered
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(order._id, "cancelled")
                              }
                              className="text-red-600"
                            >
                              Cancelled
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(order._id, "returned")
                              }
                            >
                              Returned
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="w-16">
                          {pendingStatusChanges[order._id] && (
                            <Button
                              size="sm"
                              className="h-7 text-xs px-2.5 bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => handleSaveStatus(order._id)}
                            >
                              <FaCheck className="mr-1 h-3 w-3" />
                              Save
                            </Button>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {order.courierInfo?.consignmentId ? (
                        <div className="flex flex-col justify-center gap-1.5 h-full py-1">
                          <div
                            className={`flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full w-fit uppercase ${getCourierStatusColor(
                              order.courierInfo.status
                            )}`}
                          >
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current"></span>
                            </span>
                            {getCourierStatusLabel(order.courierInfo.status)}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono leading-tight">
                            <span
                              title={`Consignment ID: ${order.courierInfo.consignmentId}`}
                            >
                              #{order.courierInfo.consignmentId}
                            </span>
                            <span className="text-gray-300">|</span>
                            <div
                              className="cursor-pointer hover:text-primary transition-colors flex items-center gap-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(
                                  order.courierInfo.trackingCode
                                );
                              }}
                              title="Click to copy Tracking Code"
                            >
                              {order.courierInfo.trackingCode}
                            </div>
                          </div>
                        </div>
                      ) : order.orderStatus === "delivered" ? (
                        <div className="flex items-center gap-1.5 opacity-60">
                          <FaCheck className="h-3 w-3 text-green-600" />
                          <span className="text-xs font-medium text-gray-500 italic">
                            Delivered
                          </span>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs border-dashed hover:border-solid w-full"
                          onClick={() => handleSendToCourier(order._id)}
                          disabled={
                            order.orderStatus === "cancelled" ||
                            order.orderStatus === "returned"
                          }
                        >
                          Send to Courier
                        </Button>
                      )}
                    </TableCell>
                    <TableCell className="font-semibold text-right">
                      ৳{order.amount?.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {pageNumbers.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {pageNumbers.map((number) => (
                <Button
                  key={number}
                  variant={currentPage === number ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(number)}
                >
                  {number}
                </Button>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          allOrders={localOrders}
        />
      )}

      {/* Error/Success Dialog */}
      <Dialog
        open={!!dialogMessage}
        onOpenChange={() => setDialogMessage(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogMessage?.title}</DialogTitle>
            <DialogDescription>{dialogMessage?.description}</DialogDescription>
          </DialogHeader>
          <Button onClick={() => setDialogMessage(null)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DashboardOrders;
