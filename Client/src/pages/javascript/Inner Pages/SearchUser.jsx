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

export default function SearchUser(props) {
  const [data, setData] = useState([]);
  const [noresults, setNoresults] = useState(true);
  const [loading, setLoading] = useState(true);
  const [inputval, setInputval] = useState("");
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const refresh = localStorage.getItem("refresh");
  const { enqueueSnackbar } = useSnackbar();

  const createChat = async (id) => {
    try {
      console.log("Function called");
      const res = await fetch("http://localhost:5000/chats/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          member1: id,
          member2: user.id,
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
        enqueueSnackbar("Chat added.", { variant: "success" });
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
          setNoresults(true);
          setData([]);
          setLoading(false);
          return;
        }
        console.log(result);
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
      <h1
        className="heading"
        onClick={() => {
          console.log(data);
        }}
      >
        Search User
      </h1>
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
              pfp={e.pfp || pfp}
              name={e.username || "User's name"}
              message={""}
              nowrap={true}
              onclick={() => {
                createChat(e._id);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
