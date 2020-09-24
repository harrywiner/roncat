import React from "react";

const result = (props) => {
  let style = {
    fontSize: "30px",
    paddingLeft: "30px",
  };
  return <text style={style}>{props.text}</text>;
};

export default result;
