import React from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

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
