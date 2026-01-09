'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  darkmode: boolean;
  setDarkMode: (mode: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkmode, setDarkMode] = useState(false);
  const [title, setTitle] = useState('BestDeal');

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <UIContext.Provider value={{ 
        isSidebarOpen, toggleSidebar, openSidebar, closeSidebar,
        darkmode, setDarkMode, title, setTitle 
    }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
