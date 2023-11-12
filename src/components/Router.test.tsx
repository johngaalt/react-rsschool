import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {
  SidebarContextMock,
  generateDetails,
  wrapWithSidebarContext,
} from "../test-helpers/SidebarContext";
import { SearchTermProvider } from "./SearchTermContext";
import Router from "./Router";
import StarWarsService from "../services/StarWarsService";

function renderRouter(initialEntries = "/", mock?: SidebarContextMock) {
  const withSidebarContext = wrapWithSidebarContext(<Router />, mock);
  return render(
    <MemoryRouter initialEntries={[initialEntries]}>
      <SearchTermProvider>{withSidebarContext}</SearchTermProvider>
    </MemoryRouter>,
  );
}

describe("Router", () => {
  it.skip("should update url when page is changed to next page", async () => {
    const spy = jest.spyOn(StarWarsService, "getAll");
    const initialUrl = global.window.location.href;
    renderRouter("/", {
      limit: 10,
      people: generateDetails(),
      hasNextPage: true,
      hasPreviousPage: false,
    });

    const nextButton = await screen.findByText(
      /next page/i,
      {},
      { interval: 10000 },
    );
    expect(nextButton).toBeInTheDocument();

    fireEvent.click(nextButton);
    expect(spy).toHaveBeenCalled();

    await waitFor(
      () => {
        const page2 = screen.getByText(/page: 2/i);
        expect(page2).toBeInTheDocument();
      },
      {
        timeout: 4500,
      },
    );

    await waitFor(() => {
      expect(global.window.location.href).toContain("page=2");
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

  it("should navigate to home page", async () => {
    renderRouter("/details/1");

    const sidebar = screen.getByTestId(/sidebar/);
    fireEvent.click(sidebar);

    const image = await screen.findByAltText(/star wars/);
    expect(image).toBeInTheDocument();
  });

  it("should change limit", async () => {
    const spy = jest.spyOn(StarWarsService, "getAll");
    renderRouter();

    const select = await screen.findByRole("combobox");
    fireEvent.change(select, { target: { value: "5" } });

    expect(spy).toHaveBeenCalled();
  });

  it.each([true, false])(
    "should render Next Page button correctly when hasNextPage is %s",
    async (hasNextPage) => {
      renderRouter("/", {
        hasNextPage,
        limit: 10,
        people: [],
        hasPreviousPage: false,
      });

      const nextButton = await screen.findByText(/Next Page/i);
      expect(nextButton).toHaveClass(hasNextPage ? "bg-white" : "bg-gray-300");
    },
  );

  it.each([true, false])(
    "should render Previous Page button correctly when hasPreviousPage is %s",
    async (hasPreviousPage) => {
      renderRouter("/", {
        hasNextPage: false,
        limit: 10,
        people: [],
        hasPreviousPage,
      });

      const prevButton = await screen.findByText(/Previous Page/i);
      expect(prevButton).toHaveClass(
        hasPreviousPage ? "bg-white" : "bg-gray-300",
      );
    },
  );
});
