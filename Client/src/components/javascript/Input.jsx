import React, { useState } from "react";
import "../css/input.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Input = (props) => {
  const [showpass, setShowpass] = useState(false);
  return (
    <div className="input">
      <label htmlFor={props.type}>{props.label}</label>
      <input
        value={props.value}
        onChange={(event) => props.onchange(event)}
        placeholder={props.placeholder}
        id={props.type}
        type={showpass ? "text" : props.type}
        style={props.type === "password" ? { width: "80%" } : { width: "90%" }}
      />
      {props.type === "password" ? (
        <div
          onClick={() => {
            setShowpass(!showpass);
          }}
        >
          {showpass ? (
            <VisibilityIcon className="icon" />
          ) : (
            <VisibilityOffIcon className="icon" />
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Input;
