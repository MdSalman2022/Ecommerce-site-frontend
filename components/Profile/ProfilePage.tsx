"use client";

import React, {useState, useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import {useAuth} from "@/contexts/AuthProvider";
import {useRouter} from "next/navigation";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {
  User,
  ShoppingBag,
  Heart,
  LogOut,
  ChevronRight,
  Edit,
  Package,
  Truck,
  CheckCircle,
  Clock,
  X,
  Save,
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {toast} from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function ProfilePage() {
  const {user, logout, loading} = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isEditingShipping, setIsEditingShipping] = useState(false);

  const [shippingFormData, setShippingFormData] = useState({
    name: "",
    contact: "",
    email: "",
    address: "",
    city: "",
  });

  // Fetch user's orders
  const {data: orders = []} = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await fetch(`${API_URL}/api/orders/user/${user.email}`);
      if (!res.ok) return [];
      return res.json();
    },
    enabled: !!user?.email,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Fetch shipping address
  const {data: shippingData} = useQuery({
    queryKey: ["shipping", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await fetch(`${API_URL}/api/users/shipping/${user.email}`);
      if (!res.ok) return null;
      const json = await res.json();
      return json.data;
    },
    enabled: !!user?.email,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    onSuccess: (data) => {
      if (data) {
        setShippingFormData({
          name: data.name || "",
          contact: data.contact || "",
          email: data.email || "",
          address: data.address || "",
          city: data.city || "",
        });
      }
    },
  });

  // Update shipping mutation
  const updateShippingMutation = useMutation({
    mutationFn: async (data: typeof shippingFormData) => {
      const res = await fetch(`${API_URL}/api/users/shipping`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({...data, email: user?.email}),
      });
      if (!res.ok) throw new Error("Failed to update shipping");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["shipping"]});
      toast.success("Shipping address updated");
      setIsEditingShipping(false);
    },
    onError: () => {
      toast.error("Failed to update shipping address");
    },
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  // Return null while redirecting
  if (!user) {
    return null;
  }

  const handleUpdateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    updateShippingMutation.mutate(shippingFormData);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleEditShipping = () => {
    if (shippingData) {
      setShippingFormData({
        name: shippingData.name || "",
        contact: shippingData.contact || "",
        email: shippingData.email || "",
        address: shippingData.address || "",
        city: shippingData.city || "",
      });
    }
    setIsEditingShipping(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "shipped":
        return <Truck className="w-4 h-4 text-blue-500" />;
      case "processing":
        return <Package className="w-4 h-4 text-orange-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const recentOrders = orders.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-8">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Mobile/Tablet: Single Column */}
        <div className="lg:hidden space-y-6">
          {/* Profile Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-gray-900 truncate">
                    {user.name}
                  </h2>
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  {user.role && (
                    <Badge variant="secondary" className="mt-1">
                      {user.role}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-primary/5 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-primary">
                    {orders.length}
                  </p>
                  <p className="text-xs text-gray-600">Orders</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {
                      orders.filter((o: any) => o.shipment === "delivered")
                        .length
                    }
                  </p>
                  <p className="text-xs text-gray-600">Delivered</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <Link href="/orderhistory" className="block">
                  <Button variant="ghost" className="w-full justify-start">
                    <ShoppingBag className="w-4 h-4 mr-3" />
                    Order History
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </Button>
                </Link>
                <Link href="/wishlist" className="block">
                  <Button variant="ghost" className="w-full justify-start">
                    <Heart className="w-4 h-4 mr-3" />
                    Wishlist
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </Button>
                </Link>
                <Separator />
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders - Mobile */}
          {recentOrders.length > 0 && (
            <Card className="hidden md:block">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-base">Recent Orders</CardTitle>
                <Link href="/orderhistory">
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentOrders.map((order: any) => (
                  <Link
                    key={order._id}
                    href={`/orders/${order.orderId || order._id}`}
                    className="block"
                  >
                    <div className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.shipment)}
                          <p className="font-semibold text-xs">
                            #
                            {order.orderId || order._id.slice(-8).toUpperCase()}
                          </p>
                        </div>
                        <Badge
                          variant={
                            order.shipment === "delivered"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {order.shipment || "Processing"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                        <span className="font-bold text-primary">
                          ৳{order.amount?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Shipping Address - Mobile */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base">Shipping Address</CardTitle>
              {shippingData && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleEditShipping}
                  className="h-8"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {shippingData ? (
                <div className="space-y-2 text-sm">
                  <p className="font-semibold">{shippingData.name}</p>
                  <p className="text-gray-600">{shippingData.contact}</p>
                  <p className="text-gray-600">
                    {shippingData.address}, {shippingData.city}
                  </p>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500 mb-3">
                    No shipping address saved
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleEditShipping}
                  >
                    Add Address
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Mobile Sheet for Editing Shipping */}
          <Sheet open={isEditingShipping} onOpenChange={setIsEditingShipping}>
            <SheetContent
              side="bottom"
              className="h-fit overflow-y-auto rounded-t-3xl"
            >
              <SheetHeader>
                <SheetTitle>
                  {shippingData ? "Edit" : "Add"} Shipping Address
                </SheetTitle>
                <SheetDescription>
                  Update your default shipping information
                </SheetDescription>
              </SheetHeader>
              <form onSubmit={handleUpdateShipping} className="space-y-4 mt-6">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={shippingFormData.name}
                    onChange={(e) =>
                      setShippingFormData({
                        ...shippingFormData,
                        name: e.target.value,
                      })
                    }
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <Label>Contact</Label>
                  <Input
                    value={shippingFormData.contact}
                    onChange={(e) =>
                      setShippingFormData({
                        ...shippingFormData,
                        contact: e.target.value,
                      })
                    }
                    placeholder="Phone number"
                    required
                  />
                </div>
                <div>
                  <Label>Address</Label>
                  <Input
                    value={shippingFormData.address}
                    onChange={(e) =>
                      setShippingFormData({
                        ...shippingFormData,
                        address: e.target.value,
                      })
                    }
                    placeholder="Street address"
                    required
                  />
                </div>
                <div>
                  <Label>City</Label>
                  <Input
                    value={shippingFormData.city}
                    onChange={(e) =>
                      setShippingFormData({
                        ...shippingFormData,
                        city: e.target.value,
                      })
                    }
                    placeholder="City"
                    required
                  />
                </div>
                <SheetFooter className="grid grid-cols-2 gap-5 sm:gap-0 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditingShipping(false)}
                    className="h-12 text-lg"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={updateShippingMutation.isPending}
                    className="h-12 text-lg"
                  >
                    {updateShippingMutation.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </SheetFooter>
              </form>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop: Two Column Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <User className="w-12 h-12 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    {user.name}
                  </h2>
                  <p className="text-sm text-gray-500 mb-3">{user.email}</p>
                  {user.role && <Badge variant="secondary">{user.role}</Badge>}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <Link href="/orderhistory">
                    <Button variant="ghost" className="w-full justify-start">
                      <ShoppingBag className="w-4 h-4 mr-3" />
                      Order History
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </Button>
                  </Link>
                  <Link href="/wishlist">
                    <Button variant="ghost" className="w-full justify-start">
                      <Heart className="w-4 h-4 mr-3" />
                      Wishlist
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </Button>
                  </Link>
                  <Separator className="my-2" />
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Orders */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Link href="/orderhistory">
                  <Button variant="ghost" size="sm">
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {recentOrders.length > 0 ? (
                  <div className="space-y-4">
                    {recentOrders.map((order: any) => (
                      <Link
                        key={order._id}
                        href={`/orders/${order.orderId || order._id}`}
                      >
                        <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(order.shipment)}
                              <p className="font-semibold text-sm">
                                Order #
                                {order.orderId ||
                                  order._id.slice(-8).toUpperCase()}
                              </p>
                            </div>
                            <Badge
                              variant={
                                order.shipment === "delivered"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {order.shipment || "Processing"}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                            <span className="font-bold text-primary">
                              ৳{order.amount?.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 mb-4">No orders yet</p>
                    <Link href="/">
                      <Button variant="outline" size="sm">
                        Start Shopping
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Shipping Address</CardTitle>
                {shippingData && !isEditingShipping && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEditShipping}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {isEditingShipping ? (
                  <form onSubmit={handleUpdateShipping} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Name</Label>
                        <Input
                          value={shippingFormData.name}
                          onChange={(e) =>
                            setShippingFormData({
                              ...shippingFormData,
                              name: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label>Contact</Label>
                        <Input
                          value={shippingFormData.contact}
                          onChange={(e) =>
                            setShippingFormData({
                              ...shippingFormData,
                              contact: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <Label>Address</Label>
                        <Input
                          value={shippingFormData.address}
                          onChange={(e) =>
                            setShippingFormData({
                              ...shippingFormData,
                              address: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label>City</Label>
                        <Input
                          value={shippingFormData.city}
                          onChange={(e) =>
                            setShippingFormData({
                              ...shippingFormData,
                              city: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        disabled={updateShippingMutation.isPending}
                      >
                        Save Changes
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditingShipping(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : shippingData ? (
                  <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900">
                        {shippingData.name}
                      </p>
                      <Badge variant="outline">Default</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {shippingData.contact}
                    </p>
                    {shippingData.email && (
                      <p className="text-sm text-gray-600">
                        {shippingData.email}
                      </p>
                    )}
                    <p className="text-sm text-gray-600">
                      {shippingData.address}, {shippingData.city}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">
                      No shipping address saved
                    </p>
                    <Button variant="outline" onClick={handleEditShipping}>
                      Add Address
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
