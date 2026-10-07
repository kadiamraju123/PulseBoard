import { configureStore } from "@reduxjs/toolkit";
import { contentApi } from "@/store/api/contentApi";
import favoritesReducer from "@/store/slices/favoritesSlice";
import feedReducer from "@/store/slices/feedSlice";
import preferencesReducer from "@/store/slices/preferencesSlice";
import uiReducer from "@/store/slices/uiSlice";

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    favorites: favoritesReducer,
    feed: feedReducer,
    ui: uiReducer,
    [contentApi.reducerPath]: contentApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(contentApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
