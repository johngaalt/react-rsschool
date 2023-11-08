import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Paths } from "./Router.types";
import { Details } from "../services/StarWarsService.types";
import { SidebarContext } from "./SidebarContext";

export default function SearchResults(): React.ReactElement {
  const {
    people,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    currentPage,
  } = useContext(SidebarContext);

  const buttonNextClass = hasNextPage ? "bg-white" : "bg-gray-300";
  const buttonPreviousClass = hasPreviousPage ? "bg-white" : "bg-gray-300";
  const searchParam = String(currentPage);

  return (
    <div className="flex flex-col justify-center items-start ">
      <div className="flex flex-row mb-5">
        <h1 className="text-3xl font-bold mr-3 ">Search Results</h1>
      </div>
      {people.map((character: Details) => {
        const id = character.url.split("/").at(-2);
        return (
          <div className="flex mb-4 justify-between gap-3" key={character.name}>
            <Link
              to={{
                pathname: `${Paths.Details}/${id}`,
                search: `page=${searchParam}`,
              }}
              className="text-xl text-left font-bold hover:text-blue-400"
            >
              {character.name}
            </Link>
          </div>
        );
      })}
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
      </div>
    </div>
  );
}
