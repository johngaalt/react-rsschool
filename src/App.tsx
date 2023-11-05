import React from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Router from "./components/Router";

function App(): React.ReactElement {
  return (
    <div className="bg-gray-100 h-screen ">
      <ErrorBoundary>
        <div className="w-full h-full App container flex flex-row justify-between items-center gap-2  ">
          <Router />
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default App;
