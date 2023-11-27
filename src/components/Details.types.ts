import { Details } from "src/state/queryApi.types";

export interface DetailsProps {
  isFetching: boolean;
  details?: Details;
  closeDetailsSection: () => void;
}
