import React from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Router from "./components/Router";
import { Provider } from "react-redux";
import { store } from "./state/store";

function App(): React.ReactElement {
  return (
    <div className="bg-gray-100 h-screen ">
      <ErrorBoundary>
        <Provider store={store}>
          <div className="w-full h-full App container flex flex-row justify-between items-center gap-2  ">
            <Router />
          </div>
        </Provider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
