import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("searchTerm") || "";

export const searchTermSlice = createSlice({
  name: "searchTerm",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      const term = action.payload;
      localStorage.setItem("searchTerm", term);
      return term;
    },
  },
});

export const { setSearchTerm } = searchTermSlice.actions;
