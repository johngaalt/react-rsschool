import React from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="App">
        <SearchBar />
        <SearchResults />
      </div>
    );
  }
}

export default App;
