import { Details } from "../state/queryApi.types";

export interface SearchResultsProps {
  results: Details[];
  onNextPage: () => void;
  onPreviousPage: () => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  searchParam: string;
}
