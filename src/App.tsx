import React from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import { AppProps, AppState } from "./App.types";
import StarWarsService from "./services/StarWarsService";

class App extends React.Component<AppProps, AppState> {
  service: StarWarsService;

  constructor(props = {}) {
    super(props);

    this.service = new StarWarsService();
    this.state = {
      people: [],
    };
  }

  async componentDidMount(): Promise<void> {
    const response = await this.service.getAll();
    this.setState({ people: response });
  }

  render(): React.ReactNode {
    const { people } = this.state;
    return (
      <div className="bg-orange-100 h-screen">
        <div className="App container mx-auto">
          <SearchBar />
          <SearchResults results={people} />
        </div>
      </div>
    );
  }
}

export default App;
