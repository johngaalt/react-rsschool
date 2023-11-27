import { faker } from "@faker-js/faker";
import fetchMock from "fetch-mock";
import { ApiResponse, Details } from "src/state/queryApi.types";

export const responseMock: ApiResponse<Details[]> = {
  count: 10,
  next: "",
  previous: "",
  results: generateDetails(),
};

export function mockApi(mock: ApiResponse<Details[]> = responseMock) {
  fetchMock.get("*", mock, {
    overwriteRoutes: true,
  });
}

export function generateDetails(length = 10): Details[] {
  return Array.from({ length }, () => ({
    name: faker.person.fullName(),
    birth_year: faker.string.alphanumeric({ length: 6 }),
    eye_color: faker.internet.color(),
    hair_color: faker.internet.color(),
    url: faker.internet.url(),
  }));
}
