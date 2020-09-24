import React, { Component } from "react";
import "./Concatenator.css";
import Input from "../../components/Input/Input";
import Result from "../../components/Result/Result";

class Concatenator extends Component {
  state = {
    words: [],
    result: "",
  };
  render() {
    return (
      <div className="io">
        <Input id="0" />
        <Input id="1" />
        <text className="spacer">.</text>
        <Result text="Hello World" />
      </div>
    );
  }
}

export default Concatenator;
