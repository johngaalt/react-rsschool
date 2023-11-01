import React from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import { AppProps, AppState } from "./App.types";
import StarWarsService from "./services/StarWarsService";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorButton from "./components/ErrorButton";

class App extends React.Component<AppProps, AppState> {
  service: StarWarsService;

  constructor(props = {}) {
    super(props);

    this.service = new StarWarsService();
    this.state = {
      people: [],
      currentPage: 1,
      hasNextPage: false,
      hasPreviousPage: false,
      isLoading: false,
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
    this.setState({ isLoading: true });
    const searchTerm = localStorage.getItem("searchTerm");
    const response = await this.service.getAll(searchTerm, page);
    this.setState({
      isLoading: false,
      people: response.results,
      hasNextPage: !!response.next,
      hasPreviousPage: !!response.previous,
    });
  };

  render(): React.ReactNode {
    const { people, hasNextPage, hasPreviousPage, isLoading } = this.state;
    return (
      <div className="bg-orange-100 h-screen">
        <ErrorBoundary>
          <div className="App container mx-auto">
            <ErrorButton />
            <SearchBar onSearch={this.fetchPeople} />
            {isLoading ? (
              <div className="flex justify-center items-center animate-pulse">
                Loading...
              </div>
            ) : (
              <SearchResults
                onNextPage={this.fetchNextPage}
                onPreviousPage={this.fetchPreviousPage}
                results={people}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
              />
            )}
          </div>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
