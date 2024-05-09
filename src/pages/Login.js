import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Password } from "rizzui";
import "../styles/login.css";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const navigate = useNavigate();

  const onButtonClick = () => {
    if (email === "") {
      setEmailError("Email is required");
    }
    if (password === "") {
      setPasswordError("Password is required");
    }
    if (email !== "" && password !== "") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard");
      }, 2000);
    }
  };

  return (
    <div className="login-container">
      <form className="form">
        <h1 className="title">Login</h1>
        <div className="row-input">
          {" "}
          {/* Add margin classes here */}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            error={emailError}
          />
        </div>
        <div className="row-input">
          {" "}
          <Password
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
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
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
