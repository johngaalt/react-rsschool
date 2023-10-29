import React from "react";
import { ErrorButtonProps, ErrorButtonState } from "./ErrorButton.types";

export default class ErrorButton extends React.Component<
  ErrorButtonProps,
  ErrorButtonState
> {
  constructor(props: ErrorButtonProps) {
    super(props);
    this.state = {
      showError: false,
    };
  }

  showError = () => {
    this.setState({ showError: true });
  };

  render(): React.ReactNode {
    const { showError } = this.state;
    if (showError) {
      throw new Error("Error");
    }
    return (
      <button
        className="bg-blue-800 text-white rounded py-1 px-4 flex items-center justify-center "
        type="submit"
        onClick={this.showError}
      >
        Throw Error
      </button>
    );
  }
}
