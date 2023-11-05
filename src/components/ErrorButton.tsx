import { useState } from "react";

export default function ErrorButton() {
  const [showError, setShowError] = useState<boolean>(false);

  const handleShowError = () => {
    setShowError(true);
  };

  if (showError) {
    throw new Error("Error");
  }
  return (
    <button
      className="bg-blue-800 text-white rounded py-1 px-4 flex items-center justify-center"
      type="submit"
      onClick={handleShowError}
    >
      Throw Error
    </button>
  );
}
