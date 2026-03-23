"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { CoinProvider, useCoin } from "./providers/CoinContext";
import { SettingsProvider } from "../contexts/AudioContext";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <CoinProvider>
      <LayoutContent>
        <SettingsProvider>{children}</SettingsProvider>
      </LayoutContent>
    </CoinProvider>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { coins, isLoading } = useCoin();

  return (
    <>
      <header className="flex-none flex justify-between items-center p-4 gap-4 h-16 bg-white shadow-sm z-50 relative">
        <div className="flex items-center gap-2 bg-[#FFFDF5] border-4 border-[#2C2C2C] rounded-full px-4 py-2 shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]">
          <img
            src="https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/screens/coin.png"
            alt="Coin"
            className="w-5 h-5 object-contain"
          />
          <span className="font-sans font-bold text-sm text-[#2C2C2C]">
            {isLoading ? "..." : coins.toLocaleString()}
          </span>
        </div>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-[#6c47ff] text-white rounded-full px-4 py-2 font-bold">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </header>

      <main className="flex-1 relative overflow-hidden bg-[#F5F8F0]">
        {children}
      </main>
    </>
  );
}
