import React from "react";
import Input from "../../../components/javascript/Input";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import pfp from "../../../images/userpfp.jpg";
import "../../css/pages.css";
export default function SearchUser(props) {
  return (
    <div
      className="SearchUserDiv"
      style={props.display === true ? { display: "flex" } : { display: "none" }}
    >
      <ArrowBackIcon
        className="backarrow"
        onClick={() => {
          props.off();
        }}
      />
      <h1 className="heading">Search User</h1>
      <div className="inputDiv">
        <Input
          label="Search"
          // value={data.email}
          // onchange={handleChange}
          placeholder="Search users to chat with..."
          type="text"
          id="text"
          baseColor="#f0f0f0"
          search="true"
        />
      </div>
      <div className="cards">
        <div className="card">
          <div className="cardleftdiv">
            <img src={pfp} alt="user image" />
            <div>
              <h3>User's name</h3>
              <p>Hello there ! i am your biggest fan with biggest link</p>
            </div>
          </div>
          <div className="badge">
            <p>3</p>
          </div>
        </div>
        <div className="card active">
          <div className="cardleftdiv">
            <img src={pfp} alt="user image" />
            <div>
              <h3>User's name</h3>
              <p>Hello there ! i am your biggest fan with biggest link</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
