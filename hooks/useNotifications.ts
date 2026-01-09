'use client';

import { useEffect, useState, useCallback } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { getMessaging, getToken, onMessage, Messaging } from 'firebase/messaging';
import { useAuth } from '@/contexts/AuthProvider';
import { toast } from 'react-hot-toast';

// Firebase config - these should be in your .env.local
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

// Initialize Firebase only on client side
let messaging: Messaging | null = null;

const initializeFirebaseMessaging = () => {
    if (typeof window === 'undefined') return null;
    
    try {
        // Check if already initialized
        const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
        messaging = getMessaging(app);
        return messaging;
    } catch (error) {
        console.warn('Firebase messaging not supported:', error);
        return null;
    }
};

export function useNotifications() {
    const { user } = useAuth();
    const [permission, setPermission] = useState<NotificationPermission>('default');
    const [fcmToken, setFcmToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Check permission status on mount
    useEffect(() => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            setPermission(Notification.permission);
        }
    }, []);

    // Request permission and get FCM token
    const requestPermission = useCallback(async () => {
        if (typeof window === 'undefined' || !('Notification' in window)) {
            toast.error('Push notifications not supported in this browser');
            return false;
        }

        setIsLoading(true);

        try {
            const result = await Notification.requestPermission();
            setPermission(result);

            if (result === 'granted') {
                // Initialize messaging and get token
                const msg = initializeFirebaseMessaging();
                if (!msg) {
                    throw new Error('Firebase messaging not available');
                }

                let registration;

                // Robust Service Worker Registration
                if ('serviceWorker' in navigator) {
                    // Try to get existing registration
                    registration = await navigator.serviceWorker.getRegistration();

                    if (!registration) {
                        console.log('Registering new service worker...');
                        registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
                    }

                    // Wait for it to be active
                    if (!registration.active) {
                        await new Promise<void>((resolve) => {
                            const serviceWorker = registration!.installing || registration!.waiting;
                            if (serviceWorker) {
                                serviceWorker.addEventListener('statechange', (e) => {
                                    if ((e.target as ServiceWorker).state === 'activated') {
                                        resolve();
                                    }
                                });
                            } else {
                                resolve();
                            }
                        });
                    }

                    // Ensure pushManager is available
                    if (!registration.pushManager) {
                        console.error('PushManager missing on registration:', registration);
                        throw new Error('Push manager not available - browser may not support push notifications');
                    }
                }

                const token = await getToken(msg, {
                    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
                    serviceWorkerRegistration: registration,
                });

                if (token) {
                    setFcmToken(token);
                    
                    // Register token with backend if user is logged in
                    if (user) {
                        await registerToken(token);
                    }
                    
                    toast.success('Push notifications enabled!');
                    return true;
                }
            } else if (result === 'denied') {
                toast.error('Notification permission denied');
            }
            return false;
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            toast.error('Failed to enable notifications');
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    // Register token with backend
    const registerToken = async (token: string) => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) return;

        try {
            await fetch(`${API_URL}/api/notifications/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ token, device: 'web' }),
            });
        } catch (error) {
            console.error('Failed to register FCM token:', error);
        }
    };

    // Remove token on logout
    const removeTokenOnLogout = async () => {
        if (!fcmToken) return;
        
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) return;

        try {
            await fetch(`${API_URL}/api/notifications/token`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ token: fcmToken }),
            });
        } catch (error) {
            console.error('Failed to remove FCM token:', error);
        }
    };

    // Listen for foreground messages
    useEffect(() => {
        if (typeof window === 'undefined' || permission !== 'granted') return;

        const msg = initializeFirebaseMessaging();
        if (!msg) return;

        const unsubscribe = onMessage(msg, (payload) => {
            console.log('Foreground message:', payload);
            
            // Show toast notification for foreground messages
            if (payload.notification) {
                toast(payload.notification.body || 'New notification', {
                    icon: '🔔',
                    duration: 5000,
                });
            }
        });

        return () => unsubscribe();
    }, [permission]);

    // Re-register token when user logs in
    useEffect(() => {
        if (user && fcmToken) {
            registerToken(fcmToken);
        }
    }, [user, fcmToken]);

    return {
        permission,
        fcmToken,
        isLoading,
        isSupported: typeof window !== 'undefined' && 'Notification' in window,
        requestPermission,
        removeTokenOnLogout,
    };
}
