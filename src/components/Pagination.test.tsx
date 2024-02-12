import React from "react";
import Pagination from "./Pagination";
import { fireEvent, render, screen } from "@testing-library/react";
import { PaginationProps } from "./Pagination.types";
import { wrapWithStore } from "../test-helpers/store";

const propsMock: PaginationProps = {
  hasNextPage: true,
  hasPreviousPage: false,
};

function renderPagination(props: PaginationProps = propsMock) {
  const withStore = wrapWithStore(<Pagination {...props} />);
  render(withStore);
}

describe("Pagination", () => {
  it("should enable next page button when there is next page", () => {
    renderPagination(propsMock);

    const nextPageButton = screen.getByText(/Next Page/i);

    expect(nextPageButton).toBeEnabled();
  });

  it("should enable previous page button when there is previous page", () => {
    renderPagination({ ...propsMock, hasPreviousPage: true });

    const previousPageButton = screen.getByText(/Previous Page/i);

    expect(previousPageButton).toBeEnabled();
  });

  it("should disable previous page button when there is no previous page", () => {
    renderPagination({ ...propsMock, hasPreviousPage: false });

    const previousPageButton = screen.getByText(/Previous Page/i);

    expect(previousPageButton).toBeDisabled();
  });

  it("should disable next page button when there is no next page", () => {
    renderPagination({ ...propsMock, hasNextPage: false });

    const previousPageButton = screen.getByText(/Next Page/i);

    expect(previousPageButton).toBeDisabled();
  });

  it("should render next page on click", async () => {
    renderPagination();

    const nextPageButton = screen.getByText(/Next Page/i);
    fireEvent.click(nextPageButton);

    const newPage = await screen.findByText(/Page: 2/i);
    expect(newPage).toBeInTheDocument();
  });

  it("should render previous page on click", async () => {
    renderPagination({ ...propsMock, hasPreviousPage: true });
    const nextPageButton = screen.getByText(/Next Page/i);
    fireEvent.click(nextPageButton);
    await screen.findByText(/Page: 2/i);

    const previousPageButton = screen.getByText(/Previous Page/i);
    fireEvent.click(previousPageButton);

    const firstPage = await screen.findByText(/Page: 1/i);
    expect(firstPage).toBeInTheDocument();
  });
});
