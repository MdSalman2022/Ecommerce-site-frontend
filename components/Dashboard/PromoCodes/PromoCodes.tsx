'use client';

import React, { useState, useEffect } from 'react';
import { Tag, Plus, Trash2, ToggleLeft, ToggleRight, Calendar, Percent, DollarSign, Users, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResponsiveModal } from '@/components/ui/responsive-modal';
import { toast } from 'react-hot-toast';

interface PromoCode {
  _id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount: number;
  maxDiscount: number | null;
  usageLimit: number | null;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
}

export default function PromoCodes() {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discountType: 'percentage',
    discountValue: 10,
    minOrderAmount: 0,
    maxDiscount: '',
    usageLimit: '',
    validUntil: '',
  });

  useEffect(() => {
    fetchPromoCodes();
  }, []);

  const fetchPromoCodes = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/promo`);
      const data = await res.json();
      if (data.success) {
        setPromoCodes(data.promoCodes);
      }
    } catch (error) {
      console.error('Error fetching promo codes:', error);
      toast.error('Failed to load promo codes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/promo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          maxDiscount: formData.maxDiscount ? Number(formData.maxDiscount) : null,
          usageLimit: formData.usageLimit ? Number(formData.usageLimit) : null,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success('Promo code created!');
        setIsDialogOpen(false);
        setFormData({
          code: '',
          description: '',
          discountType: 'percentage',
          discountValue: 10,
          minOrderAmount: 0,
          maxDiscount: '',
          usageLimit: '',
          validUntil: '',
        });
        fetchPromoCodes();
      } else {
        toast.error(data.error || 'Failed to create promo code');
      }
    } catch (error) {
      toast.error('Failed to create promo code');
    }
  };

  const handleToggle = async (id: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/promo/${id}/toggle`, {
        method: 'PATCH',
      });
      const data = await res.json();
      if (data.success) {
        setPromoCodes(promoCodes.map(p => 
          p._id === id ? { ...p, isActive: data.isActive } : p
        ));
        toast.success(data.message);
      }
    } catch (error) {
      toast.error('Failed to toggle promo code');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this promo code?')) return;
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/promo/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setPromoCodes(promoCodes.filter(p => p._id !== id));
        toast.success('Promo code deleted');
      }
    } catch (error) {
      toast.error('Failed to delete promo code');
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success('Code copied!');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isExpired = (date: string) => new Date(date) < new Date();

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48" />
          <div className="h-64 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Tag className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-gray-900">Promo Codes</h1>
          <span className="text-sm text-gray-500">({promoCodes.length})</span>
        </div>
        
        <ResponsiveModal
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          title="Create Promo Code"
          trigger={
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Create Code
            </Button>
          }
          footer={
            <Button type="submit" form="promo-form" className="w-full bg-primary hover:bg-primary/90">
              Create Promo Code
            </Button>
          }
        >
            <form id="promo-form" onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="code">Code *</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="SUMMER20"
                    className="uppercase mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="discountType">Type</Label>
                  <select
                    id="discountType"
                    value={formData.discountType}
                    onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed ($)</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summer sale discount"
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="discountValue">Discount Value *</Label>
                  <Input
                    id="discountValue"
                    type="number"
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                    min={0}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="minOrderAmount">Min Order ($)</Label>
                  <Input
                    id="minOrderAmount"
                    type="number"
                    value={formData.minOrderAmount}
                    onChange={(e) => setFormData({ ...formData, minOrderAmount: Number(e.target.value) })}
                    min={0}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="maxDiscount">Max Discount ($)</Label>
                  <Input
                    id="maxDiscount"
                    type="number"
                    value={formData.maxDiscount}
                    onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                    placeholder="No limit"
                    min={0}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="usageLimit">Usage Limit</Label>
                  <Input
                    id="usageLimit"
                    type="number"
                    value={formData.usageLimit}
                    onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                    placeholder="Unlimited"
                    min={0}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="validUntil">Expires On *</Label>
                <Input
                  id="validUntil"
                  type="date"
                  value={formData.validUntil}
                  onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                  className="mt-1"
                  required
                />
              </div>
            </form>
        </ResponsiveModal>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Codes</p>
          <p className="text-2xl font-bold text-gray-900">{promoCodes.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-bold text-green-600">
            {promoCodes.filter(p => p.isActive && !isExpired(p.validUntil)).length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Expired</p>
          <p className="text-2xl font-bold text-red-600">
            {promoCodes.filter(p => isExpired(p.validUntil)).length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Uses</p>
          <p className="text-2xl font-bold text-blue-600">
            {promoCodes.reduce((sum, p) => sum + p.usedCount, 0)}
          </p>
        </div>
      </div>

      {/* Promo Codes List */}
      {promoCodes.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Tag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">No Promo Codes</h3>
          <p className="text-gray-500 mb-4">Create your first promo code to offer discounts</p>
          <Button onClick={() => setIsDialogOpen(true)} className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Create First Code
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Code</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Discount</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Usage</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Expires</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {promoCodes.map((promo) => (
                  <tr key={promo._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-gray-900">{promo.code}</span>
                        <button
                          onClick={() => copyCode(promo.code)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {copiedCode === promo.code ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      {promo.description && (
                        <p className="text-xs text-gray-500 mt-1">{promo.description}</p>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span className="flex items-center gap-1 text-primary font-semibold">
                        {promo.discountType === 'percentage' ? (
                          <>
                            <Percent className="w-4 h-4" />
                            {promo.discountValue}%
                          </>
                        ) : (
                          <>
                            <DollarSign className="w-4 h-4" />
                            {promo.discountValue}
                          </>
                        )}
                      </span>
                      {promo.minOrderAmount > 0 && (
                        <p className="text-xs text-gray-500">Min: ${promo.minOrderAmount}</p>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users className="w-4 h-4" />
                        {promo.usedCount}
                        {promo.usageLimit && <span className="text-gray-400">/ {promo.usageLimit}</span>}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className={isExpired(promo.validUntil) ? 'text-red-500' : ''}>
                          {formatDate(promo.validUntil)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {isExpired(promo.validUntil) ? (
                        <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full font-medium">
                          Expired
                        </span>
                      ) : promo.isActive ? (
                        <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full font-medium">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggle(promo._id)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                          title={promo.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {promo.isActive ? (
                            <ToggleRight className="w-5 h-5 text-green-500" />
                          ) : (
                            <ToggleLeft className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(promo._id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-red-500"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
