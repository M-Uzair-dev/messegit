import React from "react";
import "../css/button.css";

const Button = (props) => {
  return (
    <div className="buttondiv">
      <button
        onClick={() => {
          props.submit();
        }}
        className={props.theme}
      >
        {props.text}
      </button>
    </div>
  );
};

export default Button;
