"use client";

import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {useAuth} from "@/contexts/AuthProvider";
import {useRouter} from "next/navigation";
import {
  User,
  ShoppingBag,
  Heart,
  Receipt,
  LogOut,
  ChevronRight,
  Edit,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {toast} from "react-hot-toast";

export default function ProfilePage() {
  const {user, logout} = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  if (!user) {
    router.push("/login");
    return null;
  }

  const menuItems = [
    {
      icon: ShoppingBag,
      label: "Order History",
      href: "/orderhistory",
      description: "Track your orders",
    },
    {
      icon: Heart,
      label: "Wishlist",
      href: "/wishlist",
      description: "Your saved items",
    },
    {
      icon: Receipt,
      label: "Transactions",
      href: "/dashboard/transactions",
      description: "Payment history",
      adminOnly: true,
    },
  ];

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        toast.success("Profile updated successfully");
        setIsEditing(false);
        // Update user context if needed
        window.location.reload();
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-8">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <Card className="p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={80}
                  height={80}
                  className="rounded-full object-cover ring-4 ring-gray-100"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-10 h-10 text-primary" />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.name}
                </h1>
                <p className="text-gray-500">{user.email}</p>
                {user.role && (
                  <span className="inline-block mt-1 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    {user.role}
                  </span>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>

          {/* Edit Profile Form */}
          {isEditing && (
            <form
              onSubmit={handleUpdateProfile}
              className="space-y-4 border-t pt-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({...formData, name: e.target.value})
                    }
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({...formData, email: e.target.value})
                    }
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({...formData, phone: e.target.value})
                    }
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({...formData, address: e.target.value})
                    }
                    placeholder="123 Main St, City, Country"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button type="submit">Save Changes</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}

          {/* Profile Info Display (when not editing) */}
          {!isEditing && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-6">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
              {user.phone && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>
              )}
              {user.address && (
                <div className="flex items-center gap-3 text-gray-600 md:col-span-2">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="font-medium">{user.address}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Menu Items */}
        <div className="space-y-3 mb-6">
          {menuItems.map((item) => {
            if (item.adminOnly && !["admin", "moderator"].includes(user.role)) {
              return null;
            }

            return (
              <Link key={item.label} href={item.href}>
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {item.label}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </Card>
              </Link>
            );
          })}

          {/* Dashboard Link for Admin/Moderator */}
          {["admin", "moderator"].includes(user.role) && (
            <Link href="/dashboard">
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Dashboard</h3>
                      <p className="text-sm text-gray-500">
                        Admin panel access
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Card>
            </Link>
          )}
        </div>

        {/* Logout Button */}
        <Card className="p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 text-red-600 font-medium hover:bg-red-50 py-2 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </Card>
      </div>
    </div>
  );
}
