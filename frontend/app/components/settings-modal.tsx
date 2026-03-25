"use client";

import { X, Volume2, Globe, Bell, Settings } from "lucide-react";
import { useSettings } from "../contexts/AudioContext";

interface SettingsModalProps {
  onClose: () => void;
}

export function SettingsModal({ onClose }: SettingsModalProps) {
  const {
    hasMusic,
    hasSound,
    hasVibration,
    screenMode,
    language,
    updateSetting,
    playClickSound,
  } = useSettings();

  const languages = [
    {
      id: "en",
      name: "English",
      flag: "https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/settings/flag_en.png",
    },
    {
      id: "th",
      name: "Thai",
      flag: "https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/settings/flag_th.png",
    },
  ];

  const ToggleSwitch = ({
    enabled,
    onChange,
  }: {
    enabled: boolean;
    onChange: (value: boolean) => void;
  }) => (
    <button
      onClick={() => {
        onChange(!enabled);
        playClickSound();
      }}
      className={`
        relative w-14 h-8 rounded-full border-3 border-[#2C2C2C] transition-colors duration-200 shadow-inner shrink-0
        ${enabled ? "bg-[#00D66F]" : "bg-[#D1D5DB]"}
      `}
    >
      <div
        className={`
          absolute top-[2px] w-5 h-5 bg-white border-2 border-[#2C2C2C] rounded-full 
          shadow-[0_2px_0_0_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out
          ${enabled ? "left-[30px]" : "left-[2px]"}
        `}
      />
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-[#F5F8F0] border-t-4 border-l-4 border-r-4 border-[#2C2C2C] rounded-t-[2rem] shadow-[0_-8px_0_0_rgba(0,0,0,0.3)] animate-[slideUp_0.3s_ease-out] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="relative bg-[#FF9800] border-b-4 border-[#2C2C2C] p-5 rounded-t-[1.75rem] shrink-0 z-20">
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="absolute top-4 right-4 w-9 h-9 bg-[#FF4757] border-3 border-[#2C2C2C] rounded-full flex items-center justify-center shadow-[2px_2px_0_0_rgba(0,0,0,0.4)] active:scale-95 active:shadow-none active:translate-y-0.5 transition-all z-10"
          >
            <X className="w-5 h-5 text-white" strokeWidth={4} />
          </button>

          <div className="flex items-center justify-center gap-2 mt-1">
            <Settings className="w-6 h-6 text-white animate-[spin_10s_linear_infinite]" />
            <h2 className="font-['Press_Start_2P'] text-lg text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)] pt-1 tracking-widest">
              SETTINGS
            </h2>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5 space-y-6 overflow-y-auto pb-10 relative">
          <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(45deg,#000,#000_2px,transparent_2px,transparent_6px)] z-0 pointer-events-none" />

          {/* Audio Section */}
          <div className="bg-white border-4 border-[#2C2C2C] rounded-2xl p-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.15)] relative z-10">
            <div className="flex items-center gap-2 mb-4 border-b-2 border-dashed border-gray-200 pb-2">
              <div className="bg-[#E3F2FD] p-1.5 rounded-lg border-2 border-[#2C2C2C]">
                <Volume2 className="w-4 h-4 text-[#2196F3]" />
              </div>
              <h3 className="font-['Press_Start_2P'] text-[12px] text-[#2C2C2C] pt-1">
                AUDIO & MUSIC
              </h3>
            </div>

            <div className="space-y-4">
              {/* Sound Effects */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      hasSound
                        ? "https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/settings/sound_on.png"
                        : "https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/settings/sound_off.png"
                    }
                    alt="Sound"
                    className="w-10 h-10 object-contain drop-shadow-sm"
                  />
                  <div>
                    <p className="font-['Press_Start_2P'] font-black text-[#2C2C2C] text-[10px]">
                      Sound Effects
                    </p>
                    <p className="font-['Press_Start_2P'] text-[8px] text-[#754F26] font-bold">
                      Clicks & Alerts
                    </p>
                  </div>
                </div>
                <ToggleSwitch enabled={hasSound} onChange={(val) => updateSetting("hasSound", val)} />
              </div>

              {/* Music */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      hasMusic
                        ? "https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/settings/music_on.png"
                        : "https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/settings/music_off.png"
                    }
                    alt="Music"
                    className="w-10 h-10 object-contain drop-shadow-sm"
                  />
                  <div>
                    <p className="font-['Press_Start_2P'] font-black text-[#2C2C2C] text-[10px]">
                      Background Music
                    </p>
                    <p className="font-['Press_Start_2P'] text-[#754F26] font-bold text-[8px]">
                      Game Soundtrack
                    </p>
                  </div>
                </div>
                <ToggleSwitch enabled={hasMusic} onChange={(val) => updateSetting("hasMusic", val)} />
              </div>
            </div>
          </div>
{/* 
          {/* Preferences Section
          <div className="bg-white border-4 border-[#2C2C2C] rounded-2xl p-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.15)] relative z-10">
            <div className="flex items-center gap-2 mb-4 border-b-2 border-dashed border-gray-200 pb-2">
              <div className="bg-[#FFF3E0] p-1.5 rounded-lg border-2 border-[#2C2C2C]">
                <Bell className="w-4 h-4 text-[#FF9800]" />
              </div>
              <h3 className="font-['Press_Start_2P'] text-[12px] text-[#2C2C2C] pt-1">
                PREFERENCES
              </h3>
            </div>

            <div className="space-y-4">
              {/* Vibration
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      hasVibration
                        ? "https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/settings/vibrate_on.png"
                        : "https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/settings/vibrate_off.png"
                    }
                    alt="Vibration"
                    className="w-10 h-10 object-contain drop-shadow-sm"
                  />
                  <div>
                    <p className="font-['Press_Start_2P'] font-black text-[#2C2C2C] text-[10px]">
                      Vibration
                    </p>
                    <p className="font-['Press_Start_2P'] text-[#754F26] font-bold text-[8px]">
                      Haptic Feedback
                    </p>
                  </div>
                </div>
                <ToggleSwitch
                  enabled={hasVibration}
                  onChange={(val) => updateSetting("hasVibration", val)}
                />
              </div>

              {/* Dark Mode 
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      screenMode === "dark"
                        ? "https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/settings/screen-mode_dark.png"
                        : "https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/settings/screen-mode_light.png"
                    }
                    alt="Dark Mode"
                    className="w-10 h-10 object-contain drop-shadow-sm"
                  />
                  <div>
                    <p className="font-['Press_Start_2P'] font-black text-[#2C2C2C] text-[10px]">
                      Dark Mode
                    </p>
                    <p className="font-['Press_Start_2P'] text-[#754F26] font-bold text-[8px]">
                      Easy on the eyes
                    </p>
                  </div>
                </div>
                <ToggleSwitch 
                  enabled={screenMode === "dark"} 
                  onChange={(val) => updateSetting("screenMode", val ? "dark" : "light")} 
                />
              </div>
            </div>
          </div>

          {/* Language Section
          <div className="bg-white border-4 border-[#2C2C2C] rounded-2xl p-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.15)] relative z-10">
            <div className="flex items-center gap-2 mb-4 border-b-2 border-dashed border-gray-200 pb-2">
              <div className="bg-[#E8F5E9] p-1.5 rounded-lg border-2 border-[#2C2C2C]">
                <Globe className="w-4 h-4 text-[#4CAF50]" />
              </div>
              <h3 className="font-['Press_Start_2P'] text-[12px] text-[#2C2C2C] pt-1">
                LANGUAGE
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => {
                    playClickSound();
                    updateSetting("language", lang.id);
                  }}
                  className={`
                    relative flex items-center justify-start gap-2 p-3 rounded-xl border-3 border-[#2C2C2C]
                    transition-all duration-200 
                    ${
                      language === lang.id
                        ? "bg-[#FFC800] translate-y-1 shadow-none"
                        : "bg-[#F5F5F5] hover:bg-[#E0E0E0] shadow-[0_4px_0_0_rgba(0,0,0,0.2)] active:translate-y-1 active:shadow-none"
                    }
                  `}
                >
                  <img
                    src={lang.flag}
                    alt="Flag"
                    className="w-10 h-10 object-contain drop-shadow-sm"
                  />
                  <span
                    className={`font-['Press_Start_2P'] font-black text-[10px] ${language === lang.id ? "text-[#2C2C2C]" : "text-[#757575]"}`}
                  >
                    {lang.name}
                  </span>

                  {language === lang.id && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#00D66F] border-2 border-[#2C2C2C] rounded-full flex items-center justify-center z-10">
                      <span className="text-white text-[10px] font-bold">
                        ✓
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div> */}

          {/* App Info Footer */}
          <div className="bg-[#FFFDF5] border-3 border-[#D1D5DB] border-dashed rounded-xl p-2 text-center relative z-10 mt-6">
            <p className="text-xs text-[#A3A3A3] font-bold">WILDSNAP V 1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}