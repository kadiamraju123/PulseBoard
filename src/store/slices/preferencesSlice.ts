import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { defaultInterests } from "@/lib/mock-data";
import type { Interest } from "@/types/content";

const STORAGE_KEY = "pulseboard-preferences";

const loadInitialState = (): Interest[] => {
  if (typeof window === "undefined") {
    return defaultInterests;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultInterests;
    }

    const parsed = JSON.parse(raw) as Interest[];
    return Array.isArray(parsed) && parsed.length ? parsed : defaultInterests;
  } catch {
    return defaultInterests;
  }
};

const initialState = loadInitialState();

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setPreferences: (state, action: PayloadAction<Interest[]>) => {
      const next = [...new Set(action.payload)];
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
      return next;
    },
    toggleInterest: (state, action: PayloadAction<Interest>) => {
      const next = state.includes(action.payload)
        ? state.filter((item) => item !== action.payload)
        : [...state, action.payload];

      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }

      return next;
    },
  },
});

export const { setPreferences, toggleInterest } = preferencesSlice.actions;
export default preferencesSlice.reducer;
