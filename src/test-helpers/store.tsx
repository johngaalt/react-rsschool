import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { searchTermSlice } from "../state/SearchTermSlice";
import { sidebarSlice } from "../state/SidebarSlice";
import { swapiApi } from "../state/query";
import { Provider } from "react-redux";
import { RootState } from "src/state/store";
import { setupListeners } from "@reduxjs/toolkit/query";

export function wrapWithStore(
  ui: React.ReactElement,
  preloadedState?: RootState,
) {
  const store = configureStore({
    reducer: {
      searchTerm: searchTermSlice.reducer,
      sidebar: sidebarSlice.reducer,
      swapiApi: swapiApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(swapiApi.middleware),
    preloadedState,
  });

  setupListeners(store.dispatch);

  return <Provider store={store}>{ui}</Provider>;
}
