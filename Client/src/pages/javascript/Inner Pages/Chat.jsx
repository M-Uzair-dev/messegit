import React, { useRef, useEffect, useState } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import pfp from "../../../images/userpfp.jpg";
import SendIcon from "@mui/icons-material/Send";

export default function Chat() {
  const [messege, setMessege] = useState("");
  const handleChange = (e) => {
    setMessege(e.target.value);
  };
  const chatContainerRef = useRef(null);
  let username = "Uzair Manan";
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

    { messege: "Why don't you visit my house this sunday ?", yes: false },

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
          <MoreVertIcon className="dotsicon" />
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
