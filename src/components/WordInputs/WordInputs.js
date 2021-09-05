import React from "react"
import Input from "../../components/Input/Input";
import "./WordInputs.css"

const WordInputs = (props) => {
    var body = []

    for (var i = 0; i < props.numFields; i++) {
        // eslint-disable-next-line no-loop-func
        body.push(<Input key={i} value={props.words[i]} id={i} changed={props.changed} />)
    }
    return <div className="inputs">
        {body}
    </div>
}

export default WordInputs