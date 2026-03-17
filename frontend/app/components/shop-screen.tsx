"use client";

import { useState, useEffect } from "react";
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

interface ShopScreenProps {
  userCoins: number;
  onPurchaseSuccess: (newBalance: number) => void;
}

export function ShopScreen({ userCoins, onPurchaseSuccess }: ShopScreenProps) {
  const { userId: clerkId, isLoaded } = useAuth();
  const [activeTab, setActiveTab] = useState<"character" | "pet">("character");
  const [items, setItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // NEW: Track which item is currently being purchased
  const [purchasingItemId, setPurchasingItemId] = useState<number | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const fetchItems = async () => {
      setLoading(true);
      try {
        const enumType = CATEGORY_MAP[activeTab];
        const response = await fetch(`${API_BASE_URL}/item/filter/${enumType}`);
        if (!response.ok) throw new Error();
        const data = await response.json();
        setItems(data);
      } catch (error) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [activeTab, isLoaded]);

  const handlePurchase = async (itemId: number) => {
    setPurchasingItemId(itemId); // Disable button
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
          alert("Item purchased successfully!");
        }
      } else {
        throw new Error(result.message || "Purchase failed");
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setPurchasingItemId(null); // Re-enable button
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
      <header className="bg-[#513418] border-b-4 border-[#2C2C2C] px-4 py-4 sticky top-0 z-20">
        <div className="max-w-md mx-auto">

          <div className="flex gap-2">
            {(["character", "pet"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`flex-1 border-3 border-[#2C2C2C] rounded-lg py-2 transition-all 
                  ${activeTab === cat ? "bg-[#FFC800] text-[#2C2C2C]" : "bg-[#754F26] text-white"}`}
              >
                <span className="font-bold text-sm capitalize">
                  {cat === "character" ? "👤" : "🐾"} {cat}
                </span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin w-8 h-8 text-[#FFC800]" />
          </div>
        ) : items.length > 0 ? (
          <div className="max-w-md mx-auto grid grid-cols-2 gap-4">
            {items.map((item) => {
              const canAfford = userCoins >= item.price;
              const isPurchasing = purchasingItemId === item.id;

              return (
                <div key={item.id} className="flex flex-col">
                  <div
                    className={`aspect-square rounded-2xl border-4 border-[#2C2C2C] flex flex-col items-center justify-center p-4 relative transition-all
                    ${canAfford ? "bg-white hover:bg-gray-50" : "bg-gray-400 grayscale"}`}
                  >
                    {isPurchasing ? (
                      <Loader2 className="animate-spin text-[#2C2C2C] w-8 h-8" />
                    ) : (
                      <>
                        <span className="text-5xl mb-2">
                          {item.imageUrl || "🎁"}
                        </span>
                        <p className="font-bold text-xs text-[#2C2C2C] text-center">
                          {item.name}
                        </p>
                      </>
                    )}
                    <button
                      onClick={() => handlePurchase(item.id)}
                      disabled={!canAfford || isPurchasing}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />
                  </div>
                  <div className="mt-2 flex justify-center">
                    <div
                      className={`flex items-center gap-1 border-2 border-[#2C2C2C] rounded-full px-3 py-1 
                      ${canAfford ? "bg-[#00D66F]" : "bg-[#9E9E9E]"}`}
                    >
                      <Coins className="w-3 h-3 text-white" />
                      <span className="text-[10px] font-bold text-white">
                        {item.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
            <div className="bg-[#513418] p-6 rounded-full border-4 border-[#2C2C2C]">
              <Ghost className="w-12 h-12 text-[#FFC800] opacity-50" />
            </div>
            <p className="text-lg font-bold">Shop Empty!</p>
          </div>
        )}
      </main>
    </div>
  );
}