"use client"; 

import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CoinProvider, useCoin } from "./components/providers/CoinContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-screen overflow-hidden`}>
          {/* Wrap everything in the CoinProvider */}
          <CoinProvider>
            <LayoutContent>{children}</LayoutContent>
          </CoinProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

// Internal component to safely use Context
function LayoutContent({ children }: { children: React.ReactNode }) {
  // Grab the global coins and loading state!
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
            <button className="bg-[#6c47ff] text-white rounded-full px-4 py-2">Sign In</button>
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