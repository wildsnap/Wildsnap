"use client";

import { useState, useEffect, useMemo } from "react";
import { Loader2, Ghost, Check, AlertCircle } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { InventoryScreen } from "./inventory-screen";
import { useSettings } from "../contexts/AudioContext";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3100";

const CATEGORY_MAP = {
  head: "HEAD",
  body: "BODY",
  leg: "LEG",
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

  const [activeTab, setActiveTab] = useState<"head" | "body" | "leg">("head");

  const [items, setItems] = useState<ShopItem[]>([]);
  const [ownedItemIds, setOwnedItemIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasingItemId, setPurchasingItemId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"shop" | "inventory">("shop");
  const { playClickSound, playSuccessSound } = useSettings();

  const [specialItemIds, setSpecialItemIds] = useState<{
    head: number | null;
    body: number | null;
    leg: number | null;
  }>({ head: null, body: null, leg: null });

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

        const safeItems = Array.isArray(itemsData)
          ? itemsData
          : itemsData?.data || [];
        setItems(safeItems);

        if (itemsData && itemsData.length > 0) {
          setSpecialItemIds((prev) => {
            if (!prev[activeTab]) {
              const randomIndex = Math.floor(Math.random() * itemsData.length);
              return { ...prev, [activeTab]: itemsData[randomIndex].id };
            }
            return prev;
          });
        }

        const ownedIds = Array.isArray(ownedData)
          ? ownedData.map((item: any) => {
              if (typeof item === "number" || typeof item === "string")
                return Number(item);
              if (item.item && item.item.id) return Number(item.item.id);
              return Number(item.itemId || item.id);
            })
          : [];

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

  const { specialItem, regularItems } = useMemo(() => {
    if (!Array.isArray(items) || items.length === 0) {
      return { specialItem: null, regularItems: [] };
    }

    const currentSpecialId = specialItemIds[activeTab];
    const special =
      items?.find((item) => item.id === currentSpecialId) || items[0];

    const regulars = items?.filter((item) => item.id !== special?.id) || [];

    return { specialItem: special, regularItems: regulars };
  }, [items, activeTab, specialItemIds]);

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
          setOwnedItemIds((prev) => [...prev, itemId]);
          const purchasedItem = items.find((item) => item.id === itemId);
          setModalState({
            isOpen: true,
            type: "success",
            message: `You successfully got ${purchasedItem?.name || "this item"}!`,
            imageUrl: purchasedItem?.imageUrl,
          });
          playSuccessSound();
        }
      } else {
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
        <Loader2 className="animate-spin text-white w-10 h-10" />
      </div>
    );

  return (
    <div className="flex flex-col h-full bg-[#EFE7D3] pb-24 sm:pb-28 overflow-hidden relative z-[0]">
      <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(45deg,#000,#000_2px,transparent_2px,transparent_6px)] z-0 pointer-events-none" />

      <header className="bg-[#5C3D1F] border-b-4 border-[#2C2C2C] relative z-20 shrink-0 shadow-[0_4px_0_0_rgba(0,0,0,0.2)]">
        <div className="absolute top-0 left-0 right-0 h-2 bg-[repeating-linear-gradient(90deg,#FF4757_0px,#FF4757_20px,#FFF_20px,#FFF_40px)] opacity-80" />
        <div className="px-3 sm:px-4 pt-4 sm:pt-5 pb-3 sm:pb-4 max-w-md mx-auto">
          <div className="flex gap-2">
            <div className="flex flex-1 gap-1.5 sm:gap-2">
              {(["head", "body", "leg"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    playClickSound();
                    setActiveTab(cat);
                  }}
                  className={`flex-1 border-3 border-[#2C2C2C] rounded-xl py-1.5 sm:py-2 flex flex-col items-center justify-center gap-1 transition-all duration-200 shadow-[2px_2px_0_0_rgba(0,0,0,0.3)]
                    ${
                      activeTab === cat
                        ? "bg-[#FFC800] text-[#2C2C2C] translate-y-0.5 shadow-none"
                        : "bg-[#8B6332] text-white hover:bg-[#9c6f37] active:translate-y-0.5 active:shadow-none"
                    }`}
                >
                  <span
                    className={`text-sm sm:text-base leading-none ${activeTab !== cat && "opacity-70 grayscale"}`}
                  >
                    {cat === "head" ? "🧢" : cat === "body" ? "👕" : "👖"}
                  </span>
                  <span className="font-['Press_Start_2P'] text-[7px] sm:text-[8px] uppercase">
                    {cat}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                playClickSound();
                setViewMode((prev) => (prev === "shop" ? "inventory" : "shop"));
              }}
              className={`w-12 sm:w-14 shrink-0 flex flex-col items-center justify-center border-3 border-[#2C2C2C] rounded-xl transition-all duration-200 shadow-[2px_2px_0_0_rgba(0,0,0,0.3)]
              ${
                viewMode === "inventory"
                  ? "bg-[#00D66F] text-white translate-y-0.5 shadow-none"
                  : "bg-[#4CAF50] text-white hover:bg-[#43A047] active:translate-y-0.5 active:shadow-none"
              }`}
            >
              <img
                src={
                  viewMode === "inventory"
                    ? "https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/screens/bag_open.png"
                    : "https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/screens/bag_close.png"
                }
                alt={viewMode === "inventory" ? "Bag Open" : "Bag Closed"}
                className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5 object-contain drop-shadow-sm"
              />
              <span className="font-['Press_Start_2P'] text-[6px] sm:text-[7px] pt-1 uppercase">
                BAG
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 sm:py-6 relative z-10">
        <div className="max-w-md mx-auto space-y-4 sm:space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 sm:py-20 opacity-70">
              <Loader2 className="animate-spin w-8 h-8 sm:w-10 sm:h-10 text-[#FF9800] mb-4" />
              <p className="font-['Press_Start_2P'] text-[8px] sm:text-[10px] text-[#754F26]">
                {viewMode === "shop" ? "STOCKING SHELVES..." : "OPENING BAG..."}
              </p>
            </div>
          ) : viewMode === "inventory" ? (
            <InventoryScreen items={items} ownedItemIds={ownedItemIds} />
          ) : items.length > 0 ? (
            <>
              {specialItem && (
                <div className="relative animate-[slideUp_0.4s_ease-out]">
                  <div className="absolute -top-3 sm:-top-4 left-3 sm:left-4 z-10 bg-[#FF4757] border-3 border-[#2C2C2C] rounded-full px-3 sm:px-4 py-1 sm:py-1.5 shadow-[3px_3px_0_0_rgba(0,0,0,0.3)] shadow-[0_0_10px_rgba(255,71,87,0.7)] transition-transform">
                    <span className="inline-flex items-center gap-1.5 text-white tracking-widest font-['Press_Start_2P'] text-[7px] sm:text-[9px] pt-0.5 drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)]">
                      <img
                        src="https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/screens/zap.png"
                        alt="Zap"
                        className="w-3 h-3 sm:w-4 sm:h-4 object-contain animate-vibrate"
                      />
                      <span className="pt-0.5">SPECIAL OFFER</span>
                    </span>
                  </div>

                  <div className="bg-gradient-to-br from-[#FFF8E1] to-[#FFD54F] border-4 border-[#2C2C2C] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] sm:shadow-[6px_6px_0_0_rgba(0,0,0,0.2)] relative overflow-hidden">
                    <div className="absolute -inset-[120%] opacity-20 bg-[repeating-conic-gradient(from_0deg,transparent_0deg_15deg,#FF9800_15deg_30deg)] animate-[spin_20s_linear_infinite] rounded-full" />

                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 mt-2 bg-white border-4 border-[#2C2C2C] rounded-xl shadow-inner flex items-center justify-center relative overflow-hidden shrink-0">
                          {specialItem.imageUrl?.startsWith("http") ? (
                            <img
                              src={specialItem.imageUrl}
                              alt={specialItem.name}
                              className="w-10 h-10 sm:w-14 sm:h-14 object-contain animate-[bounce_3s_infinite]"
                            />
                          ) : (
                            <span className="text-3xl sm:text-4xl animate-bounce">
                              {specialItem.imageUrl || "✨"}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-['Press_Start_2P'] text-[10px] sm:text-sm text-[#2C2C2C] leading-snug mb-1">
                            {specialItem.name.toUpperCase()}
                          </p>
                          <p className="font-['Press_Start_2P'] text-[8px] sm:text-xs font-black text-[#FF4757] uppercase">
                            Rare Find!
                          </p>
                        </div>
                      </div>

                      {(() => {
                        const isOwned = ownedItemIds.includes(specialItem.id);
                        const canAfford = userCoins >= specialItem.price;
                        const isPurchasing =
                          purchasingItemId === specialItem.id;

                        return (
                          <button
                            disabled={isOwned || !canAfford || isPurchasing}
                            onClick={() => {
                              playClickSound();
                              handlePurchase(specialItem.id);
                            }}
                            className={`border-3 sm:border-4 border-[#2C2C2C] rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-[3px_3px_0_0_rgba(0,0,0,0.25)] sm:shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] transition-all flex items-center justify-center min-w-[80px] sm:min-w-[100px] shrink-0
                              ${isPurchasing ? "bg-white" : isOwned ? "bg-[#00D66F] text-white cursor-default translate-y-1 shadow-none" : canAfford ? "bg-white hover:bg-gray-50 active:translate-y-1 active:shadow-none" : "bg-[#C0C0C0] opacity-80 cursor-not-allowed"}`}
                          >
                            {isPurchasing ? (
                              <Loader2 className="animate-spin w-5 h-5 sm:w-6 sm:h-6 text-[#2C2C2C]" />
                            ) : isOwned ? (
                              <div className="flex flex-col items-center">
                                <Check
                                  className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5"
                                  strokeWidth={4}
                                />
                                <span className="text-[6px] sm:text-[8px] font-['Press_Start_2P']">
                                  OWNED
                                </span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center">
                                <img
                                  src="https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/screens/coin.png"
                                  className={`w-4 h-4 sm:w-5 sm:h-5 mb-1 ${!canAfford && "grayscale"}`}
                                  alt="Coin"
                                />
                                <span
                                  className={`text-[8px] sm:text-[10px] font-['Press_Start_2P'] ${!canAfford ? "text-[#FF4757]" : "text-[#2C2C2C]"}`}
                                >
                                  {specialItem.price}
                                </span>
                              </div>
                            )}
                          </button>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2">
                {regularItems.map((item, idx) => {
                  const isOwned = ownedItemIds.includes(item.id);
                  const canAfford = userCoins >= item.price;
                  const isPurchasing = purchasingItemId === item.id;

                  return (
                    <div
                      key={item.id}
                      className={`relative bg-white border-3 sm:border-4 border-[#2C2C2C] rounded-xl sm:rounded-2xl p-2 sm:p-3 flex flex-col items-center justify-between transition-all duration-300 animate-[fadeIn_0.5s_ease-out]
                        ${isOwned ? "opacity-80 border-[#00A854] bg-[#F0FDF4]" : "shadow-[3px_3px_0_0_rgba(0,0,0,0.15)] sm:shadow-[4px_4px_0_0_rgba(0,0,0,0.15)] hover:-translate-y-1 hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.15)] sm:hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.15)]"}`}
                      style={{
                        animationDelay: `${idx * 50}ms`,
                        animationFillMode: "both",
                      }}
                    >
                      <div
                        className={`w-full aspect-square rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 border-2 relative overflow-hidden
                        ${isOwned ? "bg-[#D3F9E5] border-[#86EFAC]" : "bg-[#F5F8F0] border-[#E2E8F0]"}`}
                      >
                        {isPurchasing ? (
                          <Loader2 className="animate-spin w-6 h-6 sm:w-8 sm:h-8 text-[#FFC800]" />
                        ) : item.imageUrl?.startsWith("http") ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className={`w-10 h-10 sm:w-14 sm:h-14 object-contain transition-transform ${isOwned ? "opacity-70" : "hover:scale-110"}`}
                          />
                        ) : (
                          <span className="text-2xl sm:text-4xl">
                            {item.imageUrl || "📦"}
                          </span>
                        )}

                        {isOwned && (
                          <div className="absolute inset-0 bg-white/20 flex items-center justify-center">
                            <img
                              src="https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/screens/sale_sign.png"
                              alt="Sold Sign"
                              className="w-12 h-12 sm:w-16 sm:h-16 object-contain rotate-[15deg] drop-shadow-md"
                            />
                          </div>
                        )}
                      </div>

                      <div className="w-full text-center flex flex-col flex-1 justify-between">
                        <p
                          className={`font-['Press_Start_2P'] text-[8px] sm:text-[10px] font-black leading-tight line-clamp-2 mb-2 min-h-[1.5rem] sm:min-h-[2rem] 
                          ${isOwned ? "text-[#00A854]" : "text-[#2C2C2C]"}`}
                        >
                          {item.name}
                        </p>

                        <button
                          disabled={isOwned || !canAfford || isPurchasing}
                          onClick={() => {
                            playClickSound();
                            handlePurchase(item.id);
                          }}
                          className={`w-full border-2 border-[#2C2C2C] rounded-lg sm:rounded-xl py-1 sm:py-1.5 flex items-center justify-center gap-1 sm:gap-1.5 transition-all
                            ${
                              isOwned
                                ? "bg-[#00D66F] shadow-none cursor-default"
                                : canAfford
                                  ? "bg-[#FFC800] active:translate-y-0.5 shadow-[0_2px_0_0_rgba(0,0,0,1)] active:shadow-none cursor-pointer"
                                  : "bg-[#E0E0E0] cursor-not-allowed"
                            }`}
                        >
                          {isOwned ? (
                            <>
                              <Check
                                className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                                strokeWidth={4}
                              />
                              <span className="font-['Press_Start_2P'] text-[6px] sm:text-[8px] text-white pt-0.5">
                                OWNED
                              </span>
                            </>
                          ) : (
                            <>
                              <img
                                src="https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/screens/coin.png"
                                alt="Coin"
                                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 object-contain ${!canAfford && "grayscale opacity-60"}`}
                              />
                              <span
                                className={`font-['Press_Start_2P'] text-[7px] sm:text-[9px] pt-0.5 ${!canAfford ? "text-[#FF4757]" : "text-[#2C2C2C]"}`}
                              >
                                {item.price}
                              </span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 sm:py-20 opacity-50">
              <Ghost className="w-12 h-12 sm:w-16 sm:h-16 text-[#754F26] mb-3 sm:mb-4 animate-bounce" />
              <p className="font-['Press_Start_2P'] text-[8px] sm:text-[10px] text-[#754F26] text-center leading-loose">
                OUT OF STOCK!
                <br />
                COME BACK LATER.
              </p>
            </div>
          )}
        </div>
      </main>

      {modalState.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="bg-[#FFFDF5] border-4 border-[#2C2C2C] rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)] sm:shadow-[8px_8px_0_0_rgba(0,0,0,1)] max-w-sm w-full text-center flex flex-col items-center animate-in zoom-in-95 duration-200 relative overflow-hidden">
            {modalState.type === "success" && (
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#FFC800_0,#FFFDF5_100%)] animate-[pulse_2s_infinite]" />
            )}

            <div className="relative mb-4 sm:mb-6 mt-2 sm:mt-4">
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-[#2C2C2C] flex items-center justify-center bg-white shadow-inner relative z-10
                ${modalState.type === "success" ? "bg-[#FFF8E1]" : "bg-[#FFEAEB]"}`}
              >
                {modalState.type === "success" && modalState.imageUrl ? (
                  modalState.imageUrl.startsWith("http") ? (
                    <img
                      src={modalState.imageUrl}
                      alt="Item"
                      className="w-12 h-12 sm:w-16 sm:h-16 object-contain animate-[bounce_2s_infinite]"
                    />
                  ) : (
                    <span className="text-4xl sm:text-5xl">
                      {modalState.imageUrl}
                    </span>
                  )
                ) : modalState.type === "success" ? (
                  <span className="text-4xl sm:text-5xl">🎉</span>
                ) : (
                  <AlertCircle
                    className="w-10 h-10 sm:w-12 sm:h-12 text-[#FF4757]"
                    strokeWidth={3}
                  />
                )}
              </div>

              {modalState.type === "success" && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 bg-[#FFC800] rounded-full opacity-20 blur-xl animate-pulse" />
              )}
            </div>

            <h2
              className={`font-['Press_Start_2P'] text-sm sm:text-lg mb-2 sm:mb-3 relative z-10 leading-snug
                ${modalState.type === "success" ? "text-[#00D66F]" : "text-[#FF4757]"}`}
            >
              {modalState.type === "success"
                ? "ITEM ACQUIRED!"
                : "PURCHASE FAILED"}
            </h2>

            <p className="font-['Press_Start_2P'] text-[#2C2C2C] font-bold mb-6 sm:mb-8 text-[8px] sm:text-[10px] leading-relaxed relative z-10">
              {modalState.message}
            </p>

            <button
              onClick={() => {
                playClickSound();
                setModalState({ ...modalState, isOpen: false });
              }}
              className={`w-full border-4 border-[#2C2C2C] rounded-xl px-4 sm:px-6 py-3 sm:py-4 relative z-10 shadow-[3px_3px_0_0_rgba(0,0,0,1)] sm:shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all flex justify-center items-center gap-2
                ${modalState.type === "success" ? "bg-[#FFC800] hover:bg-[#FFD54F]" : "bg-white hover:bg-gray-50"}`}
            >
              {modalState.type === "success" ? (
                <>
                  <Check
                    className="w-4 h-4 sm:w-5 sm:h-5 text-[#2C2C2C]"
                    strokeWidth={4}
                  />
                  <span className="font-['Press_Start_2P'] text-[9px] sm:text-[11px] text-[#2C2C2C] pt-0.5">
                    SWEET!
                  </span>
                </>
              ) : (
                <span className="font-['Press_Start_2P'] text-[9px] sm:text-[11px] text-[#2C2C2C] pt-0.5">
                  TRY AGAIN
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
