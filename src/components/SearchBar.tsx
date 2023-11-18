import React, { useContext, useRef } from "react";
import { SidebarContext } from "./SidebarContext";
import { useDispatch } from "react-redux";
import { saveTerm, selectSearchTerm } from "../state/SearchTermSlice";
import { useAppSelector } from "../state/hooks";

export default function SearchBar(): React.JSX.Element {
  const { fetchPeople } = useContext(SidebarContext);
  const searchTerm = useAppSelector(selectSearchTerm);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (inputRef.current) {
      dispatch(saveTerm(inputRef.current.value));
      fetchPeople();
    }
  };

  return (
    <div className="flex  flex-col mb-5 ">
      <div className="mr-3  mb-3" />
      <div className="flex flex-row">
        <input
          ref={inputRef}
          defaultValue={searchTerm}
          className="search-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Type person's name"
          type="search"
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
