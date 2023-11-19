import { useRef } from "react";
import { useAppSelector } from "../state/hooks";
import { selectCurrentPage, selectLimit } from "../state/SidebarSlice";
import { useLazyGetAllQuery } from "../state/query";
import { selectSearchTerm } from "../state/SearchTermSlice";

export default function Pagination() {
  const selectRef = useRef<HTMLSelectElement>(null);
  const currentPage = useAppSelector(selectCurrentPage);
  const limit = useAppSelector(selectLimit);
  const searchTerm = useAppSelector(selectSearchTerm);
  const [fetchPeople, { data }] = useLazyGetAllQuery();
  const hasNextPage = data?.next;
  const hasPreviousPage = data?.previous;

  const searchParam = String(currentPage);

  function fetchByLimit(limit: number) {
    fetchPeople({ limit, page: currentPage, searchTerm });
  }

  function fetchPreviousPage() {
    fetchPeople({ page: currentPage - 1 });
  }

  function fetchNextPage() {
    fetchPeople({ page: currentPage + 1 });
  }

  function changeLimit() {
    const limit = selectRef?.current?.value;

    if (limit) {
      fetchByLimit(Number(limit));
    }
  }

  const buttonNextClass = hasNextPage ? "bg-white" : "bg-gray-300";
  const buttonPreviousClass = hasPreviousPage ? "bg-white" : "bg-gray-300";

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
