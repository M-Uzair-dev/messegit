import React from "react";
import { useSelector } from "react-redux";

export default function Mainpage() {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <h1>username: {user.username}</h1>
      <h1>name: {user.name}</h1>
      <h1>about: {user.about}</h1>
      <h1>imageurl: {user.imageurl}</h1>
    </div>
  );
}
