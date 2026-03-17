"use client";

import { useState, useEffect, useMemo } from "react";
import { Coins, Loader2, Ghost } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const CATEGORY_MAP = {
  character: "AVATAR_OUTFIT",
  pet: "ANIMAL_DECORATION",
} as const;

interface ShopItem {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  type: string;
}

export function ShopScreen({
  userCoins,
  onPurchaseSuccess,
}: {
  userCoins: number;
  onPurchaseSuccess: (bal: number) => void;
}) {
  const { userId: clerkId, isLoaded } = useAuth();
  const [activeTab, setActiveTab] = useState<"character" | "pet">("character");
  const [items, setItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasingItemId, setPurchasingItemId] = useState<number | null>(null);

  useEffect(() => {
    if (!isLoaded) return;
    const fetchItems = async () => {
      setLoading(true);
      try {
        const enumType = CATEGORY_MAP[activeTab];
        const response = await fetch(`${API_BASE_URL}/item/filter/${enumType}`);
        const data = await response.json();
        setItems(data || []);
      } catch (error) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [activeTab, isLoaded]);

  // Logic to pick a random special item and separate the rest
  const { specialItem, regularItems } = useMemo(() => {
    if (items.length === 0) return { specialItem: null, regularItems: [] };

    // Pick a random index
    const randomIndex = Math.floor(Math.random() * items.length);
    const special = items[randomIndex];
    // Filter out the special item from the grid
    const regulars = items.filter((_, idx) => idx !== randomIndex);

    return { specialItem: special, regularItems: regulars };
  }, [items]); // Only re-calculates when the items array changes (on tab switch)

  const handlePurchase = async (itemId: number) => {
    if (purchasingItemId) return;

    setPurchasingItemId(itemId);
    try {
      const response = await fetch(`${API_BASE_URL}/item/purchase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, clerkId }),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.remainingPoints !== undefined) {
          onPurchaseSuccess(result.remainingPoints);
          // Instead of alert(), we let the UI update naturally
          // You could set a "showSuccess" state here if you want a toast
        }
      } else {
        // For errors, you might still want a toast, but let's console log for now
        console.error(result.message || "Purchase failed");
      }
    } catch (error: any) {
      console.error("Purchase Error:", error.message);
    } finally {
      // Small delay before re-enabling so the user sees the "processing" finish
      setTimeout(() => setPurchasingItemId(null), 500);
    }
  };

  if (!isLoaded)
    return (
      <div className="h-full bg-[#8B6332] flex items-center justify-center">
        <Loader2 className="animate-spin text-white" />
      </div>
    );

  return (
    <div className="flex flex-col h-full bg-[#8B6332] pb-20 overflow-hidden text-white">
      {/* Tab Header */}
      <header className="bg-[#513418] border-b-4 border-[#2C2C2C] px-4 py-4 sticky top-0 z-20">
        <div className="max-w-md mx-auto flex gap-2">
          {(["character", "pet"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`flex-1 border-3 border-[#2C2C2C] rounded-lg py-2 font-bold capitalize transition-all 
                ${activeTab === cat ? "bg-[#FFC800] text-[#2C2C2C]" : "bg-[#754F26] text-white"}`}
            >
              {cat === "character" ? "👤" : "🐾"} {cat}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-md mx-auto space-y-6">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin w-8 h-8 text-[#FFC800]" />
            </div>
          ) : items.length > 0 ? (
            <>
              {/* --- SPECIAL PICK --- */}
              {specialItem && (
                <div className="relative">
                  <div className="absolute -top-2 left-4 bg-[#FF4757] border-3 border-[#2C2C2C] rounded-full px-3 py-1 z-10 shadow-[2px_2px_0_0_rgba(0,0,0,0.25)]">
                    <span className="text-[10px] font-black text-white tracking-tighter">
                      SPECIAL OFFER
                    </span>
                  </div>
                  <div className="bg-gradient-to-r from-[#FFC800] to-[#FFD700] border-4 border-[#2C2C2C] rounded-2xl p-5 shadow-[6px_6px_0_0_rgba(0,0,0,0.3)]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-6xl drop-shadow-md">
                          {specialItem.imageUrl || "✨"}
                        </span>
                        <div>
                          <p className="text-xl font-black text-[#2C2C2C] leading-none">
                            {specialItem.name}
                          </p>
                          <p className="text-[10px] font-bold text-[#FF4757] mt-2 uppercase tracking-widest">
                            Rare Find!
                          </p>
                        </div>
                      </div>
                      <button
                        disabled={
                          userCoins < specialItem.price ||
                          purchasingItemId === specialItem.id
                        }
                        onClick={() => handlePurchase(specialItem.id)}
                        className="bg-white border-3 border-[#2C2C2C] rounded-xl px-4 py-3 shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] active:translate-y-1 transition-all disabled:opacity-50"
                      >
                        <div className="flex items-center gap-2">
                          {purchasingItemId === specialItem.id ? (
                            <Loader2 className="animate-spin w-5 h-5 text-black" />
                          ) : (
                            <>
                              <Coins
                                className="w-5 h-5 text-[#FFC800]"
                                strokeWidth={3}
                              />
                              <span className="font-black text-[#2C2C2C]">
                                {specialItem.price}
                              </span>
                            </>
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* --- REGULAR GRID --- */}
              <div className="grid grid-cols-3 gap-4">
                {regularItems.map((item) => {
                  const canAfford = userCoins >= item.price;
                  const isPurchasing = purchasingItemId === item.id;

                  return (
                    <button
                      key={item.id}
                      disabled={!canAfford || isPurchasing}
                      onClick={() => handlePurchase(item.id)}
                      // Increased vertical padding (py-6) and changed aspect ratio
                      className={`relative aspect-[3/4] rounded-2xl border-4 border-[#2C2C2C] flex flex-col items-center justify-between p-4 transition-all
                        ${
                          canAfford
                            ? "bg-white shadow-[5px_5px_0_0_rgba(0,0,0,0.25)] hover:bg-gray-50 active:translate-y-1 active:shadow-none"
                            : "bg-[#C0C0C0] opacity-70 cursor-not-allowed"
                        }`}
                    >
                      <span className="text-4xl mt-2 drop-shadow-sm">
                        {isPurchasing ? (
                          <Loader2 className="animate-spin w-8 h-8 text-[#00D66F]" />
                        ) : (
                          item.imageUrl || "📦"
                        )}
                      </span>

                      <div className="w-full space-y-2">
                        <p className="text-[11px] font-black text-[#2C2C2C] leading-tight line-clamp-2 min-h-[2rem]">
                          {item.name}
                        </p>
                        <div
                          className={`flex items-center justify-center gap-1 border-[3px] border-[#2C2C2C] rounded-xl py-1.5 shadow-[2px_2px_0_0_rgba(0,0,0,0.1)]
                          ${canAfford ? "bg-[#00D66F]" : "bg-[#8E8E8E]"}`}
                        >
                          <Coins
                            className="w-3 h-3 text-white"
                            strokeWidth={3}
                          />
                          <span className="text-[10px] font-black text-white tracking-tighter">
                            {item.price}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center pt-10 opacity-50">
              <Ghost className="w-12 h-12 mb-2" />
              <p className="font-bold">No Items Available</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
