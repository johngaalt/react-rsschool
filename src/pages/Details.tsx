import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StarWarsService from "../services/StarWarsService";
import { Details as DetailsType } from "../services/StarWarsService.types";
import cross from "../assets/cross-1.svg";
import { Paths } from "../components/Router.types";

export default function Details() {
  const { id } = useParams();
  const [details, setDetails] = useState<DetailsType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const closeDetailsSection = () => {
    navigate(Paths.Home);
  };

  useEffect(() => {
    async function fetchDetails() {
      if (id) {
        setIsLoading(true);
        const response = await StarWarsService.getById(id);
        setDetails(response);
        setIsLoading(false);
      }
    }
    fetchDetails();
  }, [id]);

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
          <img
            src={cross}
            alt="cross"
            width={30}
            height={30}
            className="text-orange-500 hover:scale-125 transition duration-300 ease-in-out"
          />
        </button>
      </div>
      {isLoading ? (
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
