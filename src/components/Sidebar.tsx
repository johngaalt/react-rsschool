import {
  SyntheticEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import StarWarsService from "../services/StarWarsService";
import { Details } from "../services/StarWarsService.types";
import ErrorButton from "./ErrorButton";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import { Paths } from "./Router.types";
import { SearchTermContext } from "./SearchTermContext";

export default function Sidebar() {
  const [people, setPeople] = useState<Details[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
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
    await fetchPeople(currentPage + 1);
  };

  const fetchPreviousPage = async () => {
    setSearchParams({ page: String(currentPage - 1) });
    await fetchPeople(currentPage - 1);
  };

  useEffect(() => {
    fetchPeople(currentPage);
  }, [fetchPeople, currentPage]);

  const navigateToHome = (e: SyntheticEvent) => {
    if (e.target === sidebarRef.current) {
      navigate(Paths.Home);
    }
  };

  return (
    <>
      <div
        className="flex flex-col w-1/3 h-full cursor-pointer"
        ref={sidebarRef}
        onClick={(e) => {
          navigateToHome(e);
        }}
      >
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
