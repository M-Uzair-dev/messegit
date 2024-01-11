import React, { useState } from "react";
import logo from "../../images/logo.PNG";
import "../css/mainpage.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

export default function Load() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [cookies, removeCookie] = useCookies(["jwt"]);
  useEffect(() => {
    try {
      if (!cookies.jwt) {
        navigate("/login");
        setLoaded(true);
      } else {
        setTimeout(() => {}, 3000);
        navigate("/chats");
        setLoaded(true);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <>
      {loaded ? (
        <Outlet />
      ) : (
        <div className="loadingpage">
          <div className="logoDiv">
            <img src={logo} alt="Logo" />
          </div>
        </div>
      )}
    </>
  );
}
