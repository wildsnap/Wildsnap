"use client";

import { useState, useEffect, useMemo } from "react";
import { Coins, Loader2, Ghost, Check } from "lucide-react";
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
  const [ownedItemIds, setOwnedItemIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasingItemId, setPurchasingItemId] = useState<number | null>(null);

  // Updated Modal State with imageUrl
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    message: string;
    imageUrl?: string;
  }>({ isOpen: false, type: "success", message: "" });

  useEffect(() => {
    if (!isLoaded || !clerkId) return;

    const fetchItemsAndOwned = async () => {
      setLoading(true);
      try {
        const enumType = CATEGORY_MAP[activeTab];

        // Fetch both shop items and owned items in parallel
        const [itemsRes, ownedRes] = await Promise.all([
          fetch(`${API_BASE_URL}/item/filter/${enumType}`),
          fetch(`${API_BASE_URL}/item/my-items/${enumType}`, {
            headers: {
              "x-user-id": clerkId, 
            },
          }),
        ]);

        const itemsData = await itemsRes.json();
        const ownedData = await ownedRes.json();

        setItems(itemsData || []);
        
        // --- BULLETPROOF ID PARSING ---
        const ownedIds = Array.isArray(ownedData) 
          ? ownedData.map((item: any) => {
              // 1. If API returns an array of raw IDs: [1, 2, 3]
              if (typeof item === 'number' || typeof item === 'string') return Number(item);
              
              // 2. If API returns nested item objects: [{ item: { id: 1 } }]
              if (item.item && item.item.id) return Number(item.item.id);
              
              // 3. If API returns the ownership record or flat item: [{ itemId: 1 }] or [{ id: 1 }]
              return Number(item.itemId || item.id);
            }) 
          : [];
          
        console.log("Raw Owned Data from API:", ownedData);
        console.log("Parsed Owned IDs:", ownedIds);
        
        setOwnedItemIds(ownedIds);

      } catch (error) {
        console.error("Failed to fetch items:", error);
        setItems([]);
        setOwnedItemIds([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchItemsAndOwned();
  }, [activeTab, isLoaded, clerkId]);

  // Logic to pick a random special item and separate the rest
  const { specialItem, regularItems } = useMemo(() => {
    if (items.length === 0) return { specialItem: null, regularItems: [] };

    const randomIndex = Math.floor(Math.random() * items.length);
    const special = items[randomIndex];
    const regulars = items.filter((_, idx) => idx !== randomIndex);

    return { specialItem: special, regularItems: regulars };
  }, [items]);

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
          
          // Instantly add the item to owned items so UI updates without refreshing
          setOwnedItemIds((prev) => [...prev, itemId]);
          
          // Find the exact item the user just bought
          const purchasedItem = items.find((item) => item.id === itemId);
          
          // Show Success Modal with picture and specific name
          setModalState({
            isOpen: true,
            type: "success",
            message: `You successfully got ${purchasedItem?.name || "this item"}!`,
            imageUrl: purchasedItem?.imageUrl,
          });
        }
      } else {
        // Show Error Modal
        setModalState({
          isOpen: true,
          type: "error",
          message: result.message || "Not enough coins or purchase failed.",
        });
      }
    } catch (error: any) {
      setModalState({
        isOpen: true,
        type: "error",
        message: error.message || "Something went wrong. Try again!",
      });
    } finally {
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
    <div className="flex flex-col h-full bg-[#8B6332] pb-20 overflow-hidden text-white relative">
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
                          {specialItem.imageUrl?.startsWith("http") ? (
                            <img src={specialItem.imageUrl} alt={specialItem.name} className="w-16 h-16 object-contain" />
                          ) : (
                            specialItem.imageUrl || "✨"
                          )}
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
                      
                      {/* Special Item Purchase Button */}
                      {(() => {
                        const isOwned = ownedItemIds.includes(specialItem.id);
                        const canAfford = userCoins >= specialItem.price;
                        const isPurchasing = purchasingItemId === specialItem.id;

                        return (
                          <button
                            disabled={isOwned || !canAfford || isPurchasing}
                            onClick={() => handlePurchase(specialItem.id)}
                            className={`border-3 border-[#2C2C2C] rounded-xl px-4 py-3 shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] transition-all disabled:opacity-80
                              ${isOwned ? "bg-[#00D66F] text-white" : "bg-white active:translate-y-1"}`}
                          >
                            <div className="flex items-center gap-2">
                              {isPurchasing ? (
                                <Loader2 className="animate-spin w-5 h-5 text-black" />
                              ) : isOwned ? (
                                <>
                                  <Check className="w-5 h-5" strokeWidth={4} />
                                  <span className="font-black">OWNED</span>
                                </>
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
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}

              {/* --- REGULAR GRID --- */}
              <div className="grid grid-cols-3 gap-4">
                {regularItems.map((item) => {
                  const isOwned = ownedItemIds.includes(item.id);
                  const canAfford = userCoins >= item.price;
                  const isPurchasing = purchasingItemId === item.id;

                  return (
                    <button
                      key={item.id}
                      disabled={isOwned || !canAfford || isPurchasing}
                      onClick={() => handlePurchase(item.id)}
                      className={`relative aspect-[3/4] rounded-2xl border-4 border-[#2C2C2C] flex flex-col items-center justify-between p-4 transition-all
                        ${
                          isOwned 
                            ? "bg-[#D3F9E5] border-[#00A854] cursor-default" // Owned Style
                            : canAfford
                              ? "bg-white shadow-[5px_5px_0_0_rgba(0,0,0,0.25)] hover:bg-gray-50 active:translate-y-1 active:shadow-none"
                              : "bg-[#C0C0C0] opacity-70 cursor-not-allowed"
                        }`}
                    >
                      <span className="text-4xl mt-2 drop-shadow-sm flex items-center justify-center w-full h-12">
                        {isPurchasing ? (
                          <Loader2 className="animate-spin w-8 h-8 text-[#00D66F]" />
                        ) : item.imageUrl?.startsWith("http") ? (
                          <img src={item.imageUrl} alt={item.name} className={`w-10 h-10 object-contain ${isOwned ? "opacity-60" : ""}`} />
                        ) : (
                          item.imageUrl || "📦"
                        )}
                      </span>

                      <div className="w-full space-y-2">
                        <p className={`text-[11px] font-black leading-tight line-clamp-2 min-h-[2rem] ${isOwned ? "text-[#00A854]" : "text-[#2C2C2C]"}`}>
                          {item.name}
                        </p>
                        
                        <div
                          className={`flex items-center justify-center gap-1 border-[3px] border-[#2C2C2C] rounded-xl py-1.5 shadow-[2px_2px_0_0_rgba(0,0,0,0.1)]
                          ${isOwned ? "bg-[#00D66F]" : canAfford ? "bg-[#FFC800]" : "bg-[#8E8E8E]"}`}
                        >
                          {isOwned ? (
                            <>
                              <Check className="w-3 h-3 text-white" strokeWidth={4} />
                              <span className="text-[10px] font-black text-white tracking-tighter">OWNED</span>
                            </>
                          ) : (
                            <>
                              <Coins
                                className="w-3 h-3 text-white"
                                strokeWidth={3}
                              />
                              <span className="text-[10px] font-black text-white tracking-tighter">
                                {item.price}
                              </span>
                            </>
                          )}
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

      {/* --- PURCHASE MODAL --- */}
      {modalState.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-[#FFFDF5] border-4 border-[#2C2C2C] rounded-2xl p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] max-w-sm w-full text-center flex flex-col items-center animate-in fade-in zoom-in duration-200">
            
            {/* Item Image / Icon */}
            <div className={`flex items-center justify-center mb-4 drop-shadow-md min-h-[5rem]`}>
              {modalState.type === "success" && modalState.imageUrl ? (
                // Check if it's a URL (starts with http) to render an image, otherwise render text
                modalState.imageUrl.startsWith("http") ? (
                  <img 
                    src={modalState.imageUrl} 
                    alt="Purchased Item" 
                    className="w-24 h-24 object-contain"
                  />
                ) : (
                  <span className="text-7xl">{modalState.imageUrl}</span>
                )
              ) : (
                <span className="text-7xl">{modalState.type === "success" ? "🎉" : "❌"}</span>
              )}
            </div>
            
            {/* Title */}
            <h2
              className={`text-2xl font-black mb-2 ${
                modalState.type === "success" ? "text-[#00D66F]" : "text-[#FF4757]"
              }`}
            >
              {modalState.type === "success" ? "Success!" : "Oops!"}
            </h2>
            
            {/* Message */}
            <p className="text-[#2C2C2C] font-bold mb-6 text-lg leading-tight">
              {modalState.message}
            </p>
            
            {/* Close Button */}
            <button
              onClick={() => setModalState({ ...modalState, isOpen: false })}
              className={`w-full border-4 border-[#2C2C2C] rounded-xl px-6 py-3 font-black text-[#2C2C2C] text-lg shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all ${
                modalState.type === "success" ? "bg-[#FFC800]" : "bg-white"
              }`}
            >
              {modalState.type === "success" ? "Awesome!" : "Close"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}