import React, { useEffect, useState } from "react";
import Input from "../../../components/javascript/Input";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChatCard from "../../../components/javascript/ChatCard";
import pfp from "../../../images/defaultpic.jpg";
import "../../css/pages.css";
import { TailSpin } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Confirm from "./Confirm";

export default function SearchUser(props) {
  const [data, setData] = useState([]);
  const [noresults, setNoresults] = useState(true);
  const [loading, setLoading] = useState(true);
  const [inputval, setInputval] = useState("");
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const refresh = localStorage.getItem("refresh");
  const { enqueueSnackbar } = useSnackbar();
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [fnc, setfnc] = useState("");

  const createChat = async (id) => {
    try {
      const res = await fetch("https://messegitapi.vercel.app/chats/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          member1: id,
          member2: user.id,
          userId: user.id,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      if (data.data && data.success === true) {
        const redirectUrl = String(data.data.chatId);
        if (refresh === "true") localStorage.setItem("refresh", false);
        else localStorage.setItem("refresh", true);
        navigate(`/chats/${redirectUrl}`);
        if (data.existed) {
          enqueueSnackbar("Chat exists.", { variant: "success" });
        } else {
          enqueueSnackbar("Chat added.", { variant: "success" });
        }

        props.off();
      }
    } catch (e) {
      console.error(e);
      enqueueSnackbar("An error occured.", { variant: "error" });
    }
  };

  useEffect(() => {
    if (inputval === "") {
      setNoresults(true);
      return;
    }
    setNoresults(false);
    const fetchData = async () => {
      try {
        const res = await fetch("https://messegitapi.vercel.app/auth/find", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: inputval,
            usersname: user.username,
            userId: user.id,
          }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const result = await res.json();

        if (result.NoUser) {
          setNoresults(true);
          setData([]);
          setLoading(false);
          return;
        }
        setData(result.users);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.error(e);
      }
    };

    fetchData();
  }, [inputval]);

  return (
    <div
      className="SearchUserDiv"
      style={props.display === true ? { display: "flex" } : { display: "none" }}
    >
      <ArrowBackIcon
        className="backarrow"
        onClick={() => {
          props.off();
        }}
      />
      <h1 className="heading">Search User</h1>
      <div className="inputDiv">
        <Input
          label="Search"
          value={inputval}
          onchange={(e) => {
            setInputval(e.target.value);
          }}
          placeholder="Search users to chat with..."
          type="text"
          id="text"
          baseColor="#f0f0f0"
          search="true"
        />
      </div>
      <div className="cards">
        {noresults ? (
          <p className="noresults">No results found.</p>
        ) : loading ? (
          <div className="LoaderContainer">
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
        ) : (
          data.map((e) => (
            <ChatCard
              key={e._id}
              pfp={e.imageurl || pfp}
              name={e.username || "User's name"}
              message={""}
              nowrap={true}
              onclick={() => {
                setConfirmMessage(
                  `Are you sure you want to start a chat with ${e.username}`
                );
                setfnc(String(e._id));
                setShowConfirm(true);
              }}
            />
          ))
        )}
      </div>
      {
        <Confirm
          visible={showConfirm}
          hide={() => {
            setShowConfirm(false);
          }}
          message={confirmMessage}
          yes={() => {
            setShowConfirm(false);
            createChat(fnc);
          }}
        />
      }
    </div>
  );
}
