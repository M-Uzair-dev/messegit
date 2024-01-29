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
import Confirm from "./confirm";

export default function Chat(props) {
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
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [fnc, setfnc] = useState("");

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

        if (result.success === false) {
          if (result.message === "No messages found") {
            if (result.group) {
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
            setIsGroup(result.group);
            setImage(result.image);
            setLoading(false);
            return;
          }
          throw new Error("An unexpected error occurred!");
        } else {
          if (result.group) {
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
          setIsGroup(result.group);
          setImage(result.image);
          setMesseges(result.messages);
          setLoading(false);
        }
      } catch (e) {
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

  let deletechat = async (m) => {
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

        enqueueSnackbar(m, { variant: "success" });
        setShowdrop(false);
      }
    } catch (e) {
      enqueueSnackbar("An error occured.", { variant: "error" });
    }
  };

  let exitgroup = async (message) => {
    try {
      const res = await fetch("http://localhost:5000/chats/exit", {
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
      if (result.success === true) {
        navigate("/chats");
        if (refresh === "true") localStorage.setItem("refresh", false);
        else localStorage.setItem("refresh", true);

        enqueueSnackbar(message, { variant: "success" });
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
  let cont = () => {
    if (fnc === "DeleteChat") {
      deletechat("Chat deleted.");
      setfnc("");
    } else if (fnc === "BlockChat") {
      deletechat("User blocked successfully.");
      setfnc("");
    } else if (fnc === "Report") {
      enqueueSnackbar(
        "the User has been reported. we will see their activity and take actions",
        { variant: "warning" }
      );
      setfnc("");
    } else if (fnc === "ReportGroup") {
      enqueueSnackbar(
        "This Group has been reported. we will see the activity and take actions",
        { variant: "warning" }
      );
      setfnc("");
    } else if (fnc === "DeleteGroup") {
      deletechat("Group Deleted successfully.");
      setfnc("");
    } else if (fnc === "ExitGroup") {
      exitgroup("Group Exited Successfully");
      setfnc("");
    } else {
      enqueueSnackbar("Something went wrong.", { variant: "error" });
      setfnc("");
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
              <img
                src={image || pfp}
                alt="user image"
                style={
                  isGroup
                    ? { border: "2px solid #12e269" }
                    : { border: "2px solid #9c08ff" }
                }
                onClick={() => {
                  props.detailspage();
                }}
              />
              <div>
                <h3
                  onClick={() => {
                    props.detailspage();
                  }}
                >
                  {name}
                </h3>
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
                          setConfirmMessage(
                            "Are you sure you want to delete this group ?"
                          );
                          setShowConfirm(true);
                          setfnc("DeleteGroup");
                          setShowdrop(false);
                        }}
                      >
                        Delete Group
                      </p>
                    </div>
                  ) : (
                    <div className="dropmenu">
                      <p
                        onClick={() => {
                          setConfirmMessage(
                            "Are you sure you want to exit this group ?"
                          );
                          setShowConfirm(true);
                          setfnc("ExitGroup");
                          setShowdrop(false);
                        }}
                      >
                        Exit Group
                      </p>
                      <p
                        onClick={() => {
                          setConfirmMessage(
                            "Are you sure you want to Report this group ?"
                          );
                          setShowConfirm(true);
                          setfnc("ReportGroup");
                          setShowdrop(false);
                        }}
                      >
                        Report group
                      </p>
                    </div>
                  )
                ) : (
                  <div className="dropmenu">
                    <p
                      onClick={() => {
                        setConfirmMessage(
                          "Are you sure you want to Delete this chat ?"
                        );
                        setShowConfirm(true);
                        setfnc("DeleteChat");
                        setShowdrop(false);
                      }}
                    >
                      Delete Chat
                    </p>
                    <p
                      onClick={() => {
                        setConfirmMessage(
                          "Are you sure you want to Block this user ?"
                        );
                        setShowConfirm(true);
                        setfnc("BlockChat");
                        setShowdrop(false);
                      }}
                    >
                      Block User
                    </p>
                    <p
                      onClick={() => {
                        setConfirmMessage(
                          "Are you sure you want to Report this user ?"
                        );
                        setShowConfirm(true);
                        setfnc("Report");
                        setShowdrop(false);
                      }}
                    >
                      Report User
                    </p>
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
                    {e.senderID !== user.id && isGroup ? (
                      <span className="name">{e.username}</span>
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
      {
        <Confirm
          visible={showConfirm}
          hide={() => {
            setShowConfirm(false);
          }}
          message={confirmMessage}
          yes={() => {
            cont(fnc);
            setShowConfirm(false);
          }}
        />
      }
    </div>
  );
}
