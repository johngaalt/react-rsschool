import { Details } from "../services/StarWarsService.types";

export interface SidebarContextTypes {
  people: Details[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isLoading: boolean;
  fetchNextPage: () => void;
  fetchPreviousPage: () => void;
  currentPage: number;
  fetchPeople: (page?: number) => void;
  fetchByLimit: (limit: number) => void;
  limit: number;
}

export interface SidebarContextProviderProps {
  children: React.ReactNode;
}
