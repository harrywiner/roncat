import WordTools from "./concat";
function resetState() {
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

function determineResult(words) {
    if (words.length >= 3) {
        return WordTools.manyWordConcat(words)
    } else if (words[0] && words[1]) {
        return WordTools.concat(words[0], words[1]);
    }
};

function buildSentence(words, result) {
    var copyWords = words.slice()
    var centence = copyWords.reduce((value, word) => {
        return value + " " + word
    }, "")
    return centence + ". " + result
}

const _ = {
    resetState,
    determineResult,
    buildSentence
}

export default _