"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@clerk/nextjs";

interface CoinContextType {
  coins: number;
  setCoins: (coins: number | ((prev: number) => number)) => void;
  isLoading: boolean;
}

const CoinContext = createContext<CoinContextType | undefined>(undefined);

export function CoinProvider({ children }: { children: ReactNode }) {
  const { userId, isLoaded } = useAuth();
  const [coins, setCoins] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // We moved your layout fetch logic here!
  useEffect(() => {
    if (!isLoaded || !userId) {
      setIsLoading(false);
      return;
    }

    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3100";
        const response = await fetch(`${apiUrl}/users/${userId}`);
        const data = await response.json();
        setCoins(data.currentPoints || 0);
      } catch (error) {
        console.error("Failed to fetch coins:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [isLoaded, userId]);

  return (
    <CoinContext.Provider value={{ coins, setCoins, isLoading }}>
      {children}
    </CoinContext.Provider>
  );
}

// Custom hook to easily grab coins anywhere
export function useCoin() {
  const context = useContext(CoinContext);
  if (context === undefined) {
    throw new Error("useCoin must be used within a CoinProvider");
  }
  return context;
}