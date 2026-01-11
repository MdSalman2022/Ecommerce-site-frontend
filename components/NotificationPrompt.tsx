"use client";

import React, {useState, useEffect} from "react";
import {useAuth} from "@/contexts/AuthProvider";
import {useNotifications} from "@/hooks/useNotifications";
import {Bell, X} from "lucide-react";
import {Button} from "@/components/ui/button";

// Notification permission prompt for users
export default function NotificationPrompt() {
  const {user} = useAuth();
  const {requestPermission, isSupported, permission, isLoading} =
    useNotifications();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log("[NotificationPrompt] useEffect triggered");
    console.log("[NotificationPrompt] user:", user);
    console.log("[NotificationPrompt] isSupported:", isSupported);
    console.log("[NotificationPrompt] permission:", permission);

    // Only show for logged-in users with supported browser and default permission
    if (!user) {
      console.log("[NotificationPrompt] No user, skipping");
      return;
    }

    if (!isSupported) {
      console.log("[NotificationPrompt] Not supported, skipping");
      return;
    }

    // Already granted or denied - don't show
    if (permission !== "default") {
      console.log(
        "[NotificationPrompt] Permission is not default:",
        permission
      );
      return;
    }

    // Check if dismissed recently
    const dismissedAt = localStorage.getItem("notification_prompt_dismissed");
    console.log("[NotificationPrompt] dismissedAt:", dismissedAt);
    if (dismissedAt) {
      const daysSinceDismissed =
        (Date.now() - new Date(dismissedAt).getTime()) / (1000 * 60 * 60 * 24);
      console.log(
        "[NotificationPrompt] Days since dismissed:",
        daysSinceDismissed
      );
      if (daysSinceDismissed < 7) {
        console.log("[NotificationPrompt] Dismissed within 7 days, skipping");
        return;
      }
    }

    // Show modal after 1.5 seconds
    console.log(
      "[NotificationPrompt] All checks passed, will show modal in 1.5s"
    );
    const timer = setTimeout(() => {
      console.log("[NotificationPrompt] Setting showModal to true");
      setShowModal(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [user, isSupported, permission]);

  const handleEnable = async () => {
    await requestPermission();
    setShowModal(false);
  };

  const handleDismiss = () => {
    setShowModal(false);
    localStorage.setItem(
      "notification_prompt_dismissed",
      new Date().toISOString()
    );
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-in fade-in zoom-in-95 duration-300">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-primary" />
          </div>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Stay Updated!
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Enable push notifications to receive order updates, exclusive deals,
            and important announcements instantly.
          </p>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleDismiss}
              className="flex-1"
            >
              Maybe Later
            </Button>
            <Button
              onClick={handleEnable}
              disabled={isLoading}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Enabling...
                </span>
              ) : (
                "Enable Notifications"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
