"use client";

import React, {createContext, useContext, ReactNode} from "react";
// Data will be fetched on-demand by individual components using hooks
interface ShopContextType {
  initialized: boolean;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};

export const ShopProvider = ({children}: {children: ReactNode}) => {
  const value = {
    initialized: true,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
