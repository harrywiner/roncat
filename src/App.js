import React, { Component } from "react";
import "./App.css";
import Concatenator from "./containers/Concatenator/Concatenator";

class App extends Component {
  render() {
    return (
      <div className="parent">
        <Concatenator />
      </div>
    );
  }
}

export default App;
