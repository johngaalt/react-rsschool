import React from "react";
import { SearchBarProps, SearchBarState } from "./SearchBar.types";

export default class SearchBar extends React.Component<
  SearchBarProps,
  SearchBarState
> {
  constructor(props: SearchBarProps) {
    super(props);

    this.state = {
      searchTerm: "",
    };
  }

  componentDidMount(): void {
    const searchTerm = localStorage.getItem("searchTerm");
    this.setState({ searchTerm });
  }

  search = (): void => {
    const { onSearch } = this.props;

    onSearch();
  };

  saveSearchData = (searchTerm: string): void => {
    localStorage.setItem("searchTerm", searchTerm);
    this.setState({ searchTerm });
  };

  render(): React.ReactNode {
    const { searchTerm } = this.state;
    return (
      <div className="flex justify-center items-center flex-col mb-5">
        <h1 className="mr-3 text-blue-800 text-3xl text-bold mb-3">
          Find a person from Star Wars
        </h1>
        <div className="flex flex-row">
          <input
            className="search-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Search"
            type="search"
            onChange={(e) => this.saveSearchData(e.target.value)}
            value={searchTerm || ""}
          />
          <button
            className="bg-blue-800 text-white rounded py-1 px-4 flex items-center justify-center "
            type="submit"
            onClick={this.search}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}
