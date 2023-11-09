import { createContext, useState } from "react";
import {
  SearchTermContextType,
  SearchTermProviderProps,
} from "./SearchTermContext.types";

export const SearchTermContext = createContext<SearchTermContextType>({
  searchTerm: "",
  saveSearchData: () => {},
});

export function SearchTermProvider({ children }: SearchTermProviderProps) {
  const setInitialState = () => {
    return localStorage.getItem("searchTerm") || "";
  };

  const [searchTerm, setSearchTerm] = useState(setInitialState);

  const saveSearchData = (term: string): void => {
    localStorage.setItem("searchTerm", term);
    setSearchTerm(term);
  };

  return (
    <SearchTermContext.Provider value={{ searchTerm, saveSearchData }}>
      {children}
    </SearchTermContext.Provider>
  );
}
