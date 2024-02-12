import React, { useEffect, useRef } from "react";
import { saveTerm, selectSearchTerm } from "../state/SearchTermSlice";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { useLazyGetAllQuery } from "../state/query";

export default function SearchBar(): React.JSX.Element {
  const [fetchPeople] = useLazyGetAllQuery();
  const searchTerm = useAppSelector(selectSearchTerm);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem("searchTerm") || "";
    dispatch(saveTerm(savedSearchTerm));
  }, [dispatch]);

  const handleSearch = () => {
    if (inputRef.current) {
      const searchTermInputValue = inputRef.current.value;
      dispatch(saveTerm(searchTermInputValue));
      fetchPeople({ searchTerm: searchTermInputValue });
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
