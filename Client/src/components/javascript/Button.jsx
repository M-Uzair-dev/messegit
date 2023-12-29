import React from "react";
import "../css/button.css";

const Button = (props) => {
  return (
    <div className="buttondiv">
      {props.dark === "yes" ? (
        <button
          className="dark"
          onClick={() => {
            props.submit();
          }}
        >
          {props.text}
        </button>
      ) : (
        <button className="light">{props.text}</button>
      )}
    </div>
  );
};

export default Button;
