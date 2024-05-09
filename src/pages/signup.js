import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Password } from "rizzui";
import "../styles/login.css";
import axios from "axios";
const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onButtonClick = async () => {
    if (email === "") {
      setEmailError("Email is required");
    }
    if (password === "") {
      setPasswordError("Password is required");
    }
    if (
      phone === "" ||
      phone.trim() === "" ||
      (phone && !/^\d+$/.test(phone))
    ) {
      setPhoneError("Phone number should in  digits");
    }

    if (
      email !== "" &&
      password !== "" &&
      phone !== "" &&
      /^\d+$/.test(phone)
    ) {
      await axios
        .post("http://localhost:3637/auth/user/signup", {
          email,
          password,
          phone,
          username,
        })
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/stock");
          } else {
            setError("Email already exists");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="login-container">
      <form className="form">
        <h1 className="title">Sign Up</h1>
        <div className="row-input">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            error={emailError || error}
          />
        </div>
        <div className="row-input">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="row-input">
          <Input
            type="phone"
            placeholder="Phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setPhoneError("");
            }}
            error={phoneError}
          />
        </div>

        <div className="row-input">
          <Password
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
            }}
            error={passwordError}
          />
        </div>

        <Button
          label="Login"
          onClick={onButtonClick}
          loading={loading}
          disabled={loading}
          className="row-input"
        >
          Login
        </Button>
        <p className="register">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Login</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
