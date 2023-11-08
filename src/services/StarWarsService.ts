import { ApiResponse, Details } from "./StarWarsService.types";

const host = "https://swapi.dev/api";

const getAll = async (
  searchTerm?: string | null,
  page?: number,
): Promise<ApiResponse<Details[]>> => {
  let url = `${host}/people`;

  if (searchTerm) {
    url += `/?search=${searchTerm}`;
  }

  if (page && !searchTerm) {
    url += `/?page=${page}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  return data;
};

const getById = async (id: string): Promise<Details> => {
  const response = await fetch(`${host}/people/${id}`);
  const data = await response.json();

  return data;
};

export default {
  getAll,
  getById,
};
