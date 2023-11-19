import { render, screen } from "@testing-library/react";
import SearchResults from "./SearchResults";

import { wrapWithRouter } from "../test-helpers/Router";
import { wrapWithStore } from "../test-helpers/store";
import { swapiApi } from "../state/query";

jest.mock("../state/query", () => ({
  ...jest.requireActual("../state/query"),
  useGetSearchResultsQuery: jest.fn(),
}));

function renderSearchResults() {
  (swapiApi.useGetAllQuery as jest.Mock).mockReturnValue({
    data: { results: [] },
    isLoading: false,
    isError: false,
  });

  const withSidebarContext = wrapWithStore(<SearchResults />);
  const withRouter = wrapWithRouter(withSidebarContext);

  return render(withRouter);
}

describe.skip("SearchResults", () => {
  it("should render 10 search results", async () => {
    renderSearchResults();

    const cards = await screen.findAllByTestId("search-result");

    expect(cards).toHaveLength(10);
  });

  it("should render 5 search results", async () => {
    renderSearchResults();

    const cards = await screen.findAllByTestId("search-result");

    expect(cards).toHaveLength(5);
  });

  it("should render message when no results", () => {
    renderSearchResults();

    const message = screen.queryByText("No results");

    expect(message).toBeInTheDocument();
  });
});
