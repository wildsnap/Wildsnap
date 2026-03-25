"use client";

import { ChevronLeft, Check, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useSettings } from "../contexts/AudioContext";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3100";

import type { InventoryItem } from "../page";

interface EditAvatarScreenProps {
  inventory: InventoryItem[];
  onBack: () => void;
  onSaveSuccess: () => void;
}

export function EditAvatarScreen({
  inventory,
  onBack,
  onSaveSuccess,
}: EditAvatarScreenProps) {
  const { userId: clerkId } = useAuth();
  const { playClickSound } = useSettings();

  const [activeTab, setActiveTab] = useState<"HEAD" | "BODY" | "LEG">("HEAD");
  const [isSaving, setIsSaving] = useState(false);

  const [selectedItems, setSelectedItems] = useState<{
    HEAD: number | null;
    BODY: number | null;
    LEG: number | null;
  }>({ HEAD: null, BODY: null, LEG: null });

  const [initialItems, setInitialItems] = useState<{
    HEAD: number | null;
    BODY: number | null;
    LEG: number | null;
  }>({ HEAD: null, BODY: null, LEG: null });

  useEffect(() => {
    if (!inventory || inventory.length === 0) return;

    const head =
      inventory.find((i) => i.isEquipped && i.item.type === "HEAD")?.id || null;
    const body =
      inventory.find((i) => i.isEquipped && i.item.type === "BODY")?.id || null;
    const leg =
      inventory.find((i) => i.isEquipped && i.item.type === "LEG")?.id || null;

    const initialConfig = { HEAD: head, BODY: body, LEG: leg };
    setSelectedItems(initialConfig);
    setInitialItems(initialConfig);
  }, [inventory]);

  const handleSelect = (inventoryId: number) => {
    playClickSound();

    setSelectedItems((prev) => {
      if (prev[activeTab] === inventoryId) {
        return { ...prev, [activeTab]: null };
      }
      return { ...prev, [activeTab]: inventoryId };
    });
  };

  const handleSave = async () => {
    playClickSound();

    if (
      !clerkId ||
      !selectedItems.HEAD ||
      !selectedItems.BODY ||
      !selectedItems.LEG
    ) {
      return;
    }

    setIsSaving(true);

    try {
      const itemsToEquip: number[] = [];

      if (selectedItems.HEAD && selectedItems.HEAD !== initialItems.HEAD) {
        itemsToEquip.push(selectedItems.HEAD);
      }
      if (selectedItems.BODY && selectedItems.BODY !== initialItems.BODY) {
        itemsToEquip.push(selectedItems.BODY);
      }
      if (selectedItems.LEG && selectedItems.LEG !== initialItems.LEG) {
        itemsToEquip.push(selectedItems.LEG);
      }

      for (const invId of itemsToEquip) {
        const res = await fetch(`${API_BASE_URL}/item/equip/${invId}`, {
          method: "PATCH",
          headers: {
            "x-user-id": clerkId as string,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to equip item ${invId}: ${errorText}`);
        }
      }

      onSaveSuccess();
      onBack();
    } catch (error) {
      console.error("Save failed:", error);
      alert(
        "Failed to save avatar. Please check your connection and try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const previewHead = inventory.find((i) => i.id === selectedItems.HEAD)?.item
    ?.imageUrl;
  const previewBody = inventory.find((i) => i.id === selectedItems.BODY)?.item
    ?.imageUrl;
  const previewLeg = inventory.find((i) => i.id === selectedItems.LEG)?.item
    ?.imageUrl;

  const filteredItems = inventory.filter((i) => i.item.type === activeTab);

  const isComplete = !!(
    selectedItems.HEAD &&
    selectedItems.BODY &&
    selectedItems.LEG
  );
  const hasChanges =
    selectedItems.HEAD !== initialItems.HEAD ||
    selectedItems.BODY !== initialItems.BODY ||
    selectedItems.LEG !== initialItems.LEG;

  return (
    <div className="flex flex-col h-full bg-[#8B9BB4] relative overflow-hidden">
      <div className="bg-[#E2D8C3] border-b-4 border-[#2C2C2C] px-3 sm:px-4 py-3 sm:py-4 shrink-0 z-20 shadow-[0_4px_0_0_rgba(0,0,0,0.2)] flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => {
              playClickSound();
              onBack();
            }}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FF4757] border-4 border-[#2C2C2C] flex items-center justify-center shadow-[4px_4px_0_0_#2C2C2C] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-white" strokeWidth={4} />
          </button>
          <h1 className="font-['Press_Start_2P'] text-sm sm:text-[16px] text-[#2C2C2C] mt-1">
            WARDROBE
          </h1>
        </div>
      </div>

      <div className="bg-[#F5F8F0] h-[35vh] sm:h-72 shrink-0 border-b-4 border-[#2C2C2C] flex flex-col items-center justify-center relative shadow-inner overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#2C2C2C 2px, transparent 2px), linear-gradient(90deg, #2C2C2C 2px, transparent 2px)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative h-full w-full z-10 flex flex-col items-center justify-center py-4">
          {!previewHead && !previewBody && !previewLeg && (
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black/10 border-4 border-dashed border-[#2C2C2C]/30 rounded-xl flex items-center justify-center">
              <span className="text-2xl sm:text-3xl opacity-50">👤</span>
            </div>
          )}

          {previewHead && (
            <img
              src={previewHead}
              className="h-[35%] w-auto object-contain z-30 drop-shadow-md"
              alt="Head"
            />
          )}

          {previewBody && (
            <img
              src={previewBody}
              className="h-[35%] w-auto object-contain z-20 drop-shadow-md -mt-1 sm:-mt-2"
              alt="Body"
            />
          )}

          {previewLeg && (
            <img
              src={previewLeg}
              className="h-[40%] w-auto object-contain z-10 -mt-2 sm:-mt-4 drop-shadow-md"
              alt="Legs"
            />
          )}
        </div>
      </div>

      <div className="flex bg-[#E2D8C3] border-b-4 border-[#2C2C2C] shrink-0">
        {(["HEAD", "BODY", "LEG"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              playClickSound();
              setActiveTab(tab);
            }}
            className={`flex-1 py-2.5 sm:py-3 font-['Press_Start_2P'] text-[8px] sm:text-[10px] transition-colors border-r-4 border-[#2C2C2C] last:border-r-0 ${
              activeTab === tab
                ? "bg-[#FFC800] text-[#2C2C2C] shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)]"
                : "bg-transparent text-[#754F26] hover:bg-white/20"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-3 sm:p-4 pb-[120px] sm:pb-[140px]">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {filteredItems.map((inv) => {
            const isSelected = selectedItems[activeTab] === inv.id;

            return (
              <button
                key={inv.id}
                onClick={() => handleSelect(inv.id)}
                className={`relative aspect-square border-4 flex flex-col items-center justify-center p-1 sm:p-2 transition-all ${
                  isSelected
                    ? "border-[#00D66F] bg-[#E8F5E9] shadow-[inset_0_0_10px_rgba(0,214,111,0.3)] scale-95"
                    : "border-[#2C2C2C] bg-white shadow-[2px_2px_0_0_#2C2C2C] sm:shadow-[4px_4px_0_0_#2C2C2C] active:translate-x-1 active:translate-y-1 active:shadow-none"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-1 right-1 bg-[#00D66F] border-2 border-[#2C2C2C] rounded-full p-0.5 z-10">
                    <Check className="w-2 h-2 sm:w-3 sm:h-3 text-white" strokeWidth={4} />
                  </div>
                )}

                <div className="w-full h-full relative flex items-center justify-center">
                  {inv.item.imageUrl ? (
                    <img
                      src={inv.item.imageUrl}
                      alt={inv.item.name}
                      className="w-[80%] h-[80%] object-contain drop-shadow-sm sm:drop-shadow-md"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                </div>
              </button>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="col-span-3 text-center mt-8 sm:mt-10 opacity-70">
              <p className="font-['Press_Start_2P'] text-[8px] sm:text-[10px] text-white leading-loose drop-shadow-sm">
                NO {activeTab} ITEMS YET.
                <br />
                VISIT THE SHOP!
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="relative bottom-20 sm:bottom-24 z-0 mx-10">
        <button
          disabled={!isComplete || !hasChanges || isSaving}
          onClick={handleSave}
          className={`w-full py-3.5 sm:py-4 border-4 rounded-xl flex items-center justify-center gap-2 sm:gap-3 transition-all ${
            isComplete && hasChanges && !isSaving
              ? "bg-[#00D66F] border-[#2C2C2C] text-white shadow-[4px_4px_0_0_#2C2C2C] active:shadow-none active:translate-x-1 active:translate-y-1"
              : "bg-[#A9A9A9] border-[#555] text-[#555] cursor-not-allowed"
          }`}
        >
          <Save className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} />
          <span className="font-['Press_Start_2P'] text-[10px] sm:text-[12px] pt-1">
            {isSaving ? "SAVING..." : "SAVE AVATAR"}
          </span>
        </button>
      </div>
    </div>
  );
}