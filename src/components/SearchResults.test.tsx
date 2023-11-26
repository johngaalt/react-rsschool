import React from "react";
import { render, screen } from "@testing-library/react";
import SearchResults from "./SearchResults";
import { wrapWithStore } from "../test-helpers/store";
import { ApiResponse, Details } from "src/state/queryApi.types";
import {
  generateDetails,
  mockApi,
  responseMock,
} from "../test-helpers/mockApi";

function renderSearchResults(response: ApiResponse<Details[]> = responseMock) {
  mockApi(response);

  const withStore = wrapWithStore(<SearchResults />);
  return render(withStore);
}

describe("SearchResults", () => {
  it("should render 10 search results", async () => {
    renderSearchResults();

    const cards = await screen.findAllByTestId("search-result");

    expect(cards).toHaveLength(10);
  });

  it("should render 5 search results", async () => {
    renderSearchResults({
      ...responseMock,
      results: generateDetails(5),
    });

    const cards = await screen.findAllByTestId("search-result");

    expect(cards).toHaveLength(5);
  });

  it("should render message when no results", () => {
    renderSearchResults({
      ...responseMock,
      results: [],
    });

    const message = screen.queryByText("No results");

    expect(message).toBeInTheDocument();
  });
});
