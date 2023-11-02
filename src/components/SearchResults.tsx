import React from "react";
import { Link } from "react-router-dom";
import { SearchResultsProps } from "./SearchResults.types";

export default function SearchResults({
  hasNextPage,
  hasPreviousPage,
  results,
  onNextPage,
  onPreviousPage,
}: SearchResultsProps): React.ReactElement {
  const buttonNextClass = hasNextPage ? "bg-blue-800" : "bg-gray-300";

  const buttonPreviousClass = hasPreviousPage ? "bg-blue-800" : "bg-gray-300";

  return (
    <div className="flex flex-col justify-center items-start ">
      <div className="flex flex-row mb-5">
        <h1 className="text-3xl font-bold mr-3 ">Search Results</h1>
        <button
          disabled={!hasPreviousPage}
          className={`flex justify-center items-center py-1 px-2 mr-3  ${buttonPreviousClass} text-white rounded`}
          type="button"
          onClick={onPreviousPage}
        >
          Previous Page
        </button>
        <button
          disabled={!hasNextPage}
          className={`flex justify-center items-center py-1 px-2 ${buttonNextClass} text-white rounded`}
          type="button"
          onClick={onNextPage}
        >
          Next Page
        </button>
      </div>
      {results.map((result) => {
        const id = result.url.split("/").at(-2);
        return (
          <div className="flex mb-4 justify-between gap-3" key={result.name}>
            <Link
              to={`/character/${id}}`}
              className="text-xl text-left font-bold"
            >
              {result.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
