import "../../css/details.css";
import pfp from "../../../images/userpfp.jpg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChatCard from "../../../components/javascript/ChatCard";
import Button from "../../../components/javascript/Button";
import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { TailSpin } from "react-loader-spinner";
import Confirm from "./confirm";

export default function Details(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);
  const user = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const refresh = localStorage.getItem("refresh");

  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState(false);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [username, setUsername] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [admin, setAdmin] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [fnc, setfnc] = useState("");

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        if (!user.id || !id) return;

        const res = await fetch("http://localhost:5000/chats/details", {
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
          navigate("/chats");
          return;
        } else {
          if (result.group) {
            setGroup(true);
            let details = result.details;
            const index = details.members.findIndex(
              (obj) => obj.id === details.admin
            );
            const targetObject = details.members.splice(index, 1)[0];
            const sortedArray = [targetObject, ...details.members];
            setUsers(sortedArray);

            setName(details.name);
            setAdmin(details.admin);
          } else {
            let user = result.user;
            if (!user) throw new error("User is not present");
            setName(user.name);
            setImageurl(user.imageurl);
            setUsername(user.username);
            setAbout(user.about);
          }
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
        navigate("/chats");
        enqueueSnackbar("An error occured.", { variant: "error" });
      }
    };

    fetchData();
  }, [props.visible]);

  let deletechat = async (message) => {
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

        enqueueSnackbar(message, { variant: "success" });
        props.hide();
      }
    } catch (e) {
      console.log(e);
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
        props.hide();
      }
    } catch (e) {
      console.log(e);
      enqueueSnackbar("An error occured.", { variant: "error" });
    }
  };

  let cont = () => {
    if (fnc === "Report") {
      enqueueSnackbar(
        "This Group has been reported. we will see the activity and take actions",
        { variant: "warning" }
      );
      setfnc("");
    } else if (fnc === "exitGroup") {
      exitgroup("Group exited Successfully");
      setfnc("");
    } else if (fnc === "deleteGroup") {
      deletechat("Group Deleted Successfully");
      setfnc("");
    } else if (fnc === "deleteChat") {
      deletechat("Chat Deleted Successfully");
      setfnc("");
    } else if (fnc === "ReportUser") {
      enqueueSnackbar(
        "This User has been reported. we will see their activity and take actions",
        { variant: "warning" }
      );
      setfnc("");
    } else {
      enqueueSnackbar("Something went wrong.", { variant: "error" });
      setfnc("");
    }
  };

  return (
    <div
      className="DetailsPage"
      style={props.visible ? { display: "block" } : { display: "none" }}
    >
      {loading ? (
        <div className="spinner">
          <TailSpin
            visible={true}
            height="70"
            width="70"
            color="black"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : group ? (
        <div className="detailsPageWrapper">
          <div
            className="arrowInDetailsPage"
            onClick={() => {
              props.hide();
            }}
          >
            <ArrowBackIcon />
          </div>
          <div className="image detailsContainer">
            <img src={pfp} alt="Profile image" />
            <h1>{name}</h1>
          </div>
          <div className="users">
            <h1>Members : </h1>
            {users.map((e) => {
              return (
                <ChatCard
                  key={e.id}
                  pfp={e.imageur || pfp}
                  name={e.name}
                  id={""}
                  onclick={() => {
                    console.log(e._id + "||||||" + admin);
                  }}
                  username={e.username}
                  admin={e.id === admin}
                />
              );
            })}
            {admin === user.id ? (
              <div className="buttons">
                <Button
                  theme="gradient"
                  submit={() => {}}
                  text="Manage Users"
                />
                <Button
                  theme="dark"
                  submit={() => {
                    setConfirmMessage(
                      "Are you sure you want to Delete this group ?"
                    );
                    setShowConfirm(true);
                    setfnc("deleteGroup");
                    setShowdrop(false);
                  }}
                  text="Delete Group"
                />
              </div>
            ) : (
              <div className="buttons">
                <Button
                  theme="gradient"
                  submit={() => {
                    setConfirmMessage(
                      "Are you sure you want to exit this group ?"
                    );
                    setShowConfirm(true);
                    setfnc("exitGroup");
                    setShowdrop(false);
                  }}
                  text="Exit Group"
                />
                <Button
                  theme="dark"
                  submit={() => {
                    setConfirmMessage(
                      "Are you sure you want to Report this group ?"
                    );
                    setShowConfirm(true);
                    setfnc("Report");
                    setShowdrop(false);
                  }}
                  text="Report Group"
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="detailsPageWrapper">
          <div
            className="arrowInDetailsPage"
            onClick={() => {
              props.hide();
            }}
          >
            <ArrowBackIcon />
          </div>
          <div className="image detailsContainer">
            <img src={pfp} alt="Profile image" />
            <h1>{name}</h1>
            <p>{username}</p>
            <p>{about}</p>
          </div>
          <div className="users">
            <div className="buttons">
              <Button
                theme="gradient"
                submit={() => {
                  setConfirmMessage(
                    "Are you sure you want to Delete this chat ?"
                  );
                  setShowConfirm(true);
                  setfnc("deleteChat");
                  setShowdrop(false);
                }}
                text="Delete chat"
              />
              <Button
                theme="dark"
                submit={() => {
                  setConfirmMessage(
                    "Are you sure you want to report this user ?"
                  );
                  setShowConfirm(true);
                  setfnc("ReportUser");
                  setShowdrop(false);
                }}
                text="Report user"
              />
            </div>
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
