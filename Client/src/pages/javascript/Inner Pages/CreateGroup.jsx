import React, { useEffect, useState } from "react";
import Input from "../../../components/javascript/Input";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChatCard from "../../../components/javascript/ChatCard";
import pfp from "../../../images/userpfp.jpg";
import "../../css/pages.css";
import { TailSpin } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Button from "../../../components/javascript/Button";
import tick from "../../../images/tick.png";

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

  const addUser = (user) => {
    if (members.includes(user._id)) {
      let newmembers = members.filter((item) => item !== user._id);
      setMembers(newmembers);
    } else {
      setMembers([...members, user._id]);
    }

    if (users.length === 0) {
      setUsers([user]);
    } else {
      setUsers([...users, user]);
    }
  };

  const createGroup = async (id) => {
    try {
      const res = await fetch("http://localhost:5000/chats/newgroup", {
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
        return;
      } else {
        setData(users);
        return;
      }
    }
    setNoresults(false);
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/find", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: inputval,
            usersname: user.username,
          }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const result = await res.json();

        if (result.NoUser) {
          if (!users || users.length === 0) {
            setNoresults(true);
          } else {
            setData(users);
          }
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
                pfp={members.includes(e._id) ? tick : e.imageurl || pfp}
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
              createGroup();
            }}
            text="Create group"
          />
        )}
      </div>
    </div>
  );
}
