import { createSlice } from "@reduxjs/toolkit";
import { SidebarState } from "./SidebarSlice.types";
import { RootState } from "./store";

const initialState: SidebarState = {
  currentPage: 1,
  limit: 10,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setLimit(state, action) {
      state.limit = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { setLimit, setCurrentPage } = sidebarSlice.actions;

export const selectCurrentPage = (state: RootState) =>
  state.sidebar.currentPage;

export const selectLimit = (state: RootState) => state.sidebar.limit;
