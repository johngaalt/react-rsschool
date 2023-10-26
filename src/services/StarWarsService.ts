import { ApiResponse, Character } from "./StarWarsService.types";

export default class StarWarsService {
  host = "https://swapi.dev/api";

  async getAll(
    searchTerm?: string | null,
    page?: number,
  ): Promise<ApiResponse<Character[]>> {
    let url = `${this.host}/people`;

    if (searchTerm) {
      url += `/?search=${searchTerm}`;
    }

    if (page) {
      url += `/?page=${page}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    return data;
  }
}
