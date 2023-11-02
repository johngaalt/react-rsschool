import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarWarsService from "../services/StarWarsService";
import { Character as CharacterType } from "../services/StarWarsService.types";

export default function Character() {
  const { id } = useParams();
  const [character, setCharacter] = useState<CharacterType>();

  useEffect(() => {
    async function fetchCharacter() {
      if (id) {
        const response = await StarWarsService.getById(id);
        setCharacter(response);
      }
    }
    fetchCharacter();
  }, [id]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-orange-500 text-bold text-center text-4xl">
          Star Wars Universe
        </h1>
      </div>
      <div className="flex flex-col justify-between items-center border border-orange-500 gap-5 p-5 rounded-lg ">
        <h2 className="text-3xl font-bold"> {character?.name}</h2>
        <p className="text-2xl">birth year: {character?.birth_year}</p>
        <p className="text-2xl">eye color: {character?.eye_color}</p>
        <p className="text-2xl">hair color: {character?.hair_color}</p>
      </div>
    </div>
  );
}
