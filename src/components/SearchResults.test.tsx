import { render, screen } from "@testing-library/react";
import SearchResults from "./SearchResults";
import { wrapWithSidebarContext } from "../test-helpers/SidebarContext";
import { wrapWithRouter } from "../test-helpers/Router";

function renderSearchResults() {
  const withSidebarContext = wrapWithSidebarContext(<SearchResults />);
  const withRouter = wrapWithRouter(withSidebarContext);

  return render(withRouter);
}

describe("SearchResults", () => {
  it("should render 10 search results", () => {
    renderSearchResults();

    const cards = screen.queryAllByTestId("search-result");

    expect(cards).toHaveLength(10);
  });
});
