import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getPersonalizedFeed } from "@/lib/content-utils";
import type { FeedItem, Interest } from "@/types/content";

const STORAGE_KEY = "pulseboard-feed-order";

const loadOrder = (): string[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
};

interface FeedState {
  autoFeed: FeedItem[];
  order: string[];
}

const initialState: FeedState = {
  autoFeed: getPersonalizedFeed(),
  order: loadOrder(),
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setFeed: (state, action: PayloadAction<FeedItem[]>) => {
      state.autoFeed = action.payload;
      state.order = action.payload.map((item) => item.id);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.order));
      }
    },
    setFeedOrder: (state, action: PayloadAction<string[]>) => {
      state.order = action.payload;
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload));
      }
    },
    refreshFeedForInterests: (state, action: PayloadAction<Interest[]>) => {
      const next = getPersonalizedFeed(action.payload);
      state.autoFeed = next;
      state.order = next.map((item) => item.id);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.order));
      }
    },
  },
});

export const { setFeed, setFeedOrder, refreshFeedForInterests } = feedSlice.actions;
export default feedSlice.reducer;
