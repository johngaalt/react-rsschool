import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  SidebarContextTypes,
  SidebarContextProviderProps,
} from "./SidebarContext.types";
import { Details } from "../services/StarWarsService.types";
import { useSearchParams } from "react-router-dom";
import StarWarsService from "../services/StarWarsService";
import { SearchTermContext } from "./SearchTermContext";

export const SidebarContext = createContext<SidebarContextTypes>({
  people: [],
  hasNextPage: false,
  hasPreviousPage: false,
  isLoading: false,
  fetchNextPage: () => {},
  fetchPreviousPage: () => {},
  currentPage: 1,
  fetchPeople: () => {},
});

export function SidebarContextProvider({
  children,
}: SidebarContextProviderProps) {
  const [people, setPeople] = useState<Details[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
  const { searchTerm } = useContext(SearchTermContext);

  const currentPage = Number(searchParams.get("page"));

  const fetchPeople = useCallback(
    async (page?: number) => {
      setIsLoading(true);
      const response = await StarWarsService.getAll(searchTerm, page);
      setIsLoading(false);
      setPeople(response.results);
      setHasNextPage(!!response.next);
      setHasPreviousPage(!!response.previous);
    },
    [searchTerm],
  );

  const fetchNextPage = async () => {
    setSearchParams({ page: String(currentPage + 1) });
  };

  const fetchPreviousPage = async () => {
    setSearchParams({ page: String(currentPage - 1) });
  };

  useEffect(() => {
    fetchPeople(currentPage);
  }, [fetchPeople, currentPage]);

  return (
    <SidebarContext.Provider
      value={{
        people,
        hasNextPage,
        hasPreviousPage,
        isLoading,
        currentPage,
        fetchNextPage,
        fetchPreviousPage,
        fetchPeople,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
