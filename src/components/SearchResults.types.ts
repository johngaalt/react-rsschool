import { Character } from "../services/StarWarsService.types";

export interface SearchResultsProps {
  results: Character[];
  onNextPage: () => void;
  onPreviousPage: () => void;
}
