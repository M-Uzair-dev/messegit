import React, { useState } from "react";
import "../css/mainpage.css";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function Load() {
  const { id } = useParams();
  const userid = localStorage.getItem("id");
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      if (!userid) {
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
