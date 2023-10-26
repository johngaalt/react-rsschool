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
      <div className="flex justify-center align-middle">
        <h1 className="mr-3 text-blue-800 text-3xl text-bold">Star Wars</h1>
        <input
          className="search-input"
          placeholder="Search"
          type="search"
          onChange={(e) => this.saveSearchData(e.target.value)}
          value={searchTerm || ""}
        />
        <button
          className="bg-blue-800 text-white rounded py-2 px-4 flex align-middle justify-center "
          type="submit"
          onClick={this.search}
        >
          Search
        </button>
      </div>
    );
  }
}
