import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { wrapWithSidebarContext } from "../test-helpers/SidebarContext";
import { SearchTermProvider } from "./SearchTermContext";
import Router from "./Router";
import userEvent from "@testing-library/user-event";

function renderRouter(initialEntries = "/") {
  const withSidebarContext = wrapWithSidebarContext(<Router />);
  return render(
    <MemoryRouter initialEntries={[initialEntries]}>
      <SearchTermProvider>{withSidebarContext}</SearchTermProvider>
    </MemoryRouter>,
  );
}

describe("Router", () => {
  it.skip("should update url when page is changed to next page", async () => {
    const user = userEvent.setup();
    const initialUrl = global.window.location.href;
    renderRouter();

    const nextButton = await screen.findByText(/next page/i);
    expect(nextButton).toBeInTheDocument();

    user.click(nextButton);

    const page2 = await screen.findByText(/page: 2/i);
    expect(page2).toBeInTheDocument();

    await waitFor(() => {
      expect(global.window.location.href).not.toBe(initialUrl);
    });
  });

  it("should render details after clicking on search result item", async () => {
    renderRouter();

    const searchResultItem = await screen.findByText(/character 2/i);
    fireEvent.click(searchResultItem);

    const detailsHeader = await screen.findByText(/star wars universe/i);
    expect(detailsHeader).toBeInTheDocument();
  });

  it("should render 404 page when route is not correct", () => {
    renderRouter("/bad-route");

    const notFound = screen.getByText(/404 Not Found/i);

    expect(notFound).toBeInTheDocument();
  });
});
