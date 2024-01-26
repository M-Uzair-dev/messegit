import React, { useState } from "react";
import "../css/mainpage.css";
import Chat from "./Inner Pages/Chat";
import Chats from "./Inner Pages/Chats";
import Button from "../../components/javascript/Button";
import AddUser from "./Inner Pages/SearchUser";
import CreateGroup from "./Inner Pages/CreateGroup";
import Profilepage from "./Inner Pages/Profilepage";
import CloseIcon from "@mui/icons-material/Close";
import { useParams } from "react-router-dom";
import Details from "./Inner Pages/details";

export default function Mainpage() {
  const [showAddDiv, setshowAddDiv] = useState(false);
  const [showAddChat, setShowAddChat] = useState(false);
  const [showCreateGroupPage, setShowCreateGroupPage] = useState(false);

  const [showdetails, setShowdetails] = useState(false);
  const { id } = useParams();

  const [showProfilePage, setShowProfilePage] = useState(false);

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
        <div className={id ? "chatdivmain show" : "chatdivmain"}>
          <Chat
            detailspage={() => {
              setShowdetails(true);
            }}
          />
          <Details
            hide={() => {
              setShowdetails(false);
            }}
            visible={showdetails}
          />
        </div>
      </div>

      <div className="MainRightCont">
        <Chat
          detailspage={() => {
            setShowdetails(true);
          }}
        />
        <Details
          hide={() => {
            setShowdetails(false);
          }}
          visible={showdetails}
        />
      </div>
    </div>
  );
}
