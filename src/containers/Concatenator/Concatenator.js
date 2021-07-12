import React, { Component } from "react";
import "./Concatenator.css";
import "../../App.css";
import Input from "../../components/Input/Input";
import Result from "../../components/Result/Result";
import concat from "../../concat";
import axios from "axios";

class Concatenator extends Component {
  state = {
    words: [],
    result: "",
    hello: 0
  };

  updateWords = (event, id) => {
    const newState = this.state;
    newState.words[id] = event.target.value;

    this.setState(newState);

    console.log(JSON.stringify(this.state));
  };

  determineResult = () => {
    const words = this.state.words;
    if (words[0] && words[1]) {
      return concat(words[0], words[1]);
    }
  };

  helloBoozer = () => {
    console.log("Hello Boozer")
  }

  helloWorld = () => {
    const newState = this.state
    if (newState.hello === 0) {
      newState.words = ["Hello", "World"]
      newState.hello++
    } else
      newState.words = ["Hello", "Boozer"]
    this.setState(newState)
  }

  random = () => {
    console.log("Random")
    axios.get(`https://random-word-api.herokuapp.com/word?number=2&swear=1`)
      .then((res) => {
        const newState = this.state;
        console.log(res.data)
        newState.words = res.data
        this.setState(newState)
      })
  }

  reset = () => {
    const newState = this.state;
    newState.words = []
    this.setState(newState)
    console.log(JSON.stringify(this.state));
  }

  copy = () => {
    const words = this.state.words
    if (words[0] && words[1]) {
      var nord = concat(words[0], words[1]);
      var centence = `${words[0]} ${words[1]}. ${nord}`

      console.log("Coppied to clipboard: " + centence)

      navigator.clipboard.writeText(centence)
    }
  }

  render() {
    // TODO MAKE THE INPUTS SCALE WITH TEXT
    return (
      <div className="container">
        <div className="buttons">
          <button onClick={this.helloWorld}>Hello World</button>
          <button onClick={this.random}>Random</button>
          <button onClick={this.reset}>Reset</button>
          <button onClick={this.copy}>Copy</button>
        </div>
        <div className="io">
          <Input value={this.state.words[0]} id="0" changed={(event) => this.updateWords(event, 0)} />
          <Input value={this.state.words[1]} id="1" changed={(event) => this.updateWords(event, 1)} />
          <p className="spacer">.</p>
          <Result text={this.determineResult()} />
        </div>
      </div>

    );
  }
}

export default Concatenator;
