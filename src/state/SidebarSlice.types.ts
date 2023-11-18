import { Details } from "../services/StarWarsService.types";

export interface SidebarState {
  people: Details[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isLoading: boolean;
  currentPage: number;
  limit: number;
}

export interface FetchError {
  message: string;
}
