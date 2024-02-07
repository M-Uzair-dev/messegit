import React from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/Features/userSlice";

export default function Protected() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let id = localStorage.getItem("id");

  useEffect(() => {
    const validate = async () => {
      try {
        if (!id) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          "https://messegitapi.vercel.app/auth/validate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id,
            }),
          }
        );

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();
        console.log(data);
        if (!data.status) {
          navigate("/login");
          localStorage.removeItem("id");
        }
        let temp = {
          name: data.user.name,
          username: data.user.username,
          id: data.user._id,
          imageurl: data.user.imageurl,
          about: data.user.about,
          img: data.user.privacy.img,
          chat: data.user.privacy.chat,
        };
        dispatch(setUser(temp));
      } catch (error) {
        console.log(error);
        removeCookie("jwt");
        navigate("/login");
      }
    };

    validate();
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
}
