import Router from "react-router-dom";
import StarWarsService from "../services/StarWarsService";
import { wrapWithRouter } from "../test-helpers/Router";
import Details from "./Details";
import { render, screen, waitFor } from "@testing-library/react";
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

    await waitFor(() => {
      expect(loading).toBeInTheDocument();
    });
  });
});
