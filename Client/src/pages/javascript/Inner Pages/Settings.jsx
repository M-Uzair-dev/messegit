import React, { useState } from "react";
import "../../css/settings.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChatCard from "../../../components/javascript/ChatCard";
import pfp from "../../../images/defaultpic.jpg";
import Button from "../../../components/javascript/Button";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Confirm from "./confirm";

const Settings = (props) => {
  const user = useSelector((state) => state.user);
  const [cookies, removeCookie] = useCookies(["jwt"]);
  const navigate = useNavigate();

  const [privacypage, setPrivacypage] = useState(false);
  const [blockedpage, setBlockedpage] = useState(false);
  const [showoptions, setShowOptions] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [noUsers, setNoUsers] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [pfpChecked, setPfpChecked] = useState(user.img || "everyone");
  const [chatChecked, setChatChecked] = useState(user.chat || "everyone");

  const updatePrivacy = () => {
    fetch("http://localhost:5000/auth/privacy", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: user.id,
        privacy: {
          img: pfpChecked,
          chat: chatChecked,
        },
      }),
    });
  };

  return (
    <div
      className="settingspage"
      style={props.display === true ? { display: "flex" } : { display: "none" }}
    >
      <ArrowBackIcon
        className="backarrow"
        onClick={() => {
          if (privacypage) {
            setPrivacypage(false);
          } else if (blockedpage) {
            setBlockedpage(false);
          } else {
            props.off();
          }
        }}
      />
      {privacypage ? (
        <>
          <h1 className="heading">Privacy</h1>
          <div className="privacy">
            <p
              onClick={() => {
                setShowOptions("pfp");
              }}
            >
              Profile picture visiblity. <span>{pfpChecked}</span>
            </p>
            <p
              onClick={() => {
                setShowOptions("chat");
              }}
            >
              Who can start chat with you. <span>{chatChecked}</span>
            </p>
          </div>
        </>
      ) : blockedpage ? (
        <>
          <h1 className="heading">Blocked Users</h1>
          <div className="options">
            {noUsers ? (
              <>
                <span className="noUsers">No Users Blocked</span>
              </>
            ) : (
              <div className="cards settingsCards">
                <>
                  <ChatCard pfp={pfp} name="Uzair" username="@uzair-dev" />
                  <ChatCard pfp={pfp} name="Uzair" username="@uzair-dev" />
                  <ChatCard pfp={pfp} name="Uzair" username="@uzair-dev" />
                  <ChatCard pfp={pfp} name="Uzair" username="@uzair-dev" />
                  <ChatCard pfp={pfp} name="Uzair" username="@uzair-dev" />
                  <ChatCard pfp={pfp} name="Uzair" username="@uzair-dev" />
                  <ChatCard pfp={pfp} name="Uzair" username="@uzair-dev" />
                  <ChatCard pfp={pfp} name="Uzair" username="@uzair-dev" />
                  <ChatCard pfp={pfp} name="Uzair" username="@uzair-dev" />
                </>
              </div>
            )}

            <div className="settingsButton">
              {true ? (
                <Button theme="light" submit={() => {}} text="Unblock" />
              ) : (
                <Button
                  theme="gradient"
                  submit={() => {}}
                  text="Create group"
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <h1 className="heading">Settings</h1>
          <div className="options">
            <p
              onClick={() => {
                setPrivacypage(true);
              }}
            >
              Privacy
            </p>
            <p
              onClick={() => {
                setBlockedpage(true);
              }}
            >
              Blocked Users
            </p>
            <p
              onClick={() => {
                setConfirmMessage(
                  `${user.name}, Are you sure you want to Log out`
                );
                setShowConfirm(true);
              }}
            >
              Log Out
            </p>
            <p>Delete Account</p>
            <p>Contact Developer</p>
          </div>
        </>
      )}
      {showoptions === "pfp" ? (
        <div className="opts">
          <div className="optionsbar">
            {}
            <div>
              <label htmlFor="everyone">Everyone</label>
              <input
                type="radio"
                name="option"
                id="everyone"
                checked={pfpChecked === "everyone"}
                onChange={(e) => setPfpChecked(e.target.id)}
              />
            </div>
            <div>
              <label htmlFor="none">No one</label>
              <input
                type="radio"
                name="option"
                id="none"
                checked={pfpChecked === "none"}
                onChange={(e) => setPfpChecked(e.target.id)}
              />
            </div>
            <div>
              <label htmlFor="chats">Onle users I have chats with</label>
              <input
                type="radio"
                name="option"
                id="chats"
                checked={pfpChecked === "chats"}
                onChange={(e) => setPfpChecked(e.target.id)}
              />
            </div>
          </div>
          <div
            className="blur"
            onClick={() => {
              setShowOptions("");
              updatePrivacy();
            }}
          ></div>
        </div>
      ) : showoptions === "chat" ? (
        <div className="opts">
          <div className="optionsbar">
            {}
            <div>
              <label htmlFor="everyone">Everyone</label>
              <input
                type="radio"
                name="option"
                id="everyone"
                checked={chatChecked === "everyone"}
                onChange={(e) => setChatChecked(e.target.id)}
              />
            </div>

            <div>
              <label htmlFor="none">No one</label>
              <input
                type="radio"
                name="option"
                id="none"
                checked={chatChecked === "none"}
                onChange={(e) => setChatChecked(e.target.id)}
              />
            </div>
          </div>
          <div
            className="blur"
            onClick={() => {
              setShowOptions("");
              updatePrivacy();
            }}
          ></div>
        </div>
      ) : (
        <></>
      )}

      <Confirm
        visible={showConfirm}
        hide={() => {
          setShowConfirm(false);
        }}
        message={confirmMessage}
        yes={() => {
          setShowConfirm(false);
          removeCookie("jwt");
          navigate("/login");
        }}
      />
    </div>
  );
};

export default Settings;
