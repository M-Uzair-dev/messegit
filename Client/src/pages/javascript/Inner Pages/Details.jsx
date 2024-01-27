import "../../css/details.css";
import pfp from "../../../images/userpfp.jpg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChatCard from "../../../components/javascript/ChatCard";
import Button from "../../../components/javascript/Button";
import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

export default function Details(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);
  const user = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState(false);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [username, setUsername] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [admin, setAdmin] = useState(false);

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
        console.log(result);

        if (result.success === false) {
          navigate("/chats");
          return;
        } else {
          if (result.group) {
            setGroup(true);
            setUsers(result.details.members);
            setImageurl(result.details.imageurl);
            setName(result.details.name);
            setAdmin(result.details.admin === user.id);
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

  return (
    <div
      className="DetailsPage"
      style={props.visible ? { display: "block" } : { display: "none" }}
    >
      {loading ? (
        <>loading</>
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
                  key={e._id}
                  pfp={e.imageur || pfp}
                  name={e.name}
                  id={""}
                  onclick={() => {}}
                  username={e.username}
                />
              );
            })}
            {admin ? (
              <div className="buttons">
                <Button
                  theme="gradient"
                  submit={() => {}}
                  text="Manage Users"
                />
                <Button theme="dark" submit={() => {}} text="Delete Group" />
              </div>
            ) : (
              <div className="buttons">
                <Button theme="gradient" submit={() => {}} text="Exit Group" />
                <Button theme="dark" submit={() => {}} text="Report Group" />
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
              <Button theme="gradient" submit={() => {}} text="Delete chat" />
              <Button theme="dark" submit={() => {}} text="Report user" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
