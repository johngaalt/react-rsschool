import { render, screen } from "@testing-library/react";
import SearchResults from "./SearchResults";
import {
  generateDetails,
  wrapWithSidebarContext,
} from "../test-helpers/SidebarContext";
import { wrapWithRouter } from "../test-helpers/Router";
import { SidebarContextTypes } from "./SidebarContext.types";

function renderSearchResults(context?: Partial<SidebarContextTypes>) {
  const withSidebarContext = wrapWithSidebarContext(<SearchResults />, context);
  const withRouter = wrapWithRouter(withSidebarContext);

  return render(withRouter);
}

describe("SearchResults", () => {
  it("should render 10 search results", () => {
    renderSearchResults();

    const cards = screen.queryAllByTestId("search-result");

    expect(cards).toHaveLength(10);
  });

  it("should render 5 search results", () => {
    renderSearchResults({
      limit: 5,
      people: generateDetails(5),
    });

    const cards = screen.queryAllByTestId("search-result");

    expect(cards).toHaveLength(5);
  });
});
