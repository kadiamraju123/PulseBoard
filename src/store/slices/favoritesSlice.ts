import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FavoriteEntry } from "@/types/content";

const STORAGE_KEY = "pulseboard-favorites";

const loadInitialState = (): FavoriteEntry[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as FavoriteEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: loadInitialState(),
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteEntry>) => {
      const exists = state.some((item) => item.id === action.payload.id && item.kind === action.payload.kind);
      if (!exists) {
        const next = [...state, action.payload];
        if (typeof window !== "undefined") {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        }
        return next;
      }
      return state;
    },
    removeFavorite: (state, action: PayloadAction<{ id: string; kind: string }>) => {
      const next = state.filter((item) => !(item.id === action.payload.id && item.kind === action.payload.kind));
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
      return next;
    },
    clearFavorites: () => {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      }
      return [];
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
