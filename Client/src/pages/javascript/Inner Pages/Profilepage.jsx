import React, { useState } from "react";
import Input from "../../../components/javascript/Input";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import pfp from "../../../images/userpfp.jpg";
import "../../css/pages.css";
import { useSelector } from "react-redux";
import Button from "../../../components/javascript/Button";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

export default function Profilepage(props) {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState(user.name || "");
  const [username, setUsername] = useState(user.username || "");
  const [about, setAbout] = useState(user.about || "");
  return (
    <div
      className="createGroupDiv"
      style={props.display === true ? { display: "flex" } : { display: "none" }}
    >
      <ArrowBackIcon
        className="backarrow"
        onClick={() => {
          props.off();
        }}
      />
      <h1 className="heading">Profile</h1>
      <div className="pfpcont">
        <img src={pfp} alt="profile Image" className="profileimage" />
        <div className="hover">
          <CameraAltOutlinedIcon />{" "}
        </div>
      </div>
      <div className="inputDiv profileinputdiv">
        <Input
          label="Name"
          value={name}
          onchange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Your Name"
          type="text"
          id="text"
          baseColor="#f0f0f0"
          margin="low"
        />
        <Input
          label="Username"
          value={username}
          onchange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Your Username"
          type="text"
          id="text"
          baseColor="#f0f0f0"
          margin="low"
        />
        <Input
          label="About"
          value={about}
          margin="low"
          onchange={(e) => {
            setAbout(e.target.value);
          }}
          placeholder="About you."
          type="text"
          id="text"
          baseColor="#f0f0f0"
          textarea="yes"
        />
      </div>

      <div className="buttonDiv">
        <Button
          // loading={loading === "button"}
          text="Save"
          theme="dark"
          submit={() => {}}
        />
      </div>
    </div>
  );
}
