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
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row">
          <h1 className="text-3xl font-bold mr-3">Search Results</h1>
          <button
            disabled={!hasPreviousPage}
            className={`flex justify-center items-center py-1 px-2 mr-3 ${buttonPreviousClass} text-white rounded`}
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
          <div key={result.name}>{result.name}</div>
        ))}
      </div>
    );
  }
}
