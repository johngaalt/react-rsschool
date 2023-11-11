import Router from "react-router-dom";
import StarWarsService from "../services/StarWarsService";
import { wrapWithRouter } from "../test-helpers/Router";
import Details from "./Details";
import { render, screen } from "@testing-library/react";
import { faker } from "@faker-js/faker";

jest.mock("../services/StarWarsService");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

function renderDetails() {
  const withRouter = wrapWithRouter(<Details />);

  return render(withRouter);
}

describe("Details", () => {
  it("should call API", () => {
    jest
      .spyOn(Router, "useParams")
      .mockReturnValue({ id: faker.string.uuid() });
    renderDetails();

    expect(StarWarsService.getById).toHaveBeenCalled();
  });

  it("should render loading indicator", async () => {
    renderDetails();

    const loading = screen.getByText("Loading...");

    expect(loading).toBeInTheDocument();
  });

  it("should render relevant data", async () => {
    const name = faker.person.fullName();
    const birth = faker.string.alphanumeric({ length: 6 });
    const eyeColor = faker.internet.color();
    const hairColor = faker.internet.color();
    jest.spyOn(StarWarsService, "getById").mockResolvedValue({
      birth_year: birth,
      eye_color: eyeColor,
      hair_color: hairColor,
      name: name,
      url: faker.internet.url(),
    });
    renderDetails();

    const detailsName = await screen.findByText(name);
    const detailsBirth = await screen.findByText(new RegExp(birth));
    const detailsHair = await screen.findByText(new RegExp(hairColor));
    const detailsEye = await screen.findByText(new RegExp(eyeColor));

    expect(detailsName).toBeInTheDocument();
    expect(detailsBirth).toBeInTheDocument();
    expect(detailsHair).toBeInTheDocument();
    expect(detailsEye).toBeInTheDocument();
  });
});
