import React from "react";
import { SearchResultsProps } from "./SearchResults.types";

export default class SearchResults extends React.Component<SearchResultsProps> {
  render(): React.ReactNode {
    const { results, onNextPage, onPreviousPage } = this.props;
    return (
      <div className="flex flex-col justify-center items-center ">
        <div className="flex flex-row">
          <h1 className="text-3xl font-bold mr-3">Search Results</h1>
          <button
            className="flex justify-center items-center py-1 px-2 mr-3 bg-blue-800 text-white rounded"
            type="button"
            onClick={onPreviousPage}
          >
            Previous Page
          </button>
          <button
            className="flex justify-center items-center py-1 px-2 bg-blue-800 text-white rounded"
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
