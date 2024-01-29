import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "../../css/confirm.css";

export default function Confirm(props) {
  return (
    <div className={props.visible ? "confirm" : "confirm hidden"}>
      <div
        className="blurback"
        onClick={() => {
          props.hide();
        }}
      ></div>
      <div className="confirmInner">
        <div
          className="close"
          onClick={() => {
            props.hide();
          }}
        >
          <CloseIcon />
        </div>
        <p>{props.message}</p>
        <div className="confirmButtons">
          <button
            className="confirmButton"
            onClick={() => {
              props.yes();
            }}
          >
            Yes
          </button>
          <button
            className="confirmButton no"
            onClick={() => {
              props.hide();
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
