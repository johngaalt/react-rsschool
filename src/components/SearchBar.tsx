import React, { useEffect, useState } from "react";
import { SearchBarProps } from "./SearchBar.types";

export default function SearchBar({
  onSearch,
}: SearchBarProps): React.JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem("searchTerm");
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
    }
  }, []);

  const handleSearch = () => {
    onSearch();
  };

  const saveSearchData = (term: string): void => {
    localStorage.setItem("searchTerm", term);

    setSearchTerm(term);
  };

  return (
    <div className="flex justify-center items-center flex-col mb-5">
      <h1 className="mr-3  text-3xl text-bold mb-3">
        Find a person from Star Wars
      </h1>
      <div className="flex flex-row">
        <input
          className="search-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Search"
          type="search"
          onChange={(e) => saveSearchData(e.target.value)}
          value={searchTerm || ""}
        />
        <button
          className="bg-blue-800 text-white rounded py-1 px-4 flex items-center justify-center "
          type="submit"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}
