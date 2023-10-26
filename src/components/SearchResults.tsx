import React from "react";
import { SearchResultsProps } from "./SearchResults.types";

export default class SearchResults extends React.Component<SearchResultsProps> {
  render(): React.ReactNode {
    const { results } = this.props;
    return (
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">Search Results</h1>
        {results.map((result) => (
          <div key={result.name}>{result.name}</div>
        ))}
      </div>
    );
  }
}
