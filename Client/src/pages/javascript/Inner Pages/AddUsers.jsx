import React from "react";
import "../../css/addusers.css";
import ChatCard from "../../../components/javascript/ChatCard";
import Button from "../../../components/javascript/Button";
import Input from "../../../components/javascript/Input";
import CloseIcon from "@mui/icons-material/Close";

export default function AddUsers() {
  return (
    <div className="addUsers">
      <div className="blur"></div>
      <div className="addcard">
        <div className="close">
          {" "}
          <CloseIcon />
        </div>
        <h1>Manage Users</h1>
        <div className="inputDivadd">
          <Input
            label="Search"
            // value={}
            onchange={(e) => {
              // setInputval(e.target.value);
            }}
            placeholder="search to add users"
            type="text"
            id="text"
            baseColor="rgb(230, 230, 230)"
            search="true"
          />
        </div>
        <div className="addpagecards">
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
        </div>
        <div className="butdiv">
          <Button
            theme="dark"
            submit={() => {
              setConfirmMessage("Are you sure you want to report this user ?");
              setShowConfirm(true);
              setfnc("ReportUser");
              setShowdrop(false);
            }}
            text="Save"
          />
        </div>
      </div>
    </div>
  );
}
