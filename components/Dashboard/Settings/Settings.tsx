'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-hot-toast';
import { Megaphone, Loader2, Store, Share2, Layout, Bell, ShoppingCart } from 'lucide-react';
import NotificationSettings from './NotificationSettings';
import { useSiteSettings, StoreSettings } from '@/hooks/useSiteSettings';

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

function DashboardSettings() {
  const { settings: initialSettings, refetch, isLoading: initialLoading } = useSiteSettings();
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [activeTab, setActiveTab] = useState('layout');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (initialSettings) {
      setSettings(initialSettings);
    }
  }, [initialSettings]);

  const handleSave = async (section: keyof StoreSettings) => {
    if (!settings) return;
    
    setIsSaving(true);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/api/settings/${section}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(settings[section]),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`Settings saved successfully!`);
        refetch();
      } else {
        toast.error(data.message || 'Failed to save');
      }
    } catch (error) {
      console.error('Failed to save:', error);
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const updateSetting = (section: keyof StoreSettings, key: string, value: any) => {
    setSettings(prev => {
      if (!prev) return null;
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value
        }
      };
    });
  };

  const updateNestedSetting = (section: keyof StoreSettings, parent: string, key: string, value: any) => {
    setSettings(prev => {
      if (!prev) return null;
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [parent]: {
            // @ts-ignore
            ...prev[section][parent],
            [key]: value
          }
        }
      };
    });
  };

  const tabsConfig = [
    { id: 'layout', label: 'Layout', icon: Layout },
    { id: 'store', label: 'Store Info', icon: Store },
    { id: 'social', label: 'Social', icon: Share2 },
    { id: 'ecommerce', label: 'E-commerce', icon: ShoppingCart },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!settings) return null;

  return (
    <div className="py-6 px-4 md:px-6 w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Store Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your global store configuration</p>
        </div>
      </div>

      <Tabs defaultValue="layout" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full h-auto gap-2 bg-transparent p-0">
          {tabsConfig.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="data-[state=active]:bg-primary data-[state=active]:text-white border px-4 py-3 rounded-lg flex items-center gap-2">
              <tab.icon className="w-4 h-4" /> {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ================== LAYOUT SETTINGS ================== */}
        <TabsContent value="layout" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-primary" /> Announcement Bar
              </CardTitle>
              <CardDescription>Manage the top announcement bar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Enable Announcement Bar</p>
                  <p className="text-sm text-muted-foreground">Show top bar on all pages</p>
                </div>
                <Switch 
                  checked={settings.layout.announcementBar.enabled}
                  onCheckedChange={(checked) => updateNestedSetting('layout', 'announcementBar', 'enabled', checked)}
                />
              </div>

              <div>
                <Label>Announcement Text</Label>
                <Input 
                  value={settings.layout.announcementBar.text}
                  onChange={(e) => updateNestedSetting('layout', 'announcementBar', 'text', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Background Color</Label>
                  <div className="flex gap-2 mt-1">
                    <Input 
                      type="color"
                      value={settings.layout.announcementBar.backgroundColor || '#4F46E5'}
                      onChange={(e) => updateNestedSetting('layout', 'announcementBar', 'backgroundColor', e.target.value)}
                      className="w-12 h-10 p-1 cursor-pointer"
                    />
                    <Input 
                      value={settings.layout.announcementBar.backgroundColor}
                      onChange={(e) => updateNestedSetting('layout', 'announcementBar', 'backgroundColor', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label>Text Color</Label>
                  <div className="flex gap-2 mt-1">
                    <Input 
                      type="color"
                      value={settings.layout.announcementBar.textColor || '#FFFFFF'}
                      onChange={(e) => updateNestedSetting('layout', 'announcementBar', 'textColor', e.target.value)}
                      className="w-12 h-10 p-1 cursor-pointer"
                    />
                    <Input 
                      value={settings.layout.announcementBar.textColor}
                      onChange={(e) => updateNestedSetting('layout', 'announcementBar', 'textColor', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Header Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Show Search Bar</p>
                </div>
                <Switch 
                  checked={settings.layout.header.showSearchBar}
                  onCheckedChange={(checked) => updateNestedSetting('layout', 'header', 'showSearchBar', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Show Wishlist Button</p>
                </div>
                <Switch 
                  checked={settings.layout.header.showWishlist}
                  onCheckedChange={(checked) => updateNestedSetting('layout', 'header', 'showWishlist', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Show Compare Button</p>
                </div>
                <Switch 
                  checked={settings.layout.header.showCompare}
                  onCheckedChange={(checked) => updateNestedSetting('layout', 'header', 'showCompare', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={() => handleSave('layout')} disabled={isSaving}>
              {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Save Layout Settings
            </Button>
          </div>
        </TabsContent>

        {/* ================== STORE INFO ================== */}
        <TabsContent value="store" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>Basic details about your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Store Name</Label>
                  <Input 
                    value={settings.store.name}
                    onChange={(e) => updateSetting('store', 'name', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Tagline</Label>
                  <Input 
                    value={settings.store.tagline}
                    onChange={(e) => updateSetting('store', 'tagline', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Email</Label>
                  <Input 
                    value={settings.store.email}
                    onChange={(e) => updateSetting('store', 'email', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input 
                    value={settings.store.phone}
                    onChange={(e) => updateSetting('store', 'phone', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>Address</Label>
                <Input 
                  value={settings.store.address}
                  onChange={(e) => updateSetting('store', 'address', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Currency</Label>
                  <Input 
                    value={settings.store.currency}
                    onChange={(e) => updateSetting('store', 'currency', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Currency Symbol</Label>
                  <Input 
                    value={settings.store.currencySymbol}
                    onChange={(e) => updateSetting('store', 'currencySymbol', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={() => handleSave('store')} disabled={isSaving}>
              {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Save Store Info
            </Button>
          </div>
        </TabsContent>

        {/* ================== SOCIAL ================== */}
        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>Connect your social profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Facebook</Label>
                  <Input 
                    value={settings.social.facebook}
                    onChange={(e) => updateSetting('social', 'facebook', e.target.value)}
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div>
                  <Label>Instagram</Label>
                  <Input 
                    value={settings.social.instagram}
                    onChange={(e) => updateSetting('social', 'instagram', e.target.value)}
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div>
                  <Label>Twitter / X</Label>
                  <Input 
                    value={settings.social.twitter}
                    onChange={(e) => updateSetting('social', 'twitter', e.target.value)}
                    placeholder="https://twitter.com/..."
                  />
                </div>
                <div>
                  <Label>YouTube</Label>
                  <Input 
                    value={settings.social.youtube}
                    onChange={(e) => updateSetting('social', 'youtube', e.target.value)}
                    placeholder="https://youtube.com/..."
                  />
                </div>
                <div>
                  <Label>LinkedIn</Label>
                  <Input 
                    value={settings.social.linkedin}
                    onChange={(e) => updateSetting('social', 'linkedin', e.target.value)}
                    placeholder="https://linkedin.com/..."
                  />
                </div>
                <div>
                  <Label>WhatsApp</Label>
                  <Input 
                    value={settings.social.whatsapp}
                    onChange={(e) => updateSetting('social', 'whatsapp', e.target.value)}
                    placeholder="Bottom right chat widget number"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={() => handleSave('social')} disabled={isSaving}>
              {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Save Social Links
            </Button>
          </div>
        </TabsContent>

        {/* ================== E-COMMERCE ================== */}
        <TabsContent value="ecommerce" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Store Functionality</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable Guest Checkout</p>
                  <p className="text-sm text-muted-foreground">Allow users to buy without account</p>
                </div>
                <Switch 
                  checked={settings.ecommerce.enableGuestCheckout}
                  onCheckedChange={(checked) => updateSetting('ecommerce', 'enableGuestCheckout', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Show Out of Stock Items</p>
                  <p className="text-sm text-muted-foreground">Keep sold out items visible in catalog</p>
                </div>
                <Switch 
                  checked={settings.ecommerce.showOutOfStock}
                  onCheckedChange={(checked) => updateSetting('ecommerce', 'showOutOfStock', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable Reviews</p>
                  <p className="text-sm text-muted-foreground">Allow customers to review products</p>
                </div>
                <Switch 
                  checked={settings.ecommerce.enableReviews}
                  onCheckedChange={(checked) => updateSetting('ecommerce', 'enableReviews', checked)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <Label>Min Order Amount</Label>
                  <Input 
                    type="number"
                    value={settings.ecommerce.minOrderAmount}
                    onChange={(e) => updateSetting('ecommerce', 'minOrderAmount', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Free Shipping Threshold</Label>
                  <Input 
                    type="number"
                    value={settings.ecommerce.freeShippingThreshold}
                    onChange={(e) => updateSetting('ecommerce', 'freeShippingThreshold', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Default Shipping Cost</Label>
                  <Input 
                    type="number"
                    value={settings.ecommerce.defaultShippingCost}
                    onChange={(e) => updateSetting('ecommerce', 'defaultShippingCost', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Low Stock Threshold</Label>
                  <Input 
                    type="number"
                    value={settings.ecommerce.lowStockThreshold}
                    onChange={(e) => updateSetting('ecommerce', 'lowStockThreshold', Number(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={() => handleSave('ecommerce')} disabled={isSaving}>
              {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Save E-commerce Settings
            </Button>
          </div>
        </TabsContent>

        {/* ================== NOTIFICATIONS ================== */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email & Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Admin Notification Email</Label>
                <Input 
                  value={settings.notifications.adminEmail}
                  onChange={(e) => updateSetting('notifications', 'adminEmail', e.target.value)}
                  placeholder="admin@example.com"
                />
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Order Alerts</p>
                    <p className="text-sm text-muted-foreground">Notify admin when order is placed</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.newOrderAlert}
                    onCheckedChange={(checked) => updateSetting('notifications', 'newOrderAlert', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Low Stock Alerts</p>
                    <p className="text-sm text-muted-foreground">Notify when stock is low</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.lowStockAlert}
                    onCheckedChange={(checked) => updateSetting('notifications', 'lowStockAlert', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Customer Order Confirmation</p>
                    <p className="text-sm text-muted-foreground">Send email to customer on purchase</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.orderConfirmationEmail}
                    onCheckedChange={(checked) => updateSetting('notifications', 'orderConfirmationEmail', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={() => handleSave('notifications')} disabled={isSaving}>
              {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Save Notification Settings
            </Button>
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}

export default DashboardSettings;

