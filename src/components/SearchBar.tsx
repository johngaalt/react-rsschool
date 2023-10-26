import React from "react";

export default class SearchBar extends React.Component {
  constructor(props = {}) {
    super(props);
  }

  saveSearchData = (searchTerm: string): void => {
    localStorage.setItem("searchTerm", searchTerm);
  };

  render(): React.ReactNode {
    return (
      <div className="flex justify-center align-middle">
        <h1 className="mr-3 text-blue-800 text-3xl text-bold">Star Wars</h1>
        <input
          className="search-input"
          placeholder="Search"
          type="text"
          onChange={(e) => this.saveSearchData(e.target.value)}
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
