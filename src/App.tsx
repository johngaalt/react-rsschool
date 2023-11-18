import React from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Router from "./components/Router";
import { SidebarContextProvider } from "./components/SidebarContext";
import { Provider } from "react-redux";
import { store } from "./state/store";

function App(): React.ReactElement {
  return (
    <div className="bg-gray-100 h-screen ">
      <ErrorBoundary>
        <Provider store={store}>
          <SidebarContextProvider>
            <div className="w-full h-full App container flex flex-row justify-between items-center gap-2  ">
              <Router />
            </div>
          </SidebarContextProvider>
        </Provider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
