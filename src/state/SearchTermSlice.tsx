import { createSlice } from "@reduxjs/toolkit";

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
    saveTerm: (state, action) => {
      const term = action.payload;
      localStorage.setItem("searchTerm", term);
      return (state.searchTerm = term);
    },
  },
});

export const selectSearchTerm = (state: SearchTermState) => state.searchTerm;

export const { saveTerm } = searchTermSlice.actions;
