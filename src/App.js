import React, { Component } from "react";
import "./App.css";
import Concatenator from "./containers/Concatenator/Concatenator";
import Footer from "./containers/Footer/Footer"

class App extends Component {

  state = {
    // [WOTD]
    footerWords: []
  };
  setFooters = (words) => {
    console.log("Words: ", words)
    this.setState({ footerWords: words })
    console.log("State: ", this.state)
  };
  render() {
    return (
      <div className="parent">
        <Concatenator setFooters={this.setFooters} />
        <Footer words={this.state.footerWords} />
      </div>
    );
  }
}

export default App;
