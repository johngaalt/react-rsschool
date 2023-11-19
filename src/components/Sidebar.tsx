import { SyntheticEvent, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ErrorButton from "./ErrorButton";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import { Paths } from "./Router.types";
import { useGetAllQuery } from "../state/query";
import { selectSearchTerm } from "../state/SearchTermSlice";
import { selectCurrentPage, selectLimit } from "../state/SidebarSlice";
import { useAppSelector } from "../state/hooks";

export default function Sidebar() {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const currentPage = useAppSelector(selectCurrentPage);
  const searchTerm = useAppSelector(selectSearchTerm);
  const limit = useAppSelector(selectLimit);
  const { isFetching } = useGetAllQuery({
    searchTerm,
    limit,
    page: currentPage,
  });

  const navigateToHome = (e: SyntheticEvent) => {
    if (e.target === sidebarRef.current) {
      navigate(Paths.Home);
    }
  };

  return (
    <>
      <div
        data-testid="sidebar"
        className="flex flex-col w-1/3 h-full cursor-pointer"
        ref={sidebarRef}
        onClick={(e) => {
          navigateToHome(e);
        }}
      >
        <ErrorButton />
        <SearchBar />
        {isFetching ? (
          <div className="flex justify-center items-center animate-pulse">
            Loading...
          </div>
        ) : (
          <SearchResults />
        )}
      </div>
      <div className="flex justify-center items-center w-2/3">
        <Outlet />
      </div>
    </>
  );
}
