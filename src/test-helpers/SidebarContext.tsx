import { faker } from "@faker-js/faker";
import { SidebarContextProvider } from "../components/SidebarContext";
import { SidebarContextTypes } from "../components/SidebarContext.types";
import { Details } from "../services/StarWarsService.types";
import fetchMock from "fetch-mock";

export type SidebarContextMock = Pick<
  SidebarContextTypes,
  "limit" | "people" | "hasNextPage" | "hasPreviousPage"
>;

export function wrapWithSidebarContext(
  component: React.ReactElement,
  mock: SidebarContextMock = {
    limit: 10,
    people: generateDetails(),
    hasNextPage: true,
    hasPreviousPage: false,
  },
) {
  fetchMock.get(
    "*",
    {
      results: mock.people,
      next: mock.hasNextPage ? faker.internet.url() : undefined,
      previous: mock.hasPreviousPage ? faker.internet.url() : undefined,
    },
    {
      overwriteRoutes: true,
    },
  );
  return <SidebarContextProvider>{component}</SidebarContextProvider>;
}

export function generateDetails(count = 10): Details[] {
  return Array.from({ length: count }, (_, index) => ({
    birth_year: "19BBY",
    eye_color: "blue",
    hair_color: "blond",
    name: `Character ${index + 1}`,
    url: `https://swapi.dev/api/people/${index + 1}/`,
  }));
}
