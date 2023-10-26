import { Character } from "./services/StarWarsService.types";

export interface AppProps {}

export interface AppState {
  people: Character[];
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isLoading: boolean;
}
