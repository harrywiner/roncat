import React from "react";
import "./Footer.css"

const Footer = (props) => {
    var body = []

    if (!props.words || !props.words[0]) {
        return <div className="Footer"></div>
    }

    var noLinks = props.words.every((word) => {
        return !word.link
    })

    if (noLinks) {
        return <div className="Footer"></div>
    }

    // if all words have the same link (from the same phrase)
    var firstLink = props.words[0].link
    var sameLink = props.words.every((word) => {
        return word.link === firstLink
    })

    console.log("Same Link", sameLink)

    if (sameLink) {
        // return only one link (this worked first try please clap)
        var allWords = props.words.reduce((total, word) => {
            return total += " " + word.word
        }, "")
        console.log("allWords: ", allWords)
        body.push(<a href={firstLink} rel='noopener noreferrer' target="_blank" >Definition of {allWords}<br></br></a>)
    } else {
        for (var word of props.words) {
            body.push(<a href={word.link} rel='noopener noreferrer' target="_blank" >Definition of {word.word}<br></br></a>)
        }
    }


    return <div className="Footer">
        {body}
    </div>;
};

export default Footer;