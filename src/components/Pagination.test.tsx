import React from "react";
import Pagination from "./Pagination";
import { render, screen } from "@testing-library/react";
import { PaginationProps } from "./Pagination.types";
import { mockApi, responseMock } from "../test-helpers/mockApi";
import { faker } from "@faker-js/faker";
import { wrapWithStore } from "../test-helpers/store";

const propsMock: PaginationProps = {
  hasNextPage: true,
  hasPreviousPage: false,
};

function renderPagination(
  props: PaginationProps = propsMock,
  response = responseMock,
) {
  mockApi(response);
  const withStore = wrapWithStore(<Pagination {...props} />);
  render(withStore);
}

describe("Pagination", () => {
  it("should enable next page button when there is next page", () => {
    renderPagination(propsMock, {
      ...responseMock,
      next: faker.internet.url(),
    });

    const nextPageButton = screen.getByText(/Next Page/i);

    expect(nextPageButton).toBeEnabled();
  });

  it("should enable previous page button when there is previous page", () => {
    renderPagination(
      { ...propsMock, hasPreviousPage: true },
      {
        ...responseMock,
        previous: faker.internet.url(),
      },
    );

    const previousPageButton = screen.getByText(/Previous Page/i);

    expect(previousPageButton).toBeEnabled();
  });

  it("should disable previous page button when there is no previous page", () => {
    renderPagination(
      { ...propsMock, hasPreviousPage: false },
      {
        ...responseMock,
      },
    );

    const previousPageButton = screen.getByText(/Previous Page/i);

    expect(previousPageButton).toBeDisabled();
  });

  it("should disable next page button when there is no next page", () => {
    renderPagination(
      { ...propsMock, hasNextPage: false },
      {
        ...responseMock,
      },
    );

    const previousPageButton = screen.getByText(/Next Page/i);

    expect(previousPageButton).toBeDisabled();
  });
});
