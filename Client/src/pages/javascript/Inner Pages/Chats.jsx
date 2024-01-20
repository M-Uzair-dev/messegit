import React, { useEffect, useState } from "react";
import "../../css/innerpages.css";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import logo from "../../../images/transparentlogo.png";
import pfp from "../../../images/userpfp.jpg";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ChatCard from "../../../components/javascript/ChatCard";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";

export default function Chats(props) {
  const [data, setData] = useState([]);
  const [noChats, setNochats] = useState(false);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.user);
  useEffect(() => {
    const fetchData = async () => {
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
        console.log(result);

        if (result.message === "No chats found" || result.chats.length === 0) {
          setLoading(false);
          setNochats(true);
        } else {
          if (result.success === false) {
            throw new Error("An unexpected error occurred!");
          } else {
            setData(result.chats);
            setLoading(false);
          }
        }
      } catch (e) {
        setLoading(false);
        console.error(e);
      }
    };

    fetchData();
  }, [user.id]);

  return (
    <div className="leftMainContainer">
      <div className="LeftTopBar">
        <div className="InnerLeftTopBar">
          <img src={logo} alt="logo" />
          <div className="InnerLeftTopBarRight">
            <SettingsRoundedIcon titleAccess="Settings" className="settings" />
            <img
              src={pfp}
              alt="profile"
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
          <input placeholder="Search chats..." />
          <SearchRoundedIcon titleAccess="Search" />
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
      ) : (
        <div className="cards">
          {data.map((e) => {
            return (
              <ChatCard
                key={e._id}
                pfp={e.pfp || pfp}
                name={e.name || "User's name"}
                message={e.message || "Latest message"}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
