import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Router from "./Router";
import { wrapWithStore } from "../test-helpers/store";

function renderRouter(initialEntries = "/") {
  const withStore = wrapWithStore(<Router />);
  return render(
    <MemoryRouter initialEntries={[initialEntries]}>{withStore}</MemoryRouter>,
  );
}

describe.skip("Router", () => {
  it("should update url when page is changed to next page", async () => {
    renderRouter("/");

    const nextButton = await screen.findByText(/next page/i);
    fireEvent.click(nextButton);

    const page2 = await screen.findByText(/page: 2/i);
    expect(page2).toBeInTheDocument();
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
    const spy = jest.fn();
    renderRouter();

    const select = await screen.findByRole("combobox");
    fireEvent.change(select, { target: { value: "5" } });

    expect(spy).toHaveBeenCalled();
  });

  it.each([true, false])(
    "should render Next Page button correctly when hasNextPage is %s",
    async (hasNextPage) => {
      renderRouter("/");

      const nextButton = await screen.findByText(/Next Page/i);
      expect(nextButton).toHaveClass(hasNextPage ? "bg-white" : "bg-gray-300");
    },
  );

  it.each([true, false])(
    "should render Previous Page button correctly when hasPreviousPage is %s",
    async (hasPreviousPage) => {
      renderRouter("/");

      const prevButton = await screen.findByText(/Previous Page/i);
      expect(prevButton).toHaveClass(
        hasPreviousPage ? "bg-white" : "bg-gray-300",
      );
    },
  );
});
