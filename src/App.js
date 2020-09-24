import React, { Component } from "react";
import "./App.css";
import Concatenator from "./containers/Concatenator/Concatenator";

class App extends Component {
  render() {
    return (
      <div className="parent">
        <div className="TODO">
          <div className="buttons">
            <button>Random</button>
            <button>Reset</button>
            <button>Copy</button>
          </div>
          <Concatenator />
        </div>
      </div>
    );
  }
}

export default App;
