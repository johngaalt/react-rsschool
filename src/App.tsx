import React from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Router from "./components/Router";
import { SearchTermProvider } from "./components/SearchTermContext";
import { SidebarContextProvider } from "./components/SidebarContext";

function App(): React.ReactElement {
  return (
    <div className="bg-gray-100 h-screen ">
      <ErrorBoundary>
        <SearchTermProvider>
          <SidebarContextProvider>
            <div className="w-full h-full App container flex flex-row justify-between items-center gap-2  ">
              <Router />
            </div>
          </SidebarContextProvider>
        </SearchTermProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
