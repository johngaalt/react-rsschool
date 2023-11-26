import React from "react";
import { Details } from "../state/queryApi.types";
import SearchResultItem from "./SearchResultItem";
import Pagination from "./Pagination";
import { useGetAllQuery } from "../state/query";
import { useAppSelector } from "../state/hooks";
import { selectCurrentPage, selectLimit } from "../state/SidebarSlice";
import { selectSearchTerm } from "../state/SearchTermSlice";

export default function SearchResults(): React.ReactElement {
  const currentPage = useAppSelector(selectCurrentPage);
  const searchTerm = useAppSelector(selectSearchTerm);
  const limit = useAppSelector(selectLimit);

  console.log(currentPage);
  const { data } = useGetAllQuery({ searchTerm, limit, page: currentPage });

  const searchParam = String(currentPage);
  const people = data?.results || [];

  return (
    <div className="flex flex-col justify-center items-start ">
      <div className="flex flex-row mb-5">
        <h1 className="text-3xl font-bold mr-3 ">Search Results</h1>
      </div>
      {people.length === 0 && <h2 className="text-xl font-bold">No results</h2>}
      {people.map((character: Details) => (
        <SearchResultItem
          key={character.name}
          details={character}
          searchParam={searchParam}
        />
      ))}
      <Pagination
        hasNextPage={Boolean(data?.next)}
        hasPreviousPage={Boolean(data?.previous)}
      />
    </div>
  );
}
