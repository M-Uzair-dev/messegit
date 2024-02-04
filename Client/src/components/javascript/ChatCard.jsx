import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import "../../pages/css/innerpages.css";
import { useSelector } from "react-redux";
import defaultpfp from "../../images/defaultpic.jpg";
import { useParams } from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";
import io from "socket.io-client";

const ChatCard = memo(
  ({
    pfp,
    name,
    ChatId,
    nowrap,
    onclick,
    isGroup,
    username,
    admin,
    date,
    selected,
  }) => {
    const { id } = useParams();
    const [count, setCount] = useState(0);
    const [latestMessage, setLatestMessage] = useState("");
    const [dateState, setDateState] = useState(date);
    const user = useSelector((state) => state.user);
    const isMounted = useRef(false);
    const socket = useRef(io("http://localhost:5000"));

    const receiveMessageHandler = useCallback(
      (data) => {
        if (isMounted.current) {
          setLatestMessage(data?.content);
          setDateState(new Date());
          if (id === undefined || id !== ChatId) {
            console.log(data);
            setCount((prev) => prev + 1);
          }
        }
      },
      [id, ChatId]
    );

    useEffect(() => {
      if (socket.current && ChatId && !isMounted.current) {
        socket.current.emit("joinRoom", { roomId: ChatId });
        isMounted.current = true;
      }

      socket.current.on("receiveMessage", receiveMessageHandler);

      return () => {
        socket.current.off("receiveMessage", receiveMessageHandler);
      };
    }, [id, ChatId, receiveMessageHandler]);

    useEffect(() => {
      const getCount = async () => {
        try {
          if (!user.id || !ChatId) return;

          const res = await fetch("http://localhost:5000/messages/getcount", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chatId: ChatId,
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
            setCount(result.newMessageCount);
            console.log(result.newMessageCount);
            setLatestMessage(result.latestMessage);
          }
        } catch (e) {
          console.log(e);
        }
      };

      getCount();
    }, []);

    useEffect(() => {
      if (id === ChatId) {
        setCount(0);
      }
    }, [id, ChatId]);

    function formatDate(inputDate) {
      const currentDate = new Date();
      const inputDateTime = new Date(inputDate);
      const timeDifference = currentDate - inputDateTime;
      const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000;

      if (timeDifference < twentyFourHoursInMilliseconds) {
        const formattedTime = inputDateTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        return formattedTime.toLowerCase();
      } else {
        const formattedDate = `${
          inputDateTime.getMonth() + 1
        }/${inputDateTime.getDate()}/${inputDateTime.getFullYear()}`;
        return formattedDate;
      }
    }

    return (
      <div
        onClick={() => (onclick ? onclick() : null)}
        className={isGroup ? "group card" : "card"}
        style={nowrap ? { width: "100%" } : {}}
      >
        <div className="cardleftdiv">
          <div className="cardimagecont">
            <img src={pfp || defaultpfp} />
            <div className={selected ? "overlay" : "overlay hidden"}>
              <DoneIcon />
            </div>
          </div>
          <div>
            <h3>{name || "User's name"}</h3>
            {username ? <p>{username}</p> : <p>{latestMessage}</p>}
          </div>
        </div>

        {admin ? (
          <div className="admin">
            <p>ADMIN</p>
          </div>
        ) : count === 0 ? (
          <div className="date">
            <p>{date ? formatDate(dateState) : ""}</p>
          </div>
        ) : count ? (
          <>
            <div className="date">
              <p>{date ? formatDate(dateState) : ""}</p>
            </div>
            <div className="badge">
              <p>{count}</p>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }
);
export default ChatCard;
