import React, { useState } from "react";
import logo from "../../images/logo.PNG";
import "../css/mainpage.css";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

export default function Load() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [cookies, removeCookie] = useCookies(["jwt"]);
  useEffect(() => {
    try {
      if (!cookies.jwt) {
        navigate("/login");
        setLoaded(true);
      } else {
        setLoaded(true);
        if (id) navigate(`/chats/${id}`);
        else navigate("/chats");
      }
    } catch (err) {}
  }, []);
  return (
    <>
      {loaded ? (
        <Outlet />
      ) : (
        <div className="loadingpage">
          <div className="logoDiv"></div>
        </div>
      )}
    </>
  );
}
