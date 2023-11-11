import React, { useContext, useRef } from "react";
import { Details } from "../services/StarWarsService.types";
import { SidebarContext } from "./SidebarContext";
import SearchResultItem from "./SearchResultItem";

export default function SearchResults(): React.ReactElement {
  const {
    people,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    currentPage,
    fetchByLimit,
    limit,
  } = useContext(SidebarContext);

  const selectRef = useRef<HTMLSelectElement>(null);

  const buttonNextClass = hasNextPage ? "bg-white" : "bg-gray-300";
  const buttonPreviousClass = hasPreviousPage ? "bg-white" : "bg-gray-300";
  const searchParam = String(currentPage);

  function changeLimit() {
    const limit = selectRef?.current?.value;

    if (limit) {
      fetchByLimit(Number(limit));
    }
  }

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
      <div className="flex flex-row justify-between items-center mt-10 gap-3">
        <h2 className="text-xl font-bold">Page: {searchParam}</h2>
        <button
          disabled={!hasPreviousPage}
          className={`flex justify-center items-center py-1 px-2 mr-3 cursor-pointer ${buttonPreviousClass} text-orange-500 rounded-md hover:text-blue-500 shadow-md hover:shadow-lg transition duration-300 ease-in-out`}
          type="button"
          onClick={fetchPreviousPage}
        >
          Previous Page
        </button>
        <button
          disabled={!hasNextPage}
          className={`flex justify-center items-center py-1 px-2 cursor-pointer ${buttonNextClass} text-orange-500 rounded-md hover:text-blue-500 shadow-md hover:shadow-lg transition duration-300 ease-in-out`}
          type="button"
          onClick={fetchNextPage}
        >
          Next Page
        </button>
        <select
          name="limit"
          id="limit"
          ref={selectRef}
          onChange={changeLimit}
          defaultValue={limit}
        >
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>
    </div>
  );
}
