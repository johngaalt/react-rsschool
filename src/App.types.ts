import { Details } from "./state/queryApi.types";

export interface AppProps {}

export interface AppState {
  people: Details[];
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isLoading: boolean;
}
