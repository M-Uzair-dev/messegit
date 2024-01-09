import React from "react";
import Input from "../../../components/javascript/Input";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import pfp from "../../../images/userpfp.jpg";
import "../../css/pages.css";
import Button from "../../../components/javascript/Button";

export default function CreateGroup(props) {
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
      <h1 className="heading">Create Group</h1>
      <div className="inputDiv">
        <Input
          label="Group Name"
          // value={data.email}
          // onchange={handleChange}
          placeholder="Enter the group's name"
          type="text"
          id="text"
          baseColor="#f0f0f0"
          search="true"
        />
        <Input
          label="Add users"
          // value={data.email}
          // onchange={handleChange}
          placeholder="Search users to add."
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
      </div>
      <div className="buttonDiv">
        <Button
          // loading={loading === "button"}
          text="Create"
          theme="dark"
          submit={() => {
            console.log("Hello world");
          }}
        />
      </div>
    </div>
  );
}
