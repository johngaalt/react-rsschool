import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StarWarsService from "../services/StarWarsService";
import { Character as CharacterType } from "../services/StarWarsService.types";
import cross from "../assets/cross-1.svg";

export default function Character() {
  const { id } = useParams();
  const [character, setCharacter] = useState<CharacterType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const closeRightSection = () => {
    navigate("/");
  };

  useEffect(() => {
    async function fetchCharacter() {
      if (id) {
        setIsLoading(true);
        const response = await StarWarsService.getById(id);
        setCharacter(response);
        setIsLoading(false);
      }
    }
    fetchCharacter();
  }, [id]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-row justify-between items-center gap-10">
        <h1 className="text-orange-500 text-bold text-center text-4xl">
          Star Wars Universe
        </h1>
        <button
          onClick={closeRightSection}
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
          <h2 className="text-3xl font-bold"> {character?.name}</h2>
          <p className="text-2xl">birth year: {character?.birth_year}</p>
          <p className="text-2xl">eye color: {character?.eye_color}</p>
          <p className="text-2xl">hair color: {character?.hair_color}</p>
        </div>
      )}
    </div>
  );
}
