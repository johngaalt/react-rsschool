import { Details } from "../services/StarWarsService.types";

export interface SearchResultsProps {
  results: Details[];
  onNextPage: () => void;
  onPreviousPage: () => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  searchParam: string;
}
