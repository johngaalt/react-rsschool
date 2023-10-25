import { Character } from "./StarWarsService.types";

export default class StarWarsService {
  host = "https://swapi.dev/api";

  async getAll(): Promise<Character[]> {
    const response = await fetch(`${this.host}/people`);
    const data = await response.json();
    return data.results;
  }
}
