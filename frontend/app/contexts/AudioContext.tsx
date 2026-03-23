"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAuth } from "@clerk/nextjs";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3100";

interface Settings {
  hasMusic: boolean;
  hasSound: boolean;
  hasVibration: boolean;
  screenMode: "light" | "dark";
  language: "en" | "th";
}

interface SettingsContextType extends Settings {
  updateSetting: (key: keyof Settings, value: any) => void;
  playClickSound: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const { userId: clerkId, isLoaded } = useAuth();

  const [settings, setSettings] = useState<Settings>({
    hasMusic: true,
    hasSound: true,
    hasVibration: true,
    screenMode: "light",
    language: "en",
  });

  const [hasInteracted, setHasInteracted] = useState(false);

  const settingsRef = useRef(settings);
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);

  // Fetch Database
  useEffect(() => {
    if (!isLoaded || !clerkId) return;

    const fetchSettings = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/settings`, {
          headers: { "x-user-id": clerkId },
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.hasMusic !== undefined) {
            setSettings({
              hasMusic: data.hasMusic,
              hasSound: data.hasSound,
              hasVibration: data.hasVibration,
              screenMode: data.screenMode,
              language: data.language,
            });
          }
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      }
    };

    fetchSettings();
  }, [clerkId, isLoaded]);

  // Setup
  useEffect(() => {
    if (typeof window !== "undefined" && !bgMusicRef.current) {
      const bgMusic = new Audio(
        "https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/sounds/bg_music.mp3",
      );
      bgMusic.loop = true;
      bgMusic.volume = 0.3;
      bgMusicRef.current = bgMusic;

      clickSoundRef.current = new Audio(
        "https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/sounds/click_sound.mp3",
      );
    }
  }, []);

  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasInteracted(true);

      const music = bgMusicRef.current;
      if (music && settingsRef.current.hasMusic && music.paused) {
        music
          .play()
          .catch((err) => console.log("รอการอนุญาตเล่นเสียง...", err));
      }

      const events = ["click", "touchstart", "keydown", "pointerdown"];
      events.forEach((event) =>
        document.removeEventListener(event, handleFirstInteraction, true),
      );
    };

    const events = ["click", "touchstart", "keydown", "pointerdown"];
    events.forEach((event) =>
      document.addEventListener(event, handleFirstInteraction, true),
    );

    return () => {
      events.forEach((event) =>
        document.removeEventListener(event, handleFirstInteraction, true),
      );
    };
  }, []);

  // Control music play/pause based on settings
  useEffect(() => {
    const music = bgMusicRef.current;
    if (!music) return;

    if (settings.hasMusic && hasInteracted) {
      if (music.paused) {
        music.play().catch(() => {});
      }
    } else {
      music.pause();
    }
  }, [settings.hasMusic, hasInteracted]);

  const playClickSound = () => {
    if (settings.hasSound && clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(() => {});
    }
  };

  const updateSetting = async (key: keyof Settings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));

    if (clerkId) {
      try {
        await fetch(`${API_BASE_URL}/settings`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": clerkId,
          },
          body: JSON.stringify({ [key]: value }),
        });
      } catch (err) {
        console.error("Failed to update setting in DB", err);
      }
    }
  };

  return (
    <SettingsContext.Provider
      value={{ ...settings, updateSetting, playClickSound }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined)
    throw new Error("useSettings must be within SettingsProvider");
  return context;
};
