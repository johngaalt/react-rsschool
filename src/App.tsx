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
      currentPage: 1,
    };
  }

  async componentDidMount(): Promise<void> {
    await this.fetchPeople();
  }

  fetchNextPage = async () => {
    const { currentPage } = this.state;
    this.setState({ currentPage: currentPage + 1 });
    await this.fetchPeople(currentPage + 1);
  };

  fetchPreviousPage = async () => {
    const { currentPage } = this.state;
    this.setState({ currentPage: currentPage - 1 });
    await this.fetchPeople(currentPage - 1);
  };

  fetchPeople = async (page?: number) => {
    const searchTerm = localStorage.getItem("searchTerm");
    const response = await this.service.getAll(searchTerm, page);
    this.setState({ people: response.results });
  };

  render(): React.ReactNode {
    const { people } = this.state;
    return (
      <div className="bg-orange-100 h-screen">
        <div className="App container mx-auto">
          <SearchBar onSearch={this.fetchPeople} />
          <SearchResults
            onNextPage={this.fetchNextPage}
            onPreviousPage={this.fetchPreviousPage}
            results={people}
          />
        </div>
      </div>
    );
  }
}

export default App;
