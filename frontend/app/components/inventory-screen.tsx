"use client";

import { Ghost, Check } from "lucide-react";

interface ShopItem {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  type: string;
}

interface InventoryScreenProps {
  items: ShopItem[];
  ownedItemIds: number[];
}

export function InventoryScreen({ items, ownedItemIds }: InventoryScreenProps) {
  const ownedItems = items.filter((item) => ownedItemIds.includes(item.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm border-2 border-[#2C2C2C] rounded-lg px-3 py-2 animate-[slideDown_0.3s_ease-out]">
        <span className="text-[12px] font-['Press_Start_2P'] text-[#2C2C2C]">MY COLLECTION</span>
        <span className="text-[#00D66F] text-[14px] font-['Press_Start_2P']">
          {ownedItems.length} ITEMS
        </span>
      </div>

      {ownedItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          {ownedItems.map((item, idx) => (
            <div
              key={item.id}
              className="relative bg-[#F0FDF4] border-4 border-[#00A854] opacity-90 rounded-2xl p-3 flex flex-col items-center justify-between animate-[fadeIn_0.5s_ease-out]"
              style={{
                animationDelay: `${idx * 50}ms`,
                animationFillMode: "both",
              }}
            >
              <div className="w-full aspect-square rounded-xl flex items-center justify-center mb-3 border-2 border-[#86EFAC] bg-[#D3F9E5] relative overflow-hidden">
                {item.imageUrl?.startsWith("http") ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-14 h-14 object-contain transition-transform hover:scale-110"
                  />
                ) : (
                  <span className="text-4xl">{item.imageUrl || "📦"}</span>
                )}
              </div>

              <div className="w-full text-center flex flex-col flex-1 justify-between">
                <p className="text-[10px] font-['Press_Start_2P'] font-black leading-tight line-clamp-2 mb-2 min-h-[2rem] text-[#00A854]">
                  {item.name}
                </p>

                <button
                  disabled
                  className="w-full border-2 border-[#2C2C2C] rounded-xl py-1.5 flex items-center justify-center gap-1.5 bg-[#00D66F] shadow-none cursor-default"
                >
                  <Check className="w-3 h-3 text-white" strokeWidth={4} />
                  <span className="text-[8px] font-['Press_Start_2P'] text-white pt-0.5">OWNED</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 opacity-50 animate-[fadeIn_0.3s_ease-out]">
          <img
            src="https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/screens/bag_open.png"
            alt="Bag Empty"
            className="w-24 h-24 object-contain animate-[bounce_3s_ease-in-out_infinite] drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)] opacity-90"
          />
          <p className="text-lg text-[#754F26] text-center leading-loose font-['Press_Start_2P']">
            YOUR BAG IS EMPTY!
            <br />
            GO BUY SOMETHING.
          </p>
        </div>
      )}
    </div>
  );
}
