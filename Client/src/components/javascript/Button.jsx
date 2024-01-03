import React, { useState } from "react";
import "../css/button.css";
import { TailSpin } from "react-loader-spinner";

const Button = (props) => {
  return (
    <div className="buttondiv">
      <button
        onClick={() => {
          props.submit();
        }}
        className={props.theme}
      >
        {props.loading ? (
          <TailSpin
            visible={true}
            height="24"
            width="24"
            color={
              props.theme === "dark" || props.theme === "gradient"
                ? "white"
                : "black"
            }
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : (
          props.text
        )}
      </button>
    </div>
  );
};

export default Button;
