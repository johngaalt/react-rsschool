import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Details } from "../services/StarWarsService.types";
import StarWarsService from "../services/StarWarsService";

interface SidebarState {
  people: Details[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isLoading: boolean;
  currentPage: number;
  limit: number;
}

interface FetchError {
  message: string;
}

const initialState: SidebarState = {
  people: [],
  hasNextPage: false,
  hasPreviousPage: false,
  isLoading: false,
  currentPage: 1,
  limit: 10,
};

export const fetchPeople = createAsyncThunk(
  "sidebar/fetchPeople",
  async (
    {
      searchTerm,
      page,
      limit,
    }: { searchTerm: string; page: number; limit: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await StarWarsService.getAll(searchTerm, page, limit);
      return {
        people: response.results,
        hasNextPage: !!response.next,
        hasPreviousPage: !!response.previous,
        currentPage: page,
        limit: limit,
      };
    } catch (error) {
      let errorMessage: string;
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = "An unknown error occurred";
      }
      const errorInfo: FetchError = { message: errorMessage };
      return rejectWithValue(errorInfo);
    }
  },
);

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setLimit(state, action) {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPeople.fulfilled, (state, action) => {
        state.isLoading = false;
        state.people = action.payload.people;
        state.hasNextPage = action.payload.hasNextPage;
        state.hasPreviousPage = action.payload.hasPreviousPage;
        state.currentPage = action.payload.currentPage;
        state.limit = action.payload.limit;
      })
      .addCase(fetchPeople.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setLimit } = sidebarSlice.actions;
