import React, { useRef, useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import pfp from "../../../images/userpfp.jpg";
import SendIcon from "@mui/icons-material/Send";
import logo from "../../../images/transparentlogo.png";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

export default function Chat() {
  //------------------------------- Variables and Hooks --------------------------------------------

  const refresh = localStorage.getItem("refresh");
  const { id } = useParams();
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);
  const user = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();

  //----------------------------------- States ---------------------------------------------------

  const [messege, setMessege] = useState("");
  const [showdrop, setShowdrop] = useState(false);
  const [messeges, setMesseges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const [admin, setAdmin] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  // --------------------------------  UseEffects -----------------------------------------------

  useEffect(() => {
    setLoading(true);
    setMesseges([]);

    const fetchData = async () => {
      try {
        if (!user.id || !id) return;

        const res = await fetch("http://localhost:5000/messages/get", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatID: id,
            userID: user.id,
          }),
        });
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const result = await res.json();
        console.log(result.data);

        if (result.success === false) {
          if (result.message === "No messages found") {
            if (result.group) {
              setIsGroup(result.group);
              setAdmin(result.admin);
            }

            if (result.data.name) {
              setName(result.data.name);
            } else {
              let updatedData = result.data.filter(
                (userObj) => userObj.id !== user.id
              );
              setName(updatedData[0].name);
            }
            setImage(result.image);
            setLoading(false);
            return;
          }
          throw new Error("An unexpected error occurred!");
        } else {
          if (result.group) {
            setIsGroup(result.group);
            setAdmin(result.admin);
          }
          console.log(result.data);
          if (result.data.name) {
            setName(result.data.name);
          } else {
            let updatedData = result.data.filter(
              (userObj) => userObj.id !== user.id
            );
            setName(updatedData[0].name);
          }
          setImage(result.image);
          setMesseges(result.messages);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
        navigate("/chats");
        enqueueSnackbar("An error occured.", { variant: "error" });
      }
    };

    fetchData();
  }, [id, user.id]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo(
        0,
        chatContainerRef.current.scrollHeight
      );
    }
  }, [messeges]);

  //  ----------------------------- Functions -----------------------------------------

  const handleChange = (e) => {
    setMessege(e.target.value);
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

        enqueueSnackbar("Chat deleted..", { variant: "success" });
        setShowdrop(false);
      }
    } catch (e) {
      console.log(e);
      enqueueSnackbar("An error occured.", { variant: "error" });
    }
  };

  let addMessege = async () => {
    if (messege === "") {
      enqueueSnackbar("Empty messege.", { variant: "error" });
      return;
    }
    try {
      if (!user.id || !id) throw new Error(`HTTP error! Status: ${res.status}`);

      const res = await fetch("http://localhost:5000/messages/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatID: id,
          userID: user.id,
          content: messege,
        }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const result = await res.json();

      if (result.success === false) {
        throw new Error("An unexpected error occurred!");
      }
      setMesseges([...messeges, { content: messege, senderID: user.id }]);
      setMessege("");
    } catch (e) {
      navigate("/chats");
      enqueueSnackbar("An error occured.", { variant: "error" });
    }
  };

  //--------------------------------  JSX  --------------------------------------------------

  return (
    <div className="rightpage">
      {id === undefined || loading ? (
        <></>
      ) : (
        <div className="rightSideTopBar">
          <div className="left">
            <div className="arrow">
              <ArrowBackIcon
                className="backarrow"
                onClick={() => {
                  navigate("/chats");
                }}
              />
            </div>
            <div className="barleftdiv">
              <img src={image || pfp} alt="user image" />
              <div>
                <h3>{name}</h3>
                <p>@username</p>
              </div>
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
                {isGroup ? (
                  admin === user.id ? (
                    <div className="dropmenu">
                      <p>Add members</p>
                      <p
                        onClick={() => {
                          deletechat();
                        }}
                      >
                        Delete Group
                      </p>
                    </div>
                  ) : (
                    <div className="dropmenu">
                      <p>Exit Group</p>
                      <p>Report group</p>
                    </div>
                  )
                ) : (
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
                )}
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
      )}

      <div className="messeges" ref={chatContainerRef}>
        {id === undefined ? (
          <img src={logo} alt="logo" className="chatlogo" />
        ) : loading ? (
          <div
            style={{
              width: "100%",
              height: "300px",
              display: "grid",
              placeItems: "center",
            }}
          >
            <TailSpin
              visible={true}
              height="45"
              width="45"
              color="black"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : messeges.length === 0 ? (
          <>
            <p className="noresults">No messages yet.</p>
          </>
        ) : (
          <div className="messegesDiv">
            {messeges.map((e) => {
              return (
                <div
                  key={e.createdAt}
                  className={
                    ("messegeDiv", e.senderID === user.id ? "yes" : "no")
                  }
                >
                  <p className="messege">
                    {e.senderID !== user.id ? (
                      <span className="name">@username</span>
                    ) : (
                      <></>
                    )}{" "}
                    {e.content}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {id === undefined || loading ? (
        <></>
      ) : (
        <div className="inputTabParent">
          <div className="inputTab">
            <input
              onChange={(e) => {
                handleChange(e);
              }}
              value={messege}
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
      )}
    </div>
  );
}
