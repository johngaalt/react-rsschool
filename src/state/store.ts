import { configureStore } from "@reduxjs/toolkit";
import { searchTermSlice } from "./SearchTermSlice";
import { sidebarSlice } from "./SidebarSlice";
import { swapiApi } from "./query";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    reducer: {
      searchTerm: searchTermSlice.reducer,
      sidebar: sidebarSlice.reducer,
      swapiApi: swapiApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(swapiApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
