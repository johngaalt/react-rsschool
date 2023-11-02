import React, { useCallback, useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import StarWarsService from "./services/StarWarsService";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorButton from "./components/ErrorButton";
import { Character } from "./services/StarWarsService.types";
import Router from "./components/Router";

function App(): React.ReactElement {
  const [people, setPeople] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    setCurrentPage((prevPage) => prevPage + 1);
    await fetchPeople(currentPage + 1);
  };

  const fetchPreviousPage = async () => {
    setCurrentPage((prevPage) => prevPage - 1);
    await fetchPeople(currentPage - 1);
  };

  useEffect(() => {
    fetchPeople(currentPage);
  }, [currentPage, fetchPeople]);

  return (
    <div className="bg-gray-100 h-screen ">
      <ErrorBoundary>
        <div className="App container flex flex-row justify-between items-center gap-2  ">
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
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
              />
            )}
          </div>
          <div className="flex justify-center items-center w-2/3">
            <Router />
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default App;
