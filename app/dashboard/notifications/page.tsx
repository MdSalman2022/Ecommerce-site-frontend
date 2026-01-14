'use client';

import React, { useState } from 'react';
import { Bell, Send, Users, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function NotificationsPage() {
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        url: '',
        targetPreference: 'all',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setResult(null);

        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`${API_URL}/api/notifications/broadcast`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: formData.title,
                    body: formData.body,
                    url: formData.url || undefined,
                    targetPreference: formData.targetPreference === 'all' ? undefined : formData.targetPreference,
                }),
            });

            const data = await response.json();
            
            if (data.success) {
                setResult(data);
                toast.success(`Sent to ${data.sent} devices!`);
                // Reset form
                setFormData({ title: '', body: '', url: '', targetPreference: 'all' });
            } else {
                toast.error(data.message || 'Failed to send notification');
            }
        } catch (error) {
            console.error('Broadcast error:', error);
            toast.error('Failed to send notification');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>


            <div className="grid lg:grid-cols-2 gap-6">
                {/* Send Notification Form */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        Broadcast Notification
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Notification Title *</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Flash Sale: 50% OFF!"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="body">Message *</Label>
                            <textarea
                                id="body"
                                value={formData.body}
                                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                                placeholder="Don't miss out on our biggest sale of the year! Limited time only."
                                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
                                rows={3}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="url">Click URL (optional)</Label>
                            <Input
                                id="url"
                                value={formData.url}
                                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                placeholder="/products?sale=true"
                            />
                            <p className="text-xs text-gray-500">URL to open when user clicks the notification</p>
                        </div>

                        <div className="space-y-2">
                            <Label>Target Audience</Label>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { value: 'all', label: 'All Subscribed' },
                                    { value: 'promotions', label: 'Promotions Enabled' },
                                    { value: 'newProducts', label: 'New Products Enabled' },
                                ].map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, targetPreference: option.value })}
                                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                            formData.targetPreference === option.value
                                                ? 'bg-primary text-white'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                                        }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading || !formData.title || !formData.body}
                            className="w-full"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Sending...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Send className="w-4 h-4" />
                                    Send Notification
                                </span>
                            )}
                        </Button>
                    </form>
                </div>

                {/* Results Panel */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Last Broadcast Result
                    </h2>

                    {result ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-blue-600">{result.totalUsers}</div>
                                    <div className="text-sm text-gray-500">Users Targeted</div>
                                </div>
                                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-purple-600">{result.totalTokens}</div>
                                    <div className="text-sm text-gray-500">Total Devices</div>
                                </div>
                                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-green-600 flex items-center justify-center gap-1">
                                        <CheckCircle className="w-5 h-5" />
                                        {result.sent}
                                    </div>
                                    <div className="text-sm text-gray-500">Sent Successfully</div>
                                </div>
                                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-red-600 flex items-center justify-center gap-1">
                                        <XCircle className="w-5 h-5" />
                                        {result.failed}
                                    </div>
                                    <div className="text-sm text-gray-500">Failed</div>
                                </div>
                            </div>

                            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <p className="text-sm text-gray-600 dark:text-gray-300">{result.message}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-400">
                            <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p>No broadcast sent yet</p>
                            <p className="text-sm">Send a notification to see results here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
