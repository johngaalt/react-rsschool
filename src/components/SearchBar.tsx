import React from "react";
import { SearchBarProps, SearchBarState } from "./SearchBar.types";

export default class SearchBar extends React.Component<
  SearchBarProps,
  SearchBarState
> {
  constructor(props = {}) {
    super(props);

    this.state = {
      searchTerm: "",
    };
  }

  saveSearchData = (searchTerm: string): void => {
    localStorage.setItem("searchTerm", searchTerm);
    this.setState({ searchTerm });
  };

  render(): React.ReactNode {
    const { searchTerm } = this.state;
    return (
      <div className="flex justify-center align-middle">
        <h1 className="mr-3 text-blue-800 text-3xl text-bold">Star Wars</h1>
        <input
          className="search-input"
          placeholder="Search"
          type="text"
          onChange={(e) => this.saveSearchData(e.target.value)}
          value={searchTerm}
        />
        <button
          className="bg-blue-800 text-white rounded py-2 px-4 flex align-middle justify-center "
          type="submit"
        >
          Search
        </button>
      </div>
    );
  }
}
