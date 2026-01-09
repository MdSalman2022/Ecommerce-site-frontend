'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
  searchText: string;
  setSearchText: (text: string) => void;
  searchResult: string;
  setSearchResult: (result: string) => void;
  searchedItems: string;
  setSearchedItems: (items: string) => void;
  dashboardSearch: string;
  setDashBoardSearch: (search: string) => void;
  results: any[];
  setResults: (results: any[]) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  // Main site search
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [searchedItems, setSearchedItems] = useState("");
  
  // Dashboard search
  const [dashboardSearch, setDashBoardSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const value = {
    searchText,
    setSearchText,
    searchResult,
    setSearchResult,
    searchedItems,
    setSearchedItems,
    dashboardSearch,
    setDashBoardSearch,
    results,
    setResults
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};
