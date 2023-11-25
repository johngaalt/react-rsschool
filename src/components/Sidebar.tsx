import { SyntheticEvent, useRef } from "react";
import ErrorButton from "./ErrorButton";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import { useGetAllQuery } from "../state/query";
import { selectSearchTerm } from "../state/SearchTermSlice";
import { selectCurrentPage, selectLimit } from "../state/SidebarSlice";
import { useAppSelector } from "../state/hooks";
import router from "next/router";

export default function Sidebar() {
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
      router.push("/");
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
    </>
  );
}
