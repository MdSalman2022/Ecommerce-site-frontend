"use client";

import {useState, useEffect, use} from "react";
import {useRouter} from "next/navigation";
import {useAuth} from "@/contexts/AuthProvider";
import {toast} from "react-hot-toast";
import {Button} from "@/components/ui/button";
import {
  Shield,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Loader2,
  Mail,
} from "lucide-react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

interface InvitationDetails {
  email: string;
  role: "admin" | "moderator";
  invitedBy: string;
  expiresAt: string;
}

export default function AcceptInvitationPage({
  params,
}: {
  params: Promise<{token: string}>;
}) {
  const resolvedParams = use(params);
  const {token} = resolvedParams;
  const router = useRouter();
  const {user, isLoading: authLoading, refreshUser} = useAuth();

  const [invitation, setInvitation] = useState<InvitationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Fetch invitation details
  useEffect(() => {
    const fetchInvitation = async () => {
      try {
        const res = await fetch(`${API_URL}/api/team/invite/${token}`);
        const data = await res.json();

        if (res.ok) {
          setInvitation(data.data.invitation);
        } else {
          setError(data.message || "Invalid or expired invitation");
        }
      } catch (err) {
        setError("Failed to load invitation");
      } finally {
        setLoading(false);
      }
    };

    fetchInvitation();
  }, [token]);

  // Handle accept invitation
  const handleAccept = async () => {
    if (!user) return;

    setAccepting(true);
    const accessToken = localStorage.getItem("accessToken");

    try {
      const res = await fetch(`${API_URL}/api/team/accept/${token}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        toast.success(`You are now a ${invitation?.role}!`);

        // Refresh user data to update role
        await refreshUser();

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        setError(data.message || "Failed to accept invitation");
      }
    } catch (err) {
      setError("Failed to accept invitation");
    } finally {
      setAccepting(false);
    }
  };

  // Loading state
  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading invitation...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Invalid Invitation
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link href="/">
            <Button>Go to Homepage</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Welcome to the Team!
          </h1>
          <p className="text-gray-600 mb-6">
            You are now a{" "}
            <span className="font-semibold capitalize">{invitation?.role}</span>
            . Redirecting to dashboard...
          </p>
          <Loader2 className="h-5 w-5 animate-spin text-primary mx-auto" />
        </div>
      </div>
    );
  }

  // Not logged in - redirect to signup with email
  if (!user && invitation) {
    const signupUrl = `/register?invite=${token}&email=${encodeURIComponent(
      invitation.email
    )}`;

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-6">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                invitation.role === "admin" ? "bg-purple-100" : "bg-blue-100"
              }`}
            >
              {invitation.role === "admin" ? (
                <ShieldCheck className="h-8 w-8 text-purple-500" />
              ) : (
                <Shield className="h-8 w-8 text-blue-500" />
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              You&apos;re Invited!
            </h1>
            <p className="text-gray-600 mt-2">
              <span className="font-semibold">{invitation.invitedBy}</span> has
              invited you to join BestDeal
            </p>
          </div>

          {/* Role Badge */}
          <div
            className={`rounded-lg p-4 mb-6 text-center ${
              invitation.role === "admin" ? "bg-purple-50" : "bg-blue-50"
            }`}
          >
            <span
              className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${
                invitation.role === "admin"
                  ? "bg-purple-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {invitation.role.toUpperCase()}
            </span>
            <p
              className={`text-sm mt-2 ${
                invitation.role === "admin"
                  ? "text-purple-700"
                  : "text-blue-700"
              }`}
            >
              {invitation.role === "admin"
                ? "Full access to manage products, orders, team, and settings"
                : "Access to manage products, orders, and moderate content"}
            </p>
          </div>

          {/* Email Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Invitation for</p>
                <p className="font-medium">{invitation.email}</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <Link href={signupUrl}>
            <Button className="w-full" size="lg">
              Create Account & Join Team
            </Button>
          </Link>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link
              href={`/login?redirect=/invite/${token}`}
              className="text-primary hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    );
  }

  // Logged in but wrong email
  if (user && invitation && user.email !== invitation.email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="h-8 w-8 text-amber-500" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Wrong Account
          </h1>
          <p className="text-gray-600 mb-2">This invitation was sent to:</p>
          <p className="font-medium text-gray-900 mb-4">{invitation.email}</p>
          <p className="text-gray-600 mb-6">
            You are logged in as{" "}
            <span className="font-medium">{user.email}</span>. Please log out
            and use the correct account.
          </p>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                localStorage.removeItem("accessToken");
                router.push("/");
              }}
            >
              Log Out
            </Button>
            <Link href="/">
              <Button variant="ghost" className="w-full">
                Go to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Logged in with correct email - show accept button
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              invitation?.role === "admin" ? "bg-purple-100" : "bg-blue-100"
            }`}
          >
            {invitation?.role === "admin" ? (
              <ShieldCheck className="h-8 w-8 text-purple-500" />
            ) : (
              <Shield className="h-8 w-8 text-blue-500" />
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Accept Invitation
          </h1>
          <p className="text-gray-600 mt-2">
            <span className="font-semibold">{invitation?.invitedBy}</span> has
            invited you to join BestDeal
          </p>
        </div>

        {/* Role Badge */}
        <div
          className={`rounded-lg p-4 mb-6 text-center ${
            invitation?.role === "admin" ? "bg-purple-50" : "bg-blue-50"
          }`}
        >
          <span
            className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${
              invitation?.role === "admin"
                ? "bg-purple-500 text-white"
                : "bg-blue-500 text-white"
            }`}
          >
            {invitation?.role.toUpperCase()}
          </span>
          <p
            className={`text-sm mt-2 ${
              invitation?.role === "admin" ? "text-purple-700" : "text-blue-700"
            }`}
          >
            {invitation?.role === "admin"
              ? "Full access to manage products, orders, team, and settings"
              : "Access to manage products, orders, and moderate content"}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 rounded-lg p-3 mb-4 text-sm">
            {error}
          </div>
        )}

        {/* CTA */}
        <Button
          className="w-full"
          size="lg"
          onClick={handleAccept}
          disabled={accepting}
        >
          {accepting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Accepting...
            </>
          ) : (
            "Accept & Join Team"
          )}
        </Button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Logged in as <span className="font-medium">{user?.email}</span>
        </p>
      </div>
    </div>
  );
}
