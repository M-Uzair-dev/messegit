import React, { useState } from "react";
import "../css/input.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const Input = (props) => {
  const [showpass, setShowpass] = useState(false);
  return (
    <>
      {props.textarea === "yes" ? (
        <div className={`input ${props.margin === "low" ? "lowmargin" : "l"}`}>
          <label
            style={props.baseColor ? { background: props.baseColor } : {}}
            htmlFor={props.type}
          >
            {props.label}
          </label>
          <textarea
            value={props.value}
            onChange={(event) => props.onchange(event)}
            placeholder={props.placeholder}
            id={props.id}
            type={showpass ? "text" : props.type}
            style={
              (props.type === "password" ? { width: "80%" } : { width: "90%" },
              props.baseColor ? { background: props.baseColor } : {})
            }
            rows={3}
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
          ) : props.search === "true" ? (
            <SearchRoundedIcon className="icon" />
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className={`input ${props.margin === "low" ? "lowmargin" : "l"}`}>
          <label
            style={props.baseColor ? { background: props.baseColor } : {}}
            htmlFor={props.type}
          >
            {props.label}
          </label>
          <input
            value={props.value}
            onChange={(event) => props.onchange(event)}
            placeholder={props.placeholder}
            id={props.id}
            type={showpass ? "text" : props.type}
            style={
              (props.type === "password" ? { width: "80%" } : { width: "90%" },
              props.baseColor ? { background: props.baseColor } : {})
            }
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
          ) : props.search === "true" ? (
            <SearchRoundedIcon className="icon" />
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default Input;
