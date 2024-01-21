import React, { useRef, useEffect, useState } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import pfp from "../../../images/userpfp.jpg";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useParams } from "react-router-dom";

export default function Chat(props) {
  const [messege, setMessege] = useState("");
  const [showdrop, setShowdrop] = useState(false);
  const handleChange = (e) => {
    setMessege(e.target.value);
  };
  const refresh = localStorage.getItem("refresh");
  const { id } = useParams();
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);
  let username = "@uzair-manan-224";
  const [messeges, setMesseges] = useState([
    { messege: "Hey", yes: false },

    { messege: "Hello there !", yes: true },

    { messege: "How are you ? long time no see", yes: false },

    { messege: "Nothing bro just so busy with work", yes: true },

    {
      messege: "Me too bor work just takes up too much of the time. ",
      yes: false,
    },

    { messege: "yea bro ", yes: true },

    { messege: "Wanna meet sometime ?", yes: false },

    { messege: "Sure bro i'll love to", yes: true },

    { messege: "I was also thinking about the same thing.", yes: true },

    { messege: "Where do you want to meet ?", yes: true },

    {
      messege:
        "Why don't you visit my house this sunday ?Why don't you visit my house this sunday ?Why don't you visit my house this sunday ?Why don't you visit my house this sunday ?Why don't you visit my house this sunday ?Why don't you visit my house this sunday ?Why don't you visit my house this sunday ?Why don't you visit my house this sunday ?Why don't you visit my house this sunday ?Why don't you visit my house this sunday ?",
      yes: false,
    },

    { messege: "That'll be so fun and exciting.", yes: false },

    { messege: "We'll also do BBQ", yes: false },

    {
      messege: "Okay. I'll come to your home this sunday at 4 O'clock",
      yes: true,
    },

    { messege: "Okay. Se you soon !", yes: false },
  ]);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo(
        0,
        chatContainerRef.current.scrollHeight
      );
    }
  }, [messeges]);
  let addMessege = () => {
    setMesseges([...messeges, { messege, yes: true }]);
  };

  let deletechat = async () => {
    try {
      const res = await fetch("http://localhost:5000/chats/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatID: id,
        }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const result = await res.json();
      if (result.success === true) {
        navigate("/chats");
        if (refresh === "true") localStorage.setItem("refresh", false);
        else localStorage.setItem("refresh", true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="rightpage">
      <div className="rightSideTopBar">
        <div className="barleftdiv">
          <img src={pfp} alt="user image" />
          <div>
            <h3>User's name</h3>
            <p>@username</p>
          </div>
        </div>
        <div className="dots">
          {showdrop ? (
            <>
              <CloseIcon
                className="dotsicon"
                onClick={() => {
                  setShowdrop(false);
                }}
              />
              <div className="dropmenu">
                <p
                  onClick={() => {
                    deletechat();
                  }}
                >
                  Delete Chat
                </p>
                <p>Block User</p>
                <p>Report User</p>
              </div>
            </>
          ) : (
            <MoreVertIcon
              onClick={() => {
                setShowdrop(true);
              }}
              className="dotsicon"
            />
          )}
        </div>
      </div>
      <div className="messeges" ref={chatContainerRef}>
        <div className="messegesDiv">
          {messeges.map((e) => {
            return (
              <div
                key={e.messege}
                className={("messegeDiv", e.yes ? "yes" : "no")}
              >
                <p className="messege">
                  {!e.yes ? <span className="name">{username}</span> : <></>}{" "}
                  {e.messege}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="inputTabParent">
        <div className="inputTab">
          <input
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="Type here..."
            className="messegeInput"
          />
          <SendIcon
            onClick={() => {
              addMessege();
            }}
          />
        </div>
      </div>
    </div>
  );
}
