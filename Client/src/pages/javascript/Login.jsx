import React from "react";
import Input from "../../components/javascript/Input";
import Button from "../../components/javascript/Button";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.PNG";
import "../css/auth.css";

const Login = () => {
  const navigate = useNavigate();
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
            <Input label="Email" placeholder="Enter your email" type="email" />
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
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
            <Button text="Login" dark="yes" />
            <Button text="Continue with Google" />
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
          <div className="line"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </section>
    </div>
  );
};

export default Login;
