import { configureStore } from "@reduxjs/toolkit";
import { searchTermSlice } from "./SearchTermSlice";
import { sidebarSlice } from "./SidebarSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    searchTerm: searchTermSlice.reducer,
    sidebar: sidebarSlice.reducer,
  },
});
