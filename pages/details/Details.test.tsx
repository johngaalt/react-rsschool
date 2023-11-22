// import { wrapWithRouter } from "../test-helpers/Router";
// import Details from "./Details";
// import {
//   fireEvent,
//   render,
//   screen,
//   waitForElementToBeRemoved,
// } from "@testing-library/react";
// import { faker } from "@faker-js/faker";

// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useParams: jest.fn(),
// }));

// function renderDetails() {
//   const withRouter = wrapWithRouter(<Details />);

//   return render(withRouter);
// }

// describe.skip("Details", () => {
//   it("should render loading indicator", async () => {
//     renderDetails();

//     const loading = screen.getByText("Loading...");

//     expect(loading).toBeInTheDocument();
//   });

//   it("should render relevant data", async () => {
//     const name = faker.person.fullName();
//     const birth = faker.string.alphanumeric({ length: 6 });
//     const eyeColor = faker.internet.color();
//     const hairColor = faker.internet.color();

//     renderDetails();

//     const detailsName = await screen.findByText(name);
//     const detailsBirth = await screen.findByText(new RegExp(birth));
//     const detailsHair = await screen.findByText(new RegExp(hairColor));
//     const detailsEye = await screen.findByText(new RegExp(eyeColor));

//     expect(detailsName).toBeInTheDocument();
//     expect(detailsBirth).toBeInTheDocument();
//     expect(detailsHair).toBeInTheDocument();
//     expect(detailsEye).toBeInTheDocument();
//   });

//   it("should hide element after click", () => {
//     const { container } = renderDetails();
//     const cross = screen.getByAltText("cross");

//     fireEvent.click(cross);

//     waitForElementToBeRemoved(() => container);
//   });
// });
