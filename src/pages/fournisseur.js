import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "rizzui"; // Removed Password import as it's not used
import "../styles/fournisseur.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Fournisseur = (props) => {
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [adresse, setAddresse] = useState("");
  const [adresseError, setAddresseError] = useState("");
  const [matriculeF, setMatriculeF] = useState("");
  const [matriculeFError, setMatriculeFError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const User = JSON.parse(localStorage.getItem("user"));
    if (!User) {
      navigate("/");
    }
  }, [navigate]);
  const onButtonClick = async () => {
    try {
      if (name === "") {
        setNameError("Name is required");
        return;
      }
      if (adresse === "") {
        setAddresseError("Adresse is required");
        return;
      }
      if (matriculeF === "") {
        setMatriculeFError("Matricule Fiscale is required");
        return;
      }
      if (
        phone === "" ||
        phone.trim() === "" ||
        (phone && !/^\d+$/.test(phone))
      ) {
        setPhoneError("Phone is required in digits");
        return;
      }
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3637/fournisseur/create",
        {
          name: name,
          phone: phone,
          adresse: adresse,
          matriculeFiscale: matriculeF,
        }
      );
      setLoading(false);
      if (response.status === 200) {
        toast.success("Fournisseur added successfully");
        setName("");
        setPhone("");
        setAddresse("");
        setMatriculeF("");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("Failed to add Fournisseur");
    }
  };

  return (
    <div className="Fournisseur-container">
      <form className="form">
        <h1 className="title">Fournisseur</h1>
        <div className="row-input">
          <Input
            type="name"
            placeholder="Enter The Fournisseur name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError("");
            }}
            error={nameError}
          />
        </div>
        <div className="row-input">
          <Input
            type="adresse"
            placeholder="Adresse"
            value={adresse}
            onChange={(e) => {
              setAddresse(e.target.value);
              setAddresseError("");
            }}
            error={adresseError}
          />
        </div>
        <div className="row-input">
          <Input
            type="matriculeF"
            placeholder="Matricule Fiscale"
            value={matriculeF}
            onChange={(e) => {
              setMatriculeF(e.target.value);
              setMatriculeFError("");
            }}
            error={matriculeFError}
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
          label="Save"
          onClick={onButtonClick}
          loading={loading}
          disabled={loading}
          className="row-input"
        >
          Save
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Fournisseur;
