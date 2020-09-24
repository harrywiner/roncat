import React from "react";

const input = (props) => {
  return (
    <input
      type="text"
      size="5"
      id={"word-" + props.id}
      onChange={props.changed}
    ></input>
  );
};

export default input;
