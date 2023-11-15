import { configureStore } from "@reduxjs/toolkit";
import { searchTermSlice } from "./SearchTermSlice";
import { sidebarSlice } from "./SidebarSlice";

export const store = configureStore({
  reducer: {
    searchTerm: searchTermSlice.reducer,
    sidebar: sidebarSlice.reducer,
  },
});
