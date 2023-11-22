import Link from "next/link";
import { SearchResultItemProps } from "./SearchResultItem.types";

export default function SearchResultItem({
  details,
  searchParam,
}: SearchResultItemProps) {
  const id = details.url.split("/").at(-2);

  return (
    <div className="flex mb-4 justify-between gap-3" key={details.name}>
      <Link
        href={{
          pathname: `/details/${id}`,
          query: { page: searchParam },
        }}
        className="text-xl text-left font-bold hover:text-blue-400"
        data-testid="search-result"
      >
        {details.name}
      </Link>
    </div>
  );
}
