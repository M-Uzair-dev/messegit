import React, { useEffect, useState } from "react";
import Input from "../../components/javascript/Input";
import Button from "../../components/javascript/Button";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.PNG";
import "../css/auth.css";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const [data, setData] = useState({ email: "", password: "" });

  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const submit = async () => {
    try {
      if (data.email === "") {
        enqueueSnackbar("Email is required", { variant: "error" });
      } else if (data.password === "") {
        enqueueSnackbar("Password is required", { variant: "error" });
      } else {
        const response = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        });

        if (response.ok) {
          navigate("/");
        } else {
          enqueueSnackbar("Invalid Credentials", { variant: "error" });
        }
      }
    } catch (error) {
      enqueueSnackbar("An error occurred during login", { variant: "error" });
    }
  };

  return (
    <div className="maincont">
      <section className="leftcont">
        <img src={logo} alt="Logo" className="mobilelogo" />
        <div className="welcomediv">
          <h1>Welcome Back</h1>
          <p>Your contacts await you !</p>
        </div>
        <div>
          <div className="inputdiv">
            <Input
              label="Email"
              value={data.email}
              onchange={handleChange}
              placeholder="Enter your email"
              type="email"
              id="email"
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={data.password}
              onchange={handleChange}
              id="password"
            />
          </div>
          <div className="remembermediv">
            <div className="inneremember">
              <input type="checkbox" id="remember" />{" "}
              <label htmlFor="remember">Remember me ?</label>
            </div>
            <p>Forgot Password ?</p>
          </div>
        </div>
        <div>
          <div className="buttonsdiv">
            <Button text="Login" theme="dark" submit={submit} />
            <Button text="Continue with Google" theme="light" />
          </div>
          <div className="leftlastdiv">
            <p>
              Don't have an account ?{" "}
              <span
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </section>
      <section className="rightcont">
        <img src={logo} alt="Logo" className="logo" />
        <h1>MESSEGIT</h1>
        <p>
          Built by Uzair Manan, Messegit is a secure and privacy-focused
          communication platform. With its modern interface, connect with
          friends and family through text-based messaging without sharing phone
          numbers. Whether staying in touch globally or chatting privately,
          Meggegit provides a reliable and efficient alternative.
        </p>
        <div className="dots">
          <div
            className="line"
            onClick={() => {
              console.log(data);
            }}
          ></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </section>
    </div>
  );
};

export default Login;
