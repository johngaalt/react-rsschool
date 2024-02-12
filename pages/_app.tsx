import React from "react";
import ErrorBoundary from "../src/components/ErrorBoundary";
import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { wrapper } from "src/state/store";
import Sidebar from "src/components/Sidebar";

function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <div className="bg-gray-100 h-screen ">
        <div className="w-full h-full App container flex flex-row justify-center items-center gap-16">
          <Sidebar />
          <Component {...pageProps} />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default wrapper.withRedux(App);
