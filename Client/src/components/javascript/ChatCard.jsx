import React, { useEffect, useState } from "react";
import "../../pages/css/innerpages.css";
import { useSelector } from "react-redux";

export default function ChatCard({ pfp, name, id, nowrap, onclick, isGroup }) {
  const [count, setcount] = useState(0);
  const [latestMessage, setlatestMessage] = useState("");

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getCount = async () => {
      try {
        if (!user.id || !id) return;

        const res = await fetch("http://localhost:5000/messages/getcount", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatId: id,
            userId: user.id,
          }),
        });
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const result = await res.json();

        if (result.success === false) {
          if (result.message === "No messages found") {
            return;
          }
          throw new Error("An unexpected error occurred!");
        } else {
          setcount(result.newMessageCount);
          setlatestMessage(result.latestMessage);
          console.log(result);
        }
      } catch (e) {
        console.log(e);
        enqueueSnackbar("An error occured.", { variant: "error" });
      }
    };
    getCount();
  }, []);
  return (
    <div>
      <div
        onClick={() => {
          onclick ? onclick() : null;
        }}
        className={isGroup ? "group card" : "card"}
        style={nowrap ? { width: "100%" } : {}}
      >
        <div className="cardleftdiv">
          <img src={pfp} alt="user image" />
          <div>
            <h3>{name}</h3>
            <p>{latestMessage}</p>
          </div>
        </div>
        {count === 0 ? (
          <></>
        ) : count ? (
          <div className="badge">
            <p>{count}</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
