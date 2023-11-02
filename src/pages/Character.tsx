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
    <div>
      <h1 className="text-3xl font-bold">{character?.name}</h1>
      <p className="text-2xl">{character?.birth_year}</p>
      <p className="text-2xl">{character?.eye_color}</p>
      <p className="text-2xl">{character?.hair_color}</p>
    </div>
  );
}
