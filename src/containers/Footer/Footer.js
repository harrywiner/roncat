import React from "react";
import "./Footer.css"

const Footer = (props) => {
    var body = []
    for (var word of props.words) {
        body.push(<a href={word.link} rel='noreferrer' target="_blank" >Definition of {word.word}<br></br></a>)
    }
    return <div className="Footer">
        {body}
    </div>;
};

export default Footer;