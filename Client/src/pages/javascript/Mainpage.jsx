import React, { useState } from "react";
// import { useSelector } from "react-redux";
import "../css/mainpage.css";
import Chat from "./Inner Pages/Chat";
import Chats from "./Inner Pages/chats";
import Button from "../../components/javascript/Button";
import AddUser from "./Inner Pages/AddUser";
import CreateGroup from "./Inner Pages/CreateGroup";
import Profilepage from "./Inner Pages/Profilepage";
import CloseIcon from "@mui/icons-material/Close";

export default function Mainpage() {
  const [showAddDiv, setshowAddDiv] = useState(false);
  const [showAddChat, setShowAddChat] = useState(false);
  const [showCreateGroupPage, setShowCreateGroupPage] = useState(false);

  const [showProfilePage, setShowProfilePage] = useState(false);
  // const user = useSelector((state) => state.user);

  return (
    <div className="main">
      <div className="MainLeftCont">
        <Chats
          showadddiv={() => {
            setshowAddDiv(!showAddDiv);
          }}
          showaddchat={() => {
            setShowAddChat(!showAddChat);
          }}
          showaddgrouppage={() => {
            setShowCreateGroupPage(!showCreateGroupPage);
          }}
          showprofilepage={() => {
            setShowProfilePage(!showProfilePage);
          }}
        />

        {showAddDiv ? (
          <div
            className="blurDiv"
            onClick={() => {
              setshowAddDiv(false);
            }}
          >
            <div className="add">
              <CloseIcon
                className="closeicon"
                onClick={() => {
                  setshowAddDiv(false);
                }}
              />
              <Button
                // loading={loading === "button"}
                text="Add a new chat"
                theme="dark"
                submit={() => {
                  setShowAddChat(true);
                }}
              />
              <Button
                // loading={loading === "button"}
                text="Create a group chat"
                theme="light"
                submit={() => {
                  setShowCreateGroupPage(true);
                }}
              />
            </div>
          </div>
        ) : (
          <></>
        )}

        <AddUser
          display={showAddChat}
          off={() => {
            setShowAddChat(false);
          }}
        />

        {showCreateGroupPage ? (
          <CreateGroup
            display={showCreateGroupPage}
            off={() => {
              setShowCreateGroupPage(false);
            }}
          />
        ) : (
          <></>
        )}

        {showProfilePage ? (
          <Profilepage
            display={showProfilePage}
            off={() => {
              setShowProfilePage(false);
            }}
          />
        ) : (
          <></>
        )}
      </div>

      <div className="MainRightCont">
        <Chat />
      </div>
    </div>
  );
}
