import { Character } from "./StarWarsService.types";

export default class StarWarsService {
  host = "https://swapi.dev/api";

  async getAll(searchTerm?: string | null): Promise<Character[]> {
    let url = `${this.host}/people`;

    if (searchTerm) {
      url += `/?search=${searchTerm}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  }
}
