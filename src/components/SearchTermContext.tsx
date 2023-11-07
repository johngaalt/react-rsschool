import { createContext, useEffect, useState } from "react";
import {
  SearchTermContextType,
  SearchTermProviderProps,
} from "./SearchTermContext.types";

export const SearchTermContext = createContext<SearchTermContextType>({
  searchTerm: "",
  saveSearchData: () => {},
});

export function SearchTermProvider({ children }: SearchTermProviderProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem("searchTerm");
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
    }
  }, []);

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
