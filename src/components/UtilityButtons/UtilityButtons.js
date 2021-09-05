import React from "react";
import concat from "../../concat";
function copy() {
    const words = this.state.words
    if (words[0] && words[1]) {
        var nord = concat(words[0], words[1]);
        var centence = `${words[0]} ${words[1]}. ${nord}`

        console.log("Coppied to clipboard: " + centence)

        navigator.clipboard.writeText(centence)
    }
}

function reset() {
    const newState = this.state;
    newState.words = []
    this.setState(newState)
    console.log(JSON.stringify(this.state));

    this.props.setFooters([])
}

function reverse() {
    var newState = this.state
    newState.words = newState.words.reverse()
    this.setState(newState)
}

const UtilityButtons = (props) => {
    return <div className="utilities">
        <button onClick={reset.bind(props.this)}>Reset</button>
        <button onClick={copy.bind(props.this)}>Copy</button>
        <button onClick={reverse.bind(props.this)}>Reverse</button>
    </div>
};

export default UtilityButtons;
