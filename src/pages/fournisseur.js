import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "rizzui"; // Removed Password import as it's not used
import "../styles/fournisseur.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Popover, Title, Text } from "rizzui";
import { TrashIcon } from "@heroicons/react/24/solid";

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
  const [fourssiseurs, setFournisseurs] = useState([]);

  const fetchFournisseurs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3637/fournisseur/getAll"
      );
      setFournisseurs(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const User = JSON.parse(localStorage.getItem("user"));
    if (!User) {
      navigate("/");
    } else {
      fetchFournisseurs();
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
        fetchFournisseurs();
        setAddresse("");
        setMatriculeF("");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("Failed to add Fournisseur");
    }
  };
  const deleteFourssiseur = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3637/fournisseur/delete/${id}`
      );
      if (response.status === 200) {
        toast.success("Fournisseur deleted successfully");
        fetchFournisseurs();
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete Fournisseur");
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
      <div className="Preview">
        <h1 className="title">Fournisseurs</h1>
        <div className="table">
          <div className="row">
            <div className="cell">Name</div>
            <div className="cell">Phone</div>
            <div className="cell">Adresse</div>
            <div className="cell">Matricule Fiscale</div>
            <div className="cell">Action</div>
          </div>
          {fourssiseurs.map((fournisseur) => (
            <div className="row" key={fournisseur._id}>
              <div className="cell">{fournisseur.name}</div>
              <div className="cell">{fournisseur.phone}</div>
              <div className="cell">{fournisseur.adresse}</div>
              <div className="cell">{fournisseur.matriculeFiscale}</div>
              <div className="cell">
                <Popover>
                  <Popover.Trigger>
                    <Button variant="outline" color="danger">
                      <TrashIcon className="w-5 h-auto" />
                    </Button>
                  </Popover.Trigger>
                  <Popover.Content>
                    {({ setOpen }) => (
                      <div className="w-56">
                        <Title as="h6">Delete the Fournisseur</Title>
                        <Text>
                          Are you sure you want to delete the Fournisseur?
                        </Text>
                        <div className="flex justify-end gap-3 mb-1">
                          <Button size="sm" variant="outline">
                            No
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => {
                              deleteFourssiseur(fournisseur._id);
                              setOpen(false);
                            }}
                          >
                            Yes
                          </Button>
                        </div>
                      </div>
                    )}
                  </Popover.Content>
                </Popover>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Fournisseur;
