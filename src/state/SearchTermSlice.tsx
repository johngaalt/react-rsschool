import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface SearchTermState {
  searchTerm: string;
}

const initialState: SearchTermState = {
  searchTerm: localStorage.getItem("searchTerm") || "",
};

export const searchTermSlice = createSlice({
  name: "searchTerm",
  initialState,
  reducers: {
    saveTerm: (state, action: PayloadAction<string>) => {
      const term = action.payload;
      localStorage.setItem("searchTerm", term);
      state.searchTerm = term;
    },
  },
});

export const selectSearchTerm = (state: RootState) =>
  state.searchTerm.searchTerm;

export const { saveTerm } = searchTermSlice.actions;
