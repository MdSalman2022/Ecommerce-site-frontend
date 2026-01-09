'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Loader2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'react-hot-toast';

interface CloudinaryUploaderProps {
  onUpload: (url: string) => void;
  currentImage?: string;
  className?: string;
  folder?: string;
  autoReset?: boolean;
}

export default function CloudinaryUploader({
  onUpload,
  currentImage,
  className,
  folder = 'bestdeal/products',
  autoReset = false,
}: CloudinaryUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string>(currentImage || '');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadType, setUploadType] = useState<'file' | 'url'>('file');
  const [urlInput, setUrlInput] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (uploadType !== 'file') return;
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, [uploadType]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    // Create preview and upload
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      await uploadToCloudinary(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleUrlUpload = async () => {
      if (!urlInput.trim()) return;
      
      // Basic URL validation
      try {
          new URL(urlInput);
      } catch (e) {
          toast.error('Please enter a valid URL');
          return;
      }

      await uploadToCloudinary(urlInput);
  };

  const uploadToCloudinary = async (imagePayload: string) => {
    setIsUploading(true);
    setUploadSuccess(false);
    // Optimistic preview for URL
    if (uploadType === 'url') {
        setPreview(imagePayload);
    } else {
        setPreview(imagePayload); // base64 preview
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imagePayload, folder }),
      });

      const data = await res.json();

      if (data.success) {
        onUpload(data.url);
        toast.success('Image uploaded successfully!');
        setUrlInput(''); // Clear input
        
        if (autoReset) {
            setPreview('');
            setUploadSuccess(false);
        } else {
            setPreview(data.url);
            setUploadSuccess(true);
        }
      } else {
        toast.error(data.error || 'Upload failed');
        setPreview('');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
      setPreview('');
    } finally {
      setIsUploading(false);
    }
  };

  const clearImage = () => {
    setPreview('');
    setUploadSuccess(false);
    onUpload('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn('relative', className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        id="cloudinary-upload"
      />

      {preview ? (
        // Preview Mode
        <div className="relative w-full h-48 rounded-xl border-2 border-gray-200 overflow-hidden group">
          <img
            src={preview}
            alt="Upload preview"
            className="w-full h-full object-contain bg-gray-50"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                  setPreview('');
                  setUploadSuccess(false);
                  // Return to upload state
              }}
              className="px-4 py-2 bg-white rounded-lg text-sm font-medium hover:bg-gray-100"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={clearImage}
              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Upload status indicator */}
          {isUploading && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <div className="text-center text-white">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                <p className="text-sm">Uploading...</p>
              </div>
            </div>
          )}

          {uploadSuccess && !isUploading && (
            <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
              <Check className="w-4 h-4" />
            </div>
          )}
        </div>
      ) : (
        // Upload Zone with Tabs
        <div className="w-full h-48 rounded-xl border border-gray-200 bg-white overflow-hidden flex flex-col">
            <div className="flex border-b">
                <button
                    type="button" 
                    onClick={() => setUploadType('file')}
                    className={cn(
                        "flex-1 py-2 text-xs font-medium transition-colors",
                        uploadType === 'file' ? "bg-primary/5 text-primary border-b-2 border-primary" : "text-gray-500 hover:text-gray-900"
                    )}
                >
                    File Upload
                </button>
                <button 
                    type="button"
                    onClick={() => setUploadType('url')}
                    className={cn(
                        "flex-1 py-2 text-xs font-medium transition-colors",
                        uploadType === 'url' ? "bg-primary/5 text-primary border-b-2 border-primary" : "text-gray-500 hover:text-gray-900"
                    )}
                >
                    Image URL
                </button>
            </div>

            <div className="flex-1 relative">
                {uploadType === 'file' ? (
                     <label
                        htmlFor="cloudinary-upload"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={cn(
                            'block w-full h-full cursor-pointer transition-all flex flex-col items-center justify-center p-4',
                            isDragging ? 'bg-primary/5' : 'hover:bg-gray-50'
                        )}
                    >
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                             <Upload className="w-5 h-5 text-gray-400" />
                        </div>
                        <p className="text-xs text-gray-600 text-center">
                            <span className="font-medium text-primary">Click</span> or drag file
                        </p>
                    </label>
                ) : (
                    <div className="w-full h-full p-4 flex flex-col items-center justify-center gap-3">
                         <div className="w-full">
                            <input
                                type="text"
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                                placeholder="Paste image URL here..."
                                className="w-full text-sm border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleUrlUpload())}
                            />
                         </div>
                         <button
                            type="button"
                            onClick={handleUrlUpload}
                            disabled={!urlInput.trim() || isUploading}
                            className="w-full py-2 bg-gray-900 text-white rounded-md text-xs font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                         >
                            {isUploading ? <Loader2 className="w-3 h-3 animate-spin mx-auto" /> : 'Fetch & Upload'}
                         </button>
                    </div>
                )}
                
                {isUploading && uploadType === 'url' && (
                     <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                        <Loader2 className="w-6 h-6 text-primary animate-spin" />
                    </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
}
