import { configureStore } from "@reduxjs/toolkit";
import { searchTermSlice } from "./SearchTermSlice";
import { sidebarSlice } from "./SidebarSlice";
import { swapiApi } from "./query";
import { setupListeners } from "@reduxjs/toolkit/query";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    searchTerm: searchTermSlice.reducer,
    sidebar: sidebarSlice.reducer,
    swapiApi: swapiApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(swapiApi.middleware),
});

setupListeners(store.dispatch);
