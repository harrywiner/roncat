import React from "react";

const result = (props) => {
  let style = {
    fontSize: "30px",
    paddingLeft: "30px",
  };
  return <p style={style}>{props.text}</p>;
};

export default result;
