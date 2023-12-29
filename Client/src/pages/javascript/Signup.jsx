import React, { useState } from "react";
import Input from "../../components/javascript/Input";
import Button from "../../components/javascript/Button";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.PNG";

const Signup = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  let submit = () => {
    console.log(data);
  };
  const navigate = useNavigate();
  return (
    <div>
      <div className="maincont">
        <section className="leftcont">
          <img src={logo} alt="Logo" className="mobilelogo" />
          <div className="welcomediv">
            <h1>Sign up</h1>
            <p>Create your messegit account</p>
          </div>
          <div className="inputdiv">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              value={data.email}
              onchange={handleChange}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={data.password}
              onchange={handleChange}
            />
          </div>
          <div className="remembermediv">
            <input type="checkbox" /> <label>Remember me ?</label>
            <p>Need Help ?</p>
          </div>
          <div className="buttonsdiv">
            <Button dark="yes" text="Signup" submit={submit} />
            <Button text="Continue with Google" />
          </div>
          <div className="leftlastdiv">
            <p>
              Already have an account ?{" "}
              <span
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log in
              </span>
            </p>
          </div>
        </section>
        <section className="rightcont">
          <img src={logo} alt="Logo" className="logo" />
          <h1>MESSEGIT</h1>
          <p className="textbody">
            Built by Uzair Manan, Messegit is a secure and privacy-focused
            communication platform. With its modern interface, connect with
            friends and family through text-based messaging without sharing
            phone numbers. Whether staying in touch globally or chatting
            privately, Meggegit provides a reliable and efficient alternative.
          </p>
          <div className="dots">
            <div className="line"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Signup;
