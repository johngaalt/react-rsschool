import React from "react";
import Details from "./Details";
import { fireEvent, render, screen } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import { DetailsProps } from "./Details.types";

const propsMock = {
  isFetching: false,
  closeDetailsSection: jest.fn(),
  details: {
    name: faker.person.fullName(),
    birth_year: faker.string.alphanumeric({ length: 6 }),
    eye_color: faker.internet.color(),
    hair_color: faker.internet.color(),
    url: faker.internet.url(),
  },
};

function renderDetails(props: DetailsProps = propsMock) {
  return render(<Details {...props} />);
}

describe("Details", () => {
  it("should render loading indicator", async () => {
    renderDetails({ ...propsMock, isFetching: true });

    const loading = screen.getByText("Loading...");

    expect(loading).toBeInTheDocument();
  });

  it("should render relevant data", async () => {
    renderDetails();

    const detailsName = await screen.findByText(propsMock.details.name);
    const detailsBirth = await screen.findByText(
      new RegExp(propsMock.details.birth_year),
    );
    const detailsHair = await screen.findByText(
      new RegExp(propsMock.details.hair_color),
    );
    const detailsEye = await screen.findByText(
      new RegExp(propsMock.details.eye_color),
    );

    expect(detailsName).toBeInTheDocument();
    expect(detailsBirth).toBeInTheDocument();
    expect(detailsHair).toBeInTheDocument();
    expect(detailsEye).toBeInTheDocument();
  });

  it("should hide element after click", () => {
    renderDetails();
    const cross = screen.getByAltText("cross");

    fireEvent.click(cross);

    expect(propsMock.closeDetailsSection).toHaveBeenCalled();
  });
});
