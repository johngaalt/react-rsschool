import SearchBar from "./SearchBar";
import { fireEvent, render, screen } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import { MemoryRouter } from "react-router-dom";
import { wrapWithStore } from "../test-helpers/store";

function renderSearchBar() {
  const withStore = wrapWithStore(<SearchBar />);
  return render(<MemoryRouter>{withStore}</MemoryRouter>);
}

describe.skip("SearchBar", () => {
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

  it("should retrieve search term from local storage", () => {
    const searchTerm = faker.string.alpha({ length: 6 });
    localStorage.setItem("searchTerm", searchTerm);
    renderSearchBar();

    const input = screen.getByPlaceholderText(/type person's name/i);

    expect(input).toHaveValue(searchTerm);
  });
});
