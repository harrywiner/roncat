import React, { Component } from "react";
import "./Concatenator.css";
import Input from "../../components/Input/Input";
import Result from "../../components/Result/Result";
import concat from "../../concat";

class Concatenator extends Component {
  state = {
    words: [],
    result: "",
  };

  updateWords = (event, id) => {
    const newState = this.state;
    newState.words[id] = event.target.value;

    this.setState(newState);

    console.log(JSON.stringify(this.state));
  };

  render() {
    function determineResult() {
      const words = this.state.words;
      if (words[0] && words[1]) {
        return concat(words[0], words[1]);
      }
    }

    return (
      <div className="io">
        <Input id="0" changed={(event) => this.updateWords(event, 0)} />
        <Input id="1" changed={(event) => this.updateWords(event, 1)} />
        <text className="spacer">.</text>
        <Result text={determineResult()} />
      </div>
    );
  }
}

export default Concatenator;
