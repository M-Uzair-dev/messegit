import React from "react";
import "../../css/details.css";

export default function Details(props) {
  return (
    <div
      className="DetailsPage"
      style={props.visible ? { display: "block" } : { display: "none" }}
    >
      <p
        onClick={() => {
          props.hide();
        }}
      >
        Back
      </p>{" "}
      Details
    </div>
  );
}
