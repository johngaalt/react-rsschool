import React from "react";

export default class SearchBar extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="search-bar">
        <h1>Star Wars</h1>
        <input className="search-input" placeholder="Search" type="text" />
      </div>
    );
  }
}
