import React, { useEffect, useState } from "react";
import "../../css/addusers.css";
import ChatCard from "../../../components/javascript/ChatCard";
import Button from "../../../components/javascript/Button";
import Input from "../../../components/javascript/Input";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import tick from "../../../images/tick.png";
import { TailSpin } from "react-loader-spinner";
import { useSnackbar } from "notistack";

export default function AddUsers(props) {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [noresults, setNoresults] = useState(false);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [inputval, setInputval] = useState("");
  const { enqueueSnackbar } = useSnackbar();

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

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        if (!user.id || !id) return;

        const res = await fetch(
          "https://messegitapi.vercel.app/chats/details",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chatID: id,
              userID: user.id,
            }),
          }
        );
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const result = await res.json();

        if (result.success === false) {
          navigate("/chats");
          return;
        } else {
          let details = result.details;
          let arr = details.members.filter((e) => {
            return e._id !== user.id;
          });
          setData(arr);
          setUsers(arr);
          let IDs = arr.map((e) => e._id);
          setMembers(IDs);
        }
        setLoading(false);
        setUsersLoaded(true);
      } catch (e) {
        setLoading(false);
        navigate("/chats");
      }
    };

    fetchData();
  }, [props.visible]);

  useEffect(() => {
    if (!usersLoaded) return;
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

  let submit = async () => {
    try {
      const newMembers = [...members, user.id];
      if (members.length === 0) {
        enqueueSnackbar("Please select any users", { variant: "error" });
        return;
      }
      let res = await fetch("https://messegitapi.vercel.app/chats/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          members: newMembers,
        }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      let result = await res.json();
      if (!result.success) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      enqueueSnackbar("Users Updated Successfully", { variant: "success" });
      props.hide();
    } catch (e) {
      enqueueSnackbar("HTTP Error", { variant: "error" });
    }
  };

  return (
    <div className={props.visible ? "addUsers" : "addUsers hidden"}>
      <div
        className="blur"
        onClick={() => {
          props.hide();
        }}
      ></div>
      <div className="addcard">
        <div
          className="close"
          onClick={() => {
            props.hide();
          }}
        >
          {" "}
          <CloseIcon />
        </div>
        <h1>Manage Users</h1>
        <div className="inputDivadd">
          <Input
            label="Search"
            value={inputval}
            onchange={(e) => {
              setInputval(e.target.value);
            }}
            placeholder="search to add users"
            type="text"
            id="text"
            baseColor="rgb(230, 230, 230)"
            search="true"
          />
        </div>
        <div className="addpagecards">
          {loading ? (
            <div
              style={{
                width: "100%",
                height: "250px",
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
          ) : noresults ? (
            <div
              style={{
                width: "100%",
                height: "250px",
                display: "grid",
                placeItems: "center",
              }}
            >
              <p>No Users Found</p>
            </div>
          ) : (
            data.map((e) => {
              return (
                <ChatCard
                  key={e._id}
                  pfp={members.includes(e._id) ? tick : e.imageurl}
                  name={e.username || "User's name"}
                  id={e._id}
                  onclick={() => {
                    addUser(e);
                  }}
                />
              );
            })
          )}
        </div>
        <div className="butdiv">
          <Button
            theme="dark"
            submit={() => {
              submit();
            }}
            text="Save"
          />
        </div>
      </div>
    </div>
  );
}
