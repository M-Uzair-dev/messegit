import React from "react";
import "../../css/details.css";
import pfp from "../../../images/userpfp.jpg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatCard from "../../../components/javascript/ChatCard";
import Button from "../../../components/javascript/Button";

export default function Details(props) {
  return (
    <div
      className="DetailsPage"
      style={props.visible ? { display: "block" } : { display: "none" }}
    >
      <div className="detailsPageWrapper">
        <div
          className="arrowInDetailsPage"
          onClick={() => {
            props.hide();
          }}
        >
          <ArrowBackIcon />
        </div>
        <div className="image detailsContainer">
          <img src={pfp} alt="Profile image" />
          <h1>User's name</h1>
          <p>@username</p>
          <p>
            This is the about text of the user which is really lng and not so
            interesting to read
          </p>
        </div>
        <div className="users">
          <h1>Users : </h1>
          <ChatCard
            pfp={pfp}
            name={"User's name"}
            id={"lol"}
            onclick={() => {}}
          />
          <ChatCard
            pfp={pfp}
            name={"User's name"}
            id={"lol"}
            onclick={() => {}}
          />
          <ChatCard
            pfp={pfp}
            name={"User's name"}
            id={"lol"}
            onclick={() => {}}
          />
          <div className="buttons">
            <Button theme="gradient" submit={() => {}} text="Manage Users" />
            <Button theme="dark" submit={() => {}} text="Delete Group" />
          </div>
        </div>
      </div>
    </div>
  );
}
