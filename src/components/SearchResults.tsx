import React from "react";
import { SearchResultsProps } from "./SearchResults.types";

export default class SearchResults extends React.Component<SearchResultsProps> {
  render(): React.ReactNode {
    const { results } = this.props;
    console.log(results);
    return (
      <div className="search-results">
        <h1>Search Results</h1>
      </div>
    );
  }
}
