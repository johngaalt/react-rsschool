import React from "react";
import { Provider } from "react-redux";
import ErrorBoundary from "../src/components/ErrorBoundary";
import Sidebar from "../src/components/Sidebar";
import { store } from "../src/state/store";

import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <div className="bg-gray-100 h-screen ">
          <div className="w-full h-full App container flex flex-row justify-between items-center gap-2">
            <Sidebar />
            <Component {...pageProps} />
          </div>
        </div>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
