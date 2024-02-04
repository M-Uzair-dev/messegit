import React, { useEffect, useState } from "react";
import "../../css/innerpages.css";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import logo from "../../../images/transparentlogo.png";
import pfp from "../../../images/defaultpic.jpg";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ChatCard from "../../../components/javascript/ChatCard";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";

export default function Chats(props) {
  //------------------------------- Variables and Hooks --------------------------------------------

  const navigate = useNavigate();
  let refresh = localStorage.getItem("refresh");
  const user = useSelector((state) => state.user);
  const { id } = useParams();

  //------------------------------- States --------------------------------------------

  const [data, setData] = useState([]);
  const [permanetData, setPermanetData] = useState([]);
  const [noChats, setNochats] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  //------------------------------- UseEffect --------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      setNochats(false);
      try {
        if (!user.id) return;

        const res = await fetch("http://localhost:5000/chats/get", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: user.id,
          }),
        });
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const result = await res.json();

        if (result.message === "No chats found" || result.chats.length === 0) {
          setLoading(false);
          setNochats(true);
        } else {
          if (result.success === false) {
            throw new Error("An unexpected error occurred!");
          } else {
            console.log(result);
            let updated = await result.chats.map((chat) => {
              let updatedData = chat.data.filter(
                (userObj) => userObj.id !== user.id
              );
              return { ...chat, data: updatedData };
            });

            setData(updated);
            setPermanetData(updated);
            setLoading(false);
          }
        }
      } catch (e) {
        setLoading(false);
        console.error(e);
      }
    };

    fetchData();
  }, [user.id, refresh]);

  let search = () => {
    setLoading(true);

    let tempData = permanetData.filter((e) => {
      if (e.data.length !== 0) {
        return e.data.some((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else {
        return e.name.toLowerCase().includes(searchTerm.toLowerCase());
      }
    });

    setData(tempData);
    setLoading(false);
  };

  //------------------------------- JSX --------------------------------------------

  return (
    <div className={id ? "leftMainContainer hide" : "leftMainContainer"}>
      <div className="LeftTopBar">
        <div className="InnerLeftTopBar">
          <img src={logo} alt="logo" />
          <div className="InnerLeftTopBarRight">
            <SettingsRoundedIcon
              titleAccess="Settings"
              className="settings"
              onClick={() => {
                props.settings();
              }}
            />
            <img
              src={user.imageurl || pfp}
              onClick={() => {
                props.showprofilepage();
              }}
            />
          </div>
        </div>
      </div>
      <div className="optionbar">
        <div
          className="addbuttondiv"
          onClick={() => {
            props.showadddiv();
          }}
        >
          <AddRoundedIcon titleAccess="Add new chat" />
        </div>
        <div className="searchChatsDiv">
          <input
            placeholder="Search chats..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <SearchRoundedIcon
            titleAccess="Search"
            onClick={() => {
              search();
            }}
          />
        </div>
      </div>
      {loading ? (
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
      ) : noChats ? (
        <>
          <p className="noresults">
            No Chats yet.
            <br /> Please{" "}
            <a
              className="link"
              onClick={() => {
                props.showadddiv();
              }}
            >
              Add Chat
            </a>{" "}
            to start chatting.
          </p>
        </>
      ) : (
        <div className="cards">
          {data.map((e) => {
            return e.isGroup ? (
              <ChatCard
                key={e._id}
                date={e.updatedAt}
                pfp={e.imageurl || pfp}
                name={e.name || "User's name"}
                ChatId={e._id}
                onclick={() => {
                  props.hidedetailspage();
                  navigate(`/chats/${e._id}`);
                }}
                isGroup={true}
              />
            ) : (
              <ChatCard
                key={e._id}
                date={e.updatedAt}
                pfp={e.data[0].imageurl || pfp}
                name={e.data[0].name || "User's name"}
                ChatId={e._id}
                onclick={() => {
                  props.hidedetailspage();
                  navigate(`/chats/${e._id}`);
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
