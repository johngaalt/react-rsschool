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

    const nextPageButton = screen.getByText("Next Page");

    expect(nextPageButton).toBeEnabled();
  });
});
