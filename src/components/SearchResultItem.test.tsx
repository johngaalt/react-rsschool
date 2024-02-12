import React from "react";
import SearchResultItem from "./SearchResultItem";
import { render, screen } from "@testing-library/react";
import { SearchResultItemProps } from "./SearchResultItem.types";
import { faker } from "@faker-js/faker";

function renderSearchResultItem(props: SearchResultItemProps) {
  return render(<SearchResultItem {...props} />);
}

describe("SearchResultItem", () => {
  it("should render relevant data", () => {
    const itemFullname = faker.person.fullName();
    renderSearchResultItem({
      details: {
        birth_year: "1947",
        eye_color: "green",
        hair_color: "brown",
        name: itemFullname,
        url: faker.internet.url(),
      },
      searchParam: "",
    });

    const link = screen.queryByText(itemFullname);

    expect(link).toBeInTheDocument();
  });
});
