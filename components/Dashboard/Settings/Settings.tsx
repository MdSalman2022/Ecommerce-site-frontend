'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-hot-toast';
import { Megaphone, Loader2, Store, Share2, Layout, Bell, ShoppingCart, Search, Settings } from 'lucide-react'; 
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
    { id: 'seo', label: 'SEO', icon: Search },
    { id: 'maintenance', label: 'Maintenance', icon: Settings },
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

        
        {/* SEO Tab Content */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO & Metadata</CardTitle>
              <CardDescription>Optimize your store for search engines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Meta Title</Label>
                <Input 
                  value={settings.seo.metaTitle}
                  onChange={(e) => updateSetting('seo', 'metaTitle', e.target.value)}
                  placeholder="BestDeal - E-commerce"
                />
                <p className="text-[10px] text-muted-foreground mt-1">Recommended: 50-60 characters</p>
              </div>
              
              <div>
                <Label>Meta Description</Label>
                <textarea 
                  className="w-full min-h-[100px] p-3 rounded-md border border-input bg-background"
                  value={settings.seo.metaDescription}
                  onChange={(e) => updateSetting('seo', 'metaDescription', e.target.value)}
                  placeholder="High quality electronics at best prices..."
                />
                <p className="text-[10px] text-muted-foreground mt-1">Recommended: 150-160 characters</p>
              </div>

              <div>
                <Label>Meta Keywords</Label>
                <Input 
                  value={settings.seo.metaKeywords}
                  onChange={(e) => updateSetting('seo', 'metaKeywords', e.target.value)}
                  placeholder="electronics, gaming, best deals"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <Label>Google Analytics ID</Label>
                  <Input 
                    value={settings.seo.googleAnalyticsId}
                    onChange={(e) => updateSetting('seo', 'googleAnalyticsId', e.target.value)}
                    placeholder="UA-XXXXX-Y"
                  />
                </div>
                <div>
                  <Label>Facebook Pixel ID</Label>
                  <Input 
                    value={settings.seo.facebookPixelId}
                    onChange={(e) => updateSetting('seo', 'facebookPixelId', e.target.value)}
                    placeholder="1234567890"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={() => handleSave('seo')} disabled={isSaving}>
              {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Save SEO Settings
            </Button>
          </div>
        </TabsContent>

        {/* Maintenance Tab Content */}
        <TabsContent value="maintenance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Mode</CardTitle>
              <CardDescription>Take your site offline for updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-100 rounded-xl">
                <div>
                  <p className="font-bold text-amber-900">Enable Maintenance Mode</p>
                  <p className="text-sm text-amber-700">Only admins can access the site when this is active</p>
                </div>
                <Switch 
                  checked={settings.maintenance.enabled}
                  onCheckedChange={(checked) => updateSetting('maintenance', 'enabled', checked)}
                />
              </div>

              <div>
                <Label>Maintenance Message</Label>
                <Input 
                  value={settings.maintenance.message}
                  onChange={(e) => updateSetting('maintenance', 'message', e.target.value)}
                  placeholder="We are currently under maintenance..."
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={() => handleSave('maintenance')} disabled={isSaving}>
              {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Save Maintenance Settings
            </Button>
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}

export default DashboardSettings;

