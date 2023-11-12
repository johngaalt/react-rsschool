import SearchBar from "./SearchBar";
import { fireEvent, render, screen } from "@testing-library/react";
import { SearchTermProvider } from "./SearchTermContext";
import { faker } from "@faker-js/faker";
import { MemoryRouter } from "react-router-dom";
import { wrapWithSidebarContext } from "../test-helpers/SidebarContext";

function renderSearchBar() {
  const withSidebarContext = wrapWithSidebarContext(<SearchBar />);
  return render(
    <MemoryRouter>
      <SearchTermProvider>{withSidebarContext}</SearchTermProvider>
    </MemoryRouter>,
  );
}

describe("SearchBar", () => {
  it("should save entered value to the local storage", () => {
    const spy = jest.spyOn(Storage.prototype, "setItem");
    renderSearchBar();
    const input = screen.getByPlaceholderText(/type person's name/i);
    const searchButton = screen.getByText(/search/i);
    const searchTerm = faker.string.alpha({ length: 6 });

    fireEvent.change(input, {
      target: { value: searchTerm },
    });
    fireEvent.click(searchButton);

    expect(spy).toHaveBeenCalledWith("searchTerm", searchTerm);
  });
});
