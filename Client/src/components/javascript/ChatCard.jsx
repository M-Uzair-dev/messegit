import React from "react";
import "../../pages/css/innerpages.css";

export default function ChatCard({ pfp, name, message, nowrap }) {
  return (
    <div>
      <div className="card" style={nowrap ? { width: "100%" } : {}}>
        <div className="cardleftdiv">
          <img src={pfp} alt="user image" />
          <div>
            <h3>{name}</h3>
            <p>{message}</p>
          </div>
        </div>
        {/* <div className="badge">
          <p>3</p>
        </div> */}
      </div>
    </div>
  );
}
