import React from "react";
import concat from "../../concat";
import FunctionalTools from "../../FunctionalTools"


function copy() {
    const words = this.state.words.slice()

    if (words.length >= 2) {
        const result = FunctionalTools.determineResult(words)

        const centence = FunctionalTools.buildSentence(words, result)

        console.log("Coppied to clipboard: " + centence)

        navigator.clipboard.writeText(centence)
    }
}

function reverse() {
    var newState = this.state
    newState.words = newState.words.reverse()
    this.setState(newState)
}

const UtilityButtons = (props) => {
    return <div className="utilities">
        <button onClick={FunctionalTools.resetState.bind(props.this)}>Reset</button>
        <button onClick={copy.bind(props.this)}>Copy</button>
        <button onClick={reverse.bind(props.this)}>Reverse</button>
    </div>
};

export default UtilityButtons;
