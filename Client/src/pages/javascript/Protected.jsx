import React from "react";
import { Outlet } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/Features/userSlice";

export default function Protected() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [cookies, removeCookie] = useCookies(["jwt"]);

  useEffect(() => {
    const validate = async () => {
      console.log("Cookies Checked");
      try {
        if (!cookies.jwt) {
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:5000/auth/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();

        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        }
        let temp = {
          name: data.user.name,
          username: data.user.username,
          id: data.user._id,
          imageurl: data.user.imageUrl,
          about: data.user.about,
        };
        dispatch(setUser(temp));
        navigate("/chats");
      } catch (error) {
        removeCookie("jwt");
        navigate("/login");
      }
    };

    validate();
  }, [cookies]);

  return (
    <div>
      <Outlet />
    </div>
  );
}
