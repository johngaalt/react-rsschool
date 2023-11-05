import { useCallback, useEffect, useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import StarWarsService from "../services/StarWarsService";
import { Character } from "../services/StarWarsService.types";
import ErrorButton from "./ErrorButton";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

export default function Sidebar() {
  const [people, setPeople] = useState<Character[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });

  const currentPage = Number(searchParams.get("page"));

  const fetchPeople = useCallback(async (page?: number) => {
    setIsLoading(true);
    const searchTerm = localStorage.getItem("searchTerm");
    const response = await StarWarsService.getAll(searchTerm, page);
    setIsLoading(false);
    setPeople(response.results);
    setHasNextPage(!!response.next);
    setHasPreviousPage(!!response.previous);
  }, []);

  const fetchNextPage = async () => {
    setSearchParams({ page: String(currentPage + 1) });
    await fetchPeople(currentPage + 1);
  };

  const fetchPreviousPage = async () => {
    setSearchParams({ page: String(currentPage - 1) });
    await fetchPeople(currentPage - 1);
  };

  useEffect(() => {
    fetchPeople(currentPage);
  }, [fetchPeople, currentPage]);

  return (
    <>
      <div className="flex flex-col w-1/3">
        <ErrorButton />
        <SearchBar onSearch={fetchPeople} />
        {isLoading ? (
          <div className="flex justify-center items-center animate-pulse">
            Loading...
          </div>
        ) : (
          <SearchResults
            onNextPage={fetchNextPage}
            onPreviousPage={fetchPreviousPage}
            results={people}
            searchParam={String(currentPage)}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
          />
        )}
      </div>
      <div className="flex justify-center items-center w-2/3">
        <Outlet />
      </div>
    </>
  );
}
