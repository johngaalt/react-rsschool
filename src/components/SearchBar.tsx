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
    <div className="flex  flex-col mb-5 ">
      <div className="mr-3  mb-3" />
      <div className="flex flex-row">
        <input
          className="search-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Type person's name"
          type="search"
          onChange={(e) => saveSearchData(e.target.value)}
          value={searchTerm || ""}
        />
        <button
          className="bg-white text-orange-500 rounded-md py-1 px-4 flex items-center justify-center hover:text-blue-500 shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          type="submit"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}
