import React, { useState } from "react";
import Input from "../../../components/javascript/Input";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import pfp from "../../../images/defaultpic.jpg";
import "../../css/pages.css";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/javascript/Button";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { setUser } from "../../../Redux/Features/userSlice";
import { useSnackbar } from "notistack";
import firebase from "firebase/compat/app";
import { TailSpin } from "react-loader-spinner";
import "firebase/compat/storage";

export default function Profilepage(props) {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState(user.name || "");
  const [username, setUsername] = useState(user.username || "");
  const [about, setAbout] = useState(user.about || "");
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [pfploading, setPfploading] = useState(false);

  let uploadimg = async (event) => {
    setLoading(true);
    try {
      const selectedFile = event.target.files[0];

      if (!selectedFile) {
        enqueueSnackbar("No files selected", {
          variant: "error",
        });
        setLoading(false);
        return;
      }

      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(selectedFile.type)) {
        enqueueSnackbar("Invalid file type. Only png and jpg are allowed.", {
          variant: "error",
        });
        setLoading(false);
        return;
      }

      const maxFileSize = 5 * 1024 * 1024;
      if (selectedFile.size > maxFileSize) {
        enqueueSnackbar("Image cannot be larger than 5MB", {
          variant: "error",
        });
        setLoading(false);
        return;
      }

      const uniqueFilename = `${Date.now()}_${selectedFile.name}`;

      const storageRef = firebase.storage().ref("images");
      const fileRef = storageRef.child(uniqueFilename);

      const fileReader = new FileReader();
      fileReader.readAsDataURL(selectedFile);
      fileReader.onload = () => {
        fileRef.putString(fileReader.result, "data_url").then((snapshot) => {
          snapshot.ref.getDownloadURL().then(async (url) => {
            let res = await fetch(
              "https://messegitapi.vercel.app/auth/update",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  updatedFields: {
                    imageurl: url,
                  },
                  id: user.id,
                }),
              }
            );
            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            }
            let result = await res.json();
            if (result.success === false) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            } else {
              let temp = {
                name: result.user.name,
                username: result.user.username,
                id: result.user._id,
                about: result.user.about,
                imageurl: result.user.imageurl,
              };
              dispatch(setUser(temp));
              enqueueSnackbar("Image uploaded Successfully.", {
                variant: "success",
              });
              setLoading(false);
            }
          });
        });
      };
    } catch (error) {
      enqueueSnackbar("An error occured :-(", {
        variant: "error",
      });
      setLoading(false);
    }
  };

  let saveUser = async () => {
    setLoading(true);
    try {
      let res = await fetch("https://messegitapi.vercel.app/auth/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          updatedFields: {
            name,
            username,
            about,
          },
          id: user.id,
        }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      let result = await res.json();
      if (result.success === false) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      } else {
        let temp = {
          name: result.user.name,
          username: result.user.username,
          id: result.user._id,
          about: result.user.about,
        };
        dispatch(setUser(temp));
        enqueueSnackbar("Profile Updated Successfully.", {
          variant: "success",
        });
        setLoading(false);
      }
    } catch (err) {
      enqueueSnackbar(err, { variant: "error" });
      setLoading(false);
    }
  };
  return (
    <div
      className="createGroupDiv"
      style={props.display === true ? { display: "flex" } : { display: "none" }}
    >
      <ArrowBackIcon
        className="backarrow"
        onClick={() => {
          props.off();
        }}
      />
      <h1 className="heading">Profile</h1>
      <div className="pfpcont">
        <img
          src={user.imageurl || pfp}
          alt="profile Image"
          className="profileimage"
        />
        <div className="hover">
          {loading ? (
            <TailSpin
              visible={true}
              height="30"
              width="30"
              color="white"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            <CameraAltOutlinedIcon />
          )}
          <input
            type="file"
            onChange={(e) => {
              uploadimg(e);
            }}
          />
        </div>
      </div>
      <div className="inputDiv profileinputdiv">
        <Input
          label="Name"
          value={name}
          onchange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Your Name"
          type="text"
          id="text"
          baseColor="#f0f0f0"
          margin="low"
        />
        <Input
          label="Username"
          value={username}
          onchange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Your Username"
          type="text"
          id="text"
          baseColor="#f0f0f0"
          margin="low"
        />
        <Input
          label="About"
          value={about}
          margin="low"
          onchange={(e) => {
            setAbout(e.target.value);
          }}
          placeholder="About you."
          type="text"
          id="text"
          baseColor="#f0f0f0"
          textarea="yes"
        />
      </div>

      <div className="buttonDiv">
        {name === user.name &&
        username === user.username &&
        about === user.about ? (
          <Button
            text="Save"
            theme="light"
            submit={() => {}}
            loading={loading}
          />
        ) : (
          <Button
            text="Save"
            theme="dark"
            submit={() => {
              saveUser();
            }}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
