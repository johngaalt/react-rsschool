import React, { useContext } from "react";
import { Details } from "../services/StarWarsService.types";
import { SidebarContext } from "./SidebarContext";
import SearchResultItem from "./SearchResultItem";
import Pagination from "./Pagination";

export default function SearchResults(): React.ReactElement {
  const { people, currentPage } = useContext(SidebarContext);

  const searchParam = String(currentPage);

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
      <Pagination />
    </div>
  );
}
