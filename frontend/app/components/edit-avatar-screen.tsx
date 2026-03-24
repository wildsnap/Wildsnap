"use client";

import { ChevronLeft, Check, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useSettings } from "../contexts/AudioContext";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3100";

// Import the type we defined in page.tsx
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

  // Local state to hold the "Preview" selections
  const [selectedItems, setSelectedItems] = useState<{
    HEAD: number | null;
    BODY: number | null;
    LEG: number | null;
  }>({ HEAD: null, BODY: null, LEG: null });

  // Store what they came in with so we only save the differences
  const [initialItems, setInitialItems] = useState<{
    HEAD: number | null;
    BODY: number | null;
    LEG: number | null;
  }>({ HEAD: null, BODY: null, LEG: null });

  // Initialize the preview from the passed-in inventory
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

  // Handle clicking an item in the grid (Preview only)
  const handleSelect = (inventoryId: number) => {
    playClickSound();

    setSelectedItems((prev) => {
      // Toggle off if they click the already selected item
      if (prev[activeTab] === inventoryId) {
        return { ...prev, [activeTab]: null };
      }
      // Otherwise, set the new selection
      return { ...prev, [activeTab]: inventoryId };
    });
  };

  const handleSave = async () => {
    playClickSound();

    // Safety check: Ensure Auth is loaded and all 3 parts are selected
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

      // Safely push only if they exist and have changed
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
            "Content-Type": "application/json", // Good practice
          },
        });

        if (!res.ok) {
          // Grab the actual error from the backend so you can read it in your console
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
      // ALWAYS unlock the button, whether it succeeds or fails
      setIsSaving(false);
    }
  };

  // Find the image URLs for the preview canvas based on LOCAL selection
  const previewHead = inventory.find((i) => i.id === selectedItems.HEAD)?.item
    ?.imageUrl;
  const previewBody = inventory.find((i) => i.id === selectedItems.BODY)?.item
    ?.imageUrl;
  const previewLeg = inventory.find((i) => i.id === selectedItems.LEG)?.item
    ?.imageUrl;

  const filteredItems = inventory.filter((i) => i.item.type === activeTab);

  // Validation rules for the save button
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
      {/* Header */}
      <div className="bg-[#E2D8C3] border-b-4 border-[#2C2C2C] px-4 py-4 sticky top-0 z-20 shadow-[0_4px_0_0_rgba(0,0,0,0.2)] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              playClickSound();
              onBack();
            }}
            className="w-12 h-12 bg-[#FF4757] border-4 border-[#2C2C2C] flex items-center justify-center shadow-[4px_4px_0_0_#2C2C2C] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
          >
            <ChevronLeft className="w-8 h-8 text-white" strokeWidth={4} />
          </button>
          <h1 className="font-['Press_Start_2P'] text-[16px] text-[#2C2C2C] mt-1">
            WARDROBE
          </h1>
        </div>
      </div>

      {/* Character Preview Canvas */}
      <div className="bg-[#F5F8F0] h-72 border-b-4 border-[#2C2C2C] flex flex-col items-center justify-center relative shadow-inner overflow-hidden">
        {/* Retro Background Grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#2C2C2C 2px, transparent 2px), linear-gradient(90deg, #2C2C2C 2px, transparent 2px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Changed wrapper: removed fixed w-32 and overflow-auto, made it full height of parent */}
        <div className="relative h-full w-full z-10 flex flex-col items-center justify-center pt-2">
          {/* Head (Top) -> Set height to a percentage to force it to fit */}
          {previewHead && (
            <img
              src={previewHead}
              className="h-[20%] w-auto object-contain z-30"
              alt="Head"
            />
          )}

          {/* Body (Middle) -> -mt-2 pulls it up to connect to the head */}
          {previewBody && (
            <img
              src={previewBody}
              className="h-[20%] w-auto object-contain z-20"
              alt="Body"
            />
          )}

          {/* Legs (Bottom) -> -mt-4 pulls it up to connect to the body */}
          {previewLeg && (
            <img
              src={previewLeg}
              className="h-[25%] w-auto object-contain z-10 -mt-2"
              alt="Legs"
            />
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#E2D8C3] border-b-4 border-[#2C2C2C]">
        {(["HEAD", "BODY", "LEG"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              playClickSound();
              setActiveTab(tab);
            }}
            className={`flex-1 py-3 font-['Press_Start_2P'] text-[10px] transition-colors border-r-4 border-[#2C2C2C] last:border-r-0 ${
              activeTab === tab
                ? "bg-[#FFC800] text-[#2C2C2C] shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)]"
                : "bg-transparent text-[#754F26] hover:bg-white/20"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Inventory Grid */}
      <div className="flex-1 overflow-y-auto p-4 pb-32">
        <div className="grid grid-cols-3 gap-3">
          {filteredItems.map((inv) => {
            const isSelected = selectedItems[activeTab] === inv.id;

            return (
              <button
                key={inv.id}
                onClick={() => handleSelect(inv.id)}
                className={`relative aspect-square border-4 flex flex-col items-center justify-center p-2 transition-all ${
                  isSelected
                    ? "border-[#00D66F] bg-[#E8F5E9] shadow-[inset_0_0_15px_rgba(0,214,111,0.3)] scale-95"
                    : "border-[#2C2C2C] bg-white shadow-[4px_4px_0_0_#2C2C2C] active:translate-x-1 active:translate-y-1 active:shadow-none"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-1 right-1 bg-[#00D66F] border-2 border-[#2C2C2C] rounded-full p-0.5 z-10">
                    <Check className="w-3 h-3 text-white" strokeWidth={4} />
                  </div>
                )}

                <div className="w-full h-full relative flex items-center justify-center">
                  {inv.item.imageUrl ? (
                    <img
                      src={inv.item.imageUrl}
                      alt={inv.item.name}
                      className="w-[80%] h-[80%] object-contain drop-shadow-md"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                </div>
              </button>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="col-span-3 text-center mt-10 opacity-70">
              <p className="font-['Press_Start_2P'] text-[10px] text-white leading-loose drop-shadow-sm">
                NO {activeTab} ITEMS YET.
                <br />
                VISIT THE SHOP!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Save Button */}
      <div className="absolute bottom-28 left-4 right-4 z-[100]">
        <button
          disabled={!isComplete || !hasChanges || isSaving}
          onClick={handleSave}
          className={`w-full py-4 border-4 rounded-xl flex items-center justify-center gap-3 transition-all ${
            isComplete && hasChanges && !isSaving
              ? "bg-[#00D66F] border-[#2C2C2C] text-white shadow-[4px_4px_0_0_#2C2C2C] active:shadow-none active:translate-x-1 active:translate-y-1"
              : "bg-[#A9A9A9] border-[#555] text-[#555] cursor-not-allowed"
          }`}
        >
          <Save className="w-6 h-6" strokeWidth={3} />
          <span className="font-['Press_Start_2P'] text-[12px] pt-1">
            {isSaving ? "SAVING..." : "SAVE AVATAR"}
          </span>
        </button>
      </div>
    </div>
  );
}
