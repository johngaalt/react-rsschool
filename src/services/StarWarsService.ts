import { ApiResponse, Character } from "./StarWarsService.types";

const host = "https://swapi.dev/api";

const getAll = async (
  searchTerm?: string | null,
  page?: number,
): Promise<ApiResponse<Character[]>> => {
  let url = `${host}/people`;

  if (searchTerm) {
    url += `/?search=${searchTerm}`;
  }

  if (page) {
    url += `/?page=${page}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export default {
  getAll,
};
