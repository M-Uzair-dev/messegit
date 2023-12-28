import React from "react";
import "../css/input.css";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Input = (props) => {
  return (
    <div className="input">
      <label htmlFor="input">{props.label}</label>
      <input id="input" placeholder={props.placeholder} type={props.type} />
      <VisibilityIcon />
    </div>
  );
};

export default Input;
