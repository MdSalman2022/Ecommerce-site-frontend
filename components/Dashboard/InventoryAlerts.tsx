'use client';

import React, { useEffect, useState } from 'react';
import { TbAlertTriangle, TbPackage, TbMail } from 'react-icons/tb';
import { Button } from '@/components/ui/button';

interface LowStockProduct {
  _id: string;
  name: string;
  image?: string;
  stock: number;
  sku?: string;
}

interface InventoryAlertsProps {
  threshold?: number;
}

export default function InventoryAlerts({ threshold = 10 }: InventoryAlertsProps) {
  const [lowStockProducts, setLowStockProducts] = useState<LowStockProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSendingAlert, setIsSendingAlert] = useState(false);

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products`);
        const products = await response.json();
        
        // Filter products with low stock
        const lowStock = products
          .filter((p: any) => typeof p.stock === 'number' && p.stock <= threshold && p.stock >= 0)
          .sort((a: any, b: any) => a.stock - b.stock)
          .slice(0, 10);
        
        setLowStockProducts(lowStock);
      } catch (error) {
        console.error('Failed to fetch inventory:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLowStock();
  }, [threshold]);

  const handleSendAlert = async () => {
    setIsSendingAlert(true);
    try {
      const token = localStorage.getItem('accessToken');
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/inventory-alert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ products: lowStockProducts }),
      });
      alert('Low stock alert sent to admin email!');
    } catch (error) {
      console.error('Failed to send alert:', error);
    } finally {
      setIsSendingAlert(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-12 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (lowStockProducts.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <TbPackage className="text-xl text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-800">Inventory Status</h3>
        </div>
        <p className="text-green-600 text-sm">✓ All products are well stocked!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-red-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100 rounded-lg animate-pulse">
            <TbAlertTriangle className="text-xl text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Low Stock Alert</h3>
            <p className="text-xs text-gray-500">{lowStockProducts.length} products need restocking</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSendAlert}
          disabled={isSendingAlert}
          className="gap-2 text-red-600 border-red-200 hover:bg-red-50"
        >
          <TbMail className="text-lg" />
          {isSendingAlert ? 'Sending...' : 'Send Alert'}
        </Button>
      </div>

      <div className="space-y-3 max-h-[300px] overflow-y-auto">
        {lowStockProducts.map((product) => (
          <div
            key={product._id}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-10 h-10 object-cover rounded"
              />
            ) : (
              <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                <TbPackage className="text-gray-400" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-gray-800 truncate">{product.name}</p>
              {product.sku && (
                <p className="text-xs text-gray-500">SKU: {product.sku}</p>
              )}
            </div>
            <div className={`text-right ${product.stock === 0 ? 'text-red-600' : 'text-orange-600'}`}>
              <span className="text-lg font-bold">{product.stock}</span>
              <p className="text-xs">{product.stock === 0 ? 'Out of Stock' : 'Low Stock'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
