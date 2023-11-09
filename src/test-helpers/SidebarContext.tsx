import { SidebarContext } from "../components/SidebarContext";
import { SidebarContextTypes } from "../components/SidebarContext.types";
import { Details } from "../services/StarWarsService.types";

export function wrapWithSidebarContext(
  component: React.ReactElement,
  context?: Partial<SidebarContextTypes>,
) {
  const defaultContext = {
    people: generateDetails(),
    hasNextPage: false,
    hasPreviousPage: false,
    isLoading: false,
    fetchNextPage: () => {},
    fetchPreviousPage: () => {},
    currentPage: 1,
    fetchPeople: () => {},
    fetchByLimit: () => {},
    limit: 10,
  };

  return (
    <SidebarContext.Provider value={{ ...defaultContext, ...context }}>
      {component}
    </SidebarContext.Provider>
  );
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
