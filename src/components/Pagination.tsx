import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import {
  selectCurrentPage,
  selectLimit,
  setCurrentPage,
  setLimit,
} from "../state/SidebarSlice";
import { PaginationProps } from "./Pagination.types";

export default function Pagination({
  hasNextPage,
  hasPreviousPage,
}: PaginationProps) {
  const selectRef = useRef<HTMLSelectElement>(null);
  const currentPage = useAppSelector(selectCurrentPage);
  const limit = useAppSelector(selectLimit);
  const dispatch = useAppDispatch();

  const searchParam = String(currentPage);
  const buttonNextClass = hasNextPage ? "bg-white" : "bg-gray-300";
  const buttonPreviousClass = hasPreviousPage ? "bg-white" : "bg-gray-300";

  function fetchByLimit(limit: number) {
    dispatch(setLimit(limit));
  }

  function fetchPreviousPage() {
    dispatch(setCurrentPage(currentPage - 1));
  }

  function fetchNextPage() {
    dispatch(setCurrentPage(currentPage + 1));
  }

  function changeLimit() {
    const limit = selectRef?.current?.value;

    if (limit) {
      fetchByLimit(Number(limit));
    }
  }

  return (
    <div className="flex flex-row justify-between items-center mt-10 gap-3">
      <h2 className="text-xl font-bold" data-testid="current-page">
        Page: {searchParam}
      </h2>
      <button
        disabled={!hasPreviousPage}
        className={`flex justify-center items-center py-1 px-2 mr-3 cursor-pointer ${buttonPreviousClass} text-orange-500 rounded-md hover:text-blue-500 shadow-md hover:shadow-lg transition duration-300 ease-in-out`}
        type="button"
        onClick={fetchPreviousPage}
      >
        Previous Page
      </button>
      <button
        disabled={!hasNextPage}
        className={`flex justify-center items-center py-1 px-2 cursor-pointer ${buttonNextClass} text-orange-500 rounded-md hover:text-blue-500 shadow-md hover:shadow-lg transition duration-300 ease-in-out`}
        type="button"
        onClick={fetchNextPage}
      >
        Next Page
      </button>
      <select
        name="limit"
        id="limit"
        ref={selectRef}
        onChange={changeLimit}
        defaultValue={limit}
      >
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
    </div>
  );
}
