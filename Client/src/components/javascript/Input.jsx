import React, { useState } from "react";
import "../css/input.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const Input = (props) => {
  const [showpass, setShowpass] = useState(false);

  const {
    textarea,
    baseColor,
    margin,
    type,
    placeholder,
    label,
    search,
    id,
    value,
    onchange,
  } = props;

  const commonInputProps = {
    value,
    onChange: (event) => onchange(event),
    placeholder,
    id,
    type: showpass ? "text" : type,
    style: {
      width: type === "password" ? "80%" : "90%",
      ...(baseColor ? { background: baseColor } : {}),
    },
  };

  return (
    <div className={`input ${margin === "low" ? "lowmargin" : "l"}`}>
      <label style={baseColor ? { background: baseColor } : {}} htmlFor={type}>
        {label}
      </label>
      {textarea === "yes" ? (
        <textarea {...commonInputProps} rows={3} />
      ) : (
        <input {...commonInputProps} />
      )}
      {(type === "password" || search === "true") && (
        <div
          onClick={() => {
            setShowpass(!showpass);
          }}
        >
          {type === "password" ? (
            showpass ? (
              <VisibilityIcon className="icon" />
            ) : (
              <VisibilityOffIcon className="icon" />
            )
          ) : (
            <SearchRoundedIcon className="icon" />
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
