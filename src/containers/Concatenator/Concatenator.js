import React, { Component } from "react";
import "./Concatenator.css";
import "../../App.css";
import Result from "../../components/Result/Result";
import tools from "../../concat";
import axios from "axios";
import UtilityButtons from "../../components/UtilityButtons/UtilityButtons";
import WordInputs from "../../components/WordInputs/WordInputs";

class Concatenator extends Component {
  state = {
    // [String]
    words: [],
    result: "",
    hello: 0,
    numFields: 3
  };

  updateWords = (event, id) => {
    const newState = this.state;
    newState.words[id] = event.target.value;

    this.setState(newState);

    console.log(JSON.stringify(this.state));
  };

  determineResult = () => {
    const words = this.state.words.slice();
    if (words.length >= 3) {
      return tools.manyWordConcat(words)
    } else if (words[0] && words[1]) {
      return tools.concat(words[0], words[1]);
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
    this.props.setFooters([])
  }

  random = () => {
    axios.get(`https://random-word-api.herokuapp.com/word?number=2&swear=1`)
      .then((res) => {
        const newState = this.state;
        console.log(res.data)
        newState.words = res.data
        this.setState(newState)
      })
    this.props.setFooters([])
  }

  wotd = () => {
    axios.get(`/api/wotd`)
      .then((response) => {
        const newState = this.state;
        var words = [response.data.wordA.word, response.data.wordB.word]
        newState.words = words
        this.setState(newState)
        this.props.setFooters([response.data.wordA, response.data.wordB])
      })
      .catch(err => {
        console.error(err)
      })
  }

  resetState = () => {
    const newState = {
      ...this.state,
      words: [],
      result: "",
      hello: 0,
      numFields: 2
    }

    this.setState(newState)

    this.props.setFooters([])
  }

  render() {
    return (
      <div className="container">
        <div className="buttons">
          <button onClick={this.helloWorld}>Hello World</button>
          <button onClick={this.random}>Random</button>
          <button onClick={this.wotd}>WOTD</button>
          <UtilityButtons this={this} />
        </div>
        <div className="io">
          <WordInputs numFields={this.state.numFields} changed={this.updateWords} words={this.state.words} />
          <p className="spacer">.</p>
          <Result text={this.determineResult()} />
        </div>
        <div>
          {this.state.message &&
            <p id="messages" value={this.state.message}></p>
          }

        </div>
      </div>

    );
  }
}

export default Concatenator;
