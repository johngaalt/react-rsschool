import { render, screen } from "@testing-library/react";
import SearchResults from "./SearchResults";
import {
  SidebarContextMock,
  generateDetails,
  wrapWithSidebarContext,
} from "../test-helpers/SidebarContext";
import { wrapWithRouter } from "../test-helpers/Router";

function renderSearchResults(mock?: SidebarContextMock) {
  const withSidebarContext = wrapWithSidebarContext(<SearchResults />, mock);
  const withRouter = wrapWithRouter(withSidebarContext);

  return render(withRouter);
}

describe("SearchResults", () => {
  it("should render 10 search results", async () => {
    renderSearchResults();

    const cards = await screen.findAllByTestId("search-result");

    expect(cards).toHaveLength(10);
  });

  it("should render 5 search results", async () => {
    renderSearchResults({
      limit: 5,
      people: generateDetails(5),
    });

    const cards = await screen.findAllByTestId("search-result");

    expect(cards).toHaveLength(5);
  });

  it("should render message when no results", () => {
    renderSearchResults({
      people: [],
      limit: 10,
    });

    const message = screen.queryByText("No results");

    expect(message).toBeInTheDocument();
  });
});
