import React, { useState } from "react";
import "../../css/innerpages.css";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import logo from "../../../images/transparentlogo.png";
import pfp from "../../../images/userpfp.jpg";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function Chats(props) {
  return (
    <div className="leftMainContainer">
      <div className="LeftTopBar">
        <div className="InnerLeftTopBar">
          <img src={logo} alt="logo" />
          <div className="InnerLeftTopBarRight">
            <SettingsRoundedIcon titleAccess="Settings" className="settings" />
            <img
              src={pfp}
              alt="profile"
              onClick={() => {
                props.showprofilepage();
              }}
            />
          </div>
        </div>
      </div>
      <div className="optionbar">
        <div
          className="addbuttondiv"
          onClick={() => {
            props.showadddiv();
          }}
        >
          <AddRoundedIcon titleAccess="Add new chat" />
        </div>
        <div className="searchChatsDiv">
          <input placeholder="Search chats..." />
          <SearchRoundedIcon titleAccess="Search" />
        </div>
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
    </div>
  );
}
