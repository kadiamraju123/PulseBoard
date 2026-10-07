import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ThemeState } from "@/types/content";

const STORAGE_KEY = "pulseboard-theme";

const initialTheme: ThemeState["mode"] = "system";

const loadTheme = (): ThemeState["mode"] => {
  if (typeof window === "undefined") {
    return initialTheme;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === "light" || raw === "dark" || raw === "system") {
    return raw;
  }

  return initialTheme;
};

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    sidebarOpen: false,
    theme: loadTheme(),
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setTheme: (state, action: PayloadAction<ThemeState["mode"]>) => {
      state.theme = action.payload;
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, action.payload);
      }
    },
  },
});

export const { toggleSidebar, setSidebarOpen, setTheme } = uiSlice.actions;
export default uiSlice.reducer;
