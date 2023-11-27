import React from "react";
import ErrorButton from "./ErrorButton";
import { fireEvent, render, screen } from "@testing-library/react";

describe("ErrorButton", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it("should render button", () => {
    render(<ErrorButton></ErrorButton>);

    const button = screen.queryByText("Throw Error");

    expect(button).toBeInTheDocument();
  });

  it("should throw an error", () => {
    render(<ErrorButton></ErrorButton>);

    const button = screen.getByText("Throw Error");

    expect(() => {
      fireEvent.click(button);
    }).toThrow("Error");
  });
});
