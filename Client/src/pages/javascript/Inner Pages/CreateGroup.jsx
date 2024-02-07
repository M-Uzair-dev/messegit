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
import Button from "../../../components/javascript/Button";
import tick from "../../../images/tick.png";
import Confirm from "./Confirm";

export default function CreateGroup(props) {
  const [data, setData] = useState([]);
  const [noresults, setNoresults] = useState(true);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [disabled, setdisabled] = useState(true);
  const [inputval, setInputval] = useState("");
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const refresh = localStorage.getItem("refresh");
  const { enqueueSnackbar } = useSnackbar();
  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");

  const addUser = (user) => {
    const user_id = user._id;

    const newMembers = members.includes(user_id)
      ? members.filter((item) => item !== user_id)
      : [...members, user_id];

    const newUsers = users.includes(user)
      ? users.filter((item) => item._id !== user_id)
      : [...users, user];

    setMembers(newMembers);
    setUsers(newUsers);
  };

  const createGroup = async () => {
    try {
      const res = await fetch("https://messegitapi.vercel.app/chats/newgroup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          members: members,
          name: name,
          userID: user.id,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      if (data.chatId && data.success === true) {
        const redirectUrl = String(data.chatId);
        if (refresh === "true") localStorage.setItem("refresh", false);
        else localStorage.setItem("refresh", true);
        navigate(`/chats/${redirectUrl}`);
        enqueueSnackbar("Group created.", { variant: "success" });
        props.off();
      }
    } catch (e) {
      enqueueSnackbar("An error occured.", { variant: "error" });
    }
  };

  useEffect(() => {
    if (inputval === "") {
      if (users.length === 0) {
        setNoresults(true);
        setData([]);
        setUsers([]);
        setMembers([]);
        return;
      } else {
        setNoresults(false);
        setData(users);
        return;
      }
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
      <h1 className="heading">Create a Group</h1>
      <div className="inputDiv">
        <Input
          label="Name"
          value={name}
          onchange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Enter group's name"
          type="text"
          id="text"
          baseColor="#f0f0f0"
          search="true"
        />
        <Input
          label="Search"
          value={inputval}
          onchange={(e) => {
            setInputval(e.target.value);
          }}
          placeholder="Add users to group"
          type="text"
          id="text"
          baseColor="#f0f0f0"
          search="true"
        />
      </div>
      <div className="cards groupcards">
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
          data.map((e) =>
            e.length === 0 ? (
              <></>
            ) : (
              <ChatCard
                key={e._id}
                pfp={e.imageurl || pfp}
                selected={members.includes(e._id)}
                name={e.username || "User's name"}
                message={""}
                nowrap={true}
                onclick={() => {
                  addUser(e);
                }}
              />
            )
          )
        )}
      </div>
      <div className="buttonDiv">
        {members.length === 0 || name === "" ? (
          <Button theme="light" submit={() => {}} text="Create group" />
        ) : (
          <Button
            theme="gradient"
            submit={() => {
              setShowConfirm(true);
              setConfirmMessage("Are you sure you want to make this group ?");
            }}
            text="Create group"
          />
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
            createGroup();
          }}
        />
      }
    </div>
  );
}
