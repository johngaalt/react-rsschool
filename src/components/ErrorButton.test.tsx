import ErrorButton from "./ErrorButton";
import { render, screen } from "@testing-library/react";

describe("ErrorButton", () => {
  it("should render button", () => {
    render(<ErrorButton></ErrorButton>);

    const button = screen.queryByText("Throw Error");

    expect(button).toBeInTheDocument();
  });
});
