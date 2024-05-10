import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "rizzui"; // Removed Password import as it's not used
import "../styles/settings.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = (props) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    const userString = localStorage.getItem("user");
    if (!userString) {
      navigate("/");
    } else {
      const user = JSON.parse(userString);
      try {
        const res = await axios.get(
          `http://localhost:3637/auth/user/getUserById/${user._id}`
        );
        setUser(res.data);
        setUsername(res.data.username || "");
        setEmail(res.data.email || "");
        setPhone(res.data.phone || "");
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []); // Removed 'navigate' from the dependency array since it's not needed here

  const onButtonClick = async () => {
    setLoading(true);
    setEmailError("");
    setUsernameError("");
    setPhoneError("");

    let isValid = true;

    if (email === "") {
      setEmailError("Email is required");
      isValid = false;
    }
    if (username === "") {
      setUsernameError("Username is required");
      isValid = false;
    }
    if (phone === "" || !/^\d+$/.test(phone)) {
      setPhoneError("Phone is required in the digits format");
      isValid = false;
    }

    if (isValid) {
      try {
        const res = await axios.put(
          `http://localhost:3637/auth/user/${user._id}`,
          {
            email,
            username,
            phone,
          }
        );
        fetchUserDetails();
        toast.success("User details updated successfully!", {
          position: "top-right",
          icon: "🚀",
        });
      } catch (err) {
        console.error("Error updating user:", err);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false); // Reset loading state if form is invalid
    }
  };

  return (
    <div className="Settings-container">
      <form className="form">
        <h1 className="title">Settings</h1>
        <div className="row-input">
          <Input
            type="username"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameError("");
            }}
            error={usernameError}
          />
        </div>
        <div className="row-input">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            error={emailError}
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
        <Button
          label="Save Changes"
          onClick={onButtonClick}
          loading={loading}
          disabled={loading}
          className="row-input"
        >
          Save Changes
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Settings;
