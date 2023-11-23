import { useRouter } from "next/router";
import { useGetByIdQuery } from "../state/query";
import Image from "next/image";

export default function Details() {
  const router = useRouter();
  const { id } = router.query;

  const { data: details, isFetching } = useGetByIdQuery(id || "", {
    skip: !id,
  });

  const closeDetailsSection = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-row justify-between items-center gap-10">
        <h1 className="text-orange-500 text-bold text-center text-4xl">
          Star Wars Universe
        </h1>
        <button
          onClick={closeDetailsSection}
          className="cursor-pointer "
          type="button"
        >
          <Image
            src="/cross-1.svg"
            alt="cross"
            width={30}
            height={30}
            className="text-orange-500 hover:scale-125 transition duration-300 ease-in-out"
          />
        </button>
      </div>
      {isFetching ? (
        <div className="flex justify-center items-center">
          <span className="visually-hidden animate-pulse">Loading...</span>
        </div>
      ) : (
        <div className="flex flex-col justify-between items-center border border-orange-500 gap-5 p-5 rounded-lg ">
          <h2 className="text-3xl font-bold"> {details?.name}</h2>
          <p className="text-2xl">birth year: {details?.birth_year}</p>
          <p className="text-2xl">eye color: {details?.eye_color}</p>
          <p className="text-2xl">hair color: {details?.hair_color}</p>
        </div>
      )}
    </div>
  );
}
