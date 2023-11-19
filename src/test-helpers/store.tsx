import { configureStore } from "@reduxjs/toolkit";
import { searchTermSlice } from "../state/SearchTermSlice";
import { sidebarSlice } from "../state/SidebarSlice";
import { swapiApi } from "../state/query";
import { Provider } from "react-redux";

export function wrapWithStore(ui: React.ReactElement) {
  const store = configureStore({
    reducer: {
      searchTerm: searchTermSlice.reducer,
      sidebar: sidebarSlice.reducer,
      swapiApi: swapiApi.reducer,
    },
  });

  return <Provider store={store}>{ui}</Provider>;
}
