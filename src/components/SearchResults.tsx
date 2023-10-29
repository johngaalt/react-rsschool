import React from "react";
import { SearchResultsProps } from "./SearchResults.types";

export default class SearchResults extends React.Component<SearchResultsProps> {
  render(): React.ReactNode {
    const {
      results,
      onNextPage,
      onPreviousPage,
      hasNextPage,
      hasPreviousPage,
    } = this.props;

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
        {results.map((result) => (
          <div className="flex mb-4 justify-between gap-3" key={result.name}>
            <h4 className="text-xl text-left font-bold">{result.name}</h4>
            <div>birth year: {result.birth_year}</div>
            <div>eye color: {result.eye_color}</div>
          </div>
        ))}
      </div>
    );
  }
}
