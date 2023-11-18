import { createContext, useCallback, useEffect, useState } from "react";
import {
  SidebarContextTypes,
  SidebarContextProviderProps,
} from "./SidebarContext.types";
import { Details } from "../services/StarWarsService.types";
import { useSearchParams } from "react-router-dom";
import StarWarsService from "../services/StarWarsService";
import { useSelector } from "react-redux";
import { selectSearchTerm } from "../state/SearchTermSlice";

export const SidebarContext = createContext<SidebarContextTypes>({
  people: [],
  hasNextPage: false,
  hasPreviousPage: false,
  isLoading: false,
  fetchNextPage: () => {},
  fetchPreviousPage: () => {},
  currentPage: 1,
  fetchPeople: () => {},
  fetchByLimit: () => {},
  limit: 10,
});

export function SidebarContextProvider({
  children,
}: SidebarContextProviderProps) {
  const [people, setPeople] = useState<Details[]>([]);
  const [limit, setLimit] = useState<number>(10);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
  const searchTerm = useSelector(selectSearchTerm);
  const currentPage = Number(searchParams.get("page"));

  const fetchPeople = useCallback(
    async (page?: number) => {
      setIsLoading(true);
      const response = await StarWarsService.getAll(searchTerm, page, limit);
      setIsLoading(false);
      setPeople(response.results);
      setHasNextPage(!!response.next);
      setHasPreviousPage(!!response.previous);
    },
    [searchTerm, limit],
  );

  const fetchNextPage = async () => {
    setSearchParams({ page: String(currentPage + 1) });
  };

  const fetchPreviousPage = async () => {
    setSearchParams({ page: String(currentPage - 1) });
  };

  const fetchByLimit = (limit: number) => {
    setLimit(limit);
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
        fetchByLimit,
        limit,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
