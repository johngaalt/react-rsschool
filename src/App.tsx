import React from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Router from "./components/Router";
import { SearchTermProvider } from "./components/SearchTermContext";

function App(): React.ReactElement {
  return (
    <div className="bg-gray-100 h-screen ">
      <ErrorBoundary>
        <SearchTermProvider>
          <div className="w-full h-full App container flex flex-row justify-between items-center gap-2  ">
            <Router />
          </div>
        </SearchTermProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
