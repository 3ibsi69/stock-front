import React, { useState } from "react";
import { Button, Modal, Space } from "antd";
import { Input } from "rizzui";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/modal.css";

const ModalComp = ({ onResponseData }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [designation, setDesignation] = useState("");
  const [designationError, setDesignationError] = useState("");
  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [prixAchatHt, setPrixAchatHt] = useState("");
  const [prixAchatHtError, setPrixAchatHtError] = useState("");
  const [prixVenteHt, setPrixVenteHt] = useState("");
  const [prixVenteHtError, setPrixVenteHtError] = useState("");
  const [margeHt, setMargeHt] = useState("");
  const [margeHtError, setMargeHtError] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    try {
      if (name === "") {
        setNameError("Name is required");
      }
      if (category === "") {
        setCategoryError("Category is required");
      }
      if (prixAchatHt === "") {
        setPrixAchatHtError("Price is required");
      }
      if (prixVenteHt === "") {
        setPrixVenteHtError("Price is required");
      }
      if (quantity === "") {
        setQuantityError("Quantity is required");
      }
      if (code === "") {
        setCodeError("Code is required");
      }
      if (designation === "") {
        setDesignationError("Designation is required");
      }
      if (margeHt === "") {
        setMargeHtError("Marge is required");
      }

      if (prixAchatHt !== "" && !/^\d+$/.test(prixAchatHt)) {
        setPrixAchatHtError("Price must be a number");
      }
      if (prixVenteHt !== "" && !/^\d+$/.test(prixVenteHt)) {
        setPrixVenteHtError("Price must be a number");
      }
      if (quantity !== "" && !/^\d+$/.test(quantity)) {
        setQuantityError("Quantity must be a number");
      }
      if (margeHt !== "" && !/^\d+$/.test(margeHt)) {
        setMargeHtError("Marge must be a number");
      }

      if (
        name !== "" &&
        category !== "" &&
        prixAchatHt !== "" &&
        prixVenteHt !== "" &&
        quantity !== "" &&
        /^\d+$/.test(prixAchatHt) &&
        /^\d+$/.test(prixVenteHt) &&
        /^\d+$/.test(quantity) &&
        code !== "" &&
        designation !== "" &&
        margeHt !== "" &&
        /^\d+$/.test(margeHt)
      ) {
        setLoading(true);
        axios
          .post("http://localhost:3637/stock/create", {
            name: name,
            code: code,
            designation: designation,
            category: category,
            prixAchatHT: prixAchatHt,
            prixVenteHT: prixVenteHt,
            MargeHT: margeHt,
            quantite: quantity,
          })
          .then((res) => {
            if (res.data.message === "Code already exist") {
              setLoading(false);
              setCodeError("Code already exist");
              return;
            }
            setLoading(false);
            onResponseData(res.data);
            setOpen(false);
            setName("");
            setCategory("");
            setPrixAchatHt("");
            setPrixVenteHt("");
            setQuantity("");
            setCode("");
            setMargeHt("");
            setDesignation("");
            toast.success("Stock added successfully");
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Space>
        <Button type="primary" onClick={showModal}>
          Add Stock
        </Button>
      </Space>
      <Modal
        open={open}
        title="Create a new stock"
        onOk={handleOk}
        okText="Save"
        loading={loading}
        onCancel={handleCancel}
      >
        <div className="row">
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError("");
            }}
            error={nameError}
          />
        </div>
        <div className="row">
          <Input
            placeholder="Code"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setCodeError("");
            }}
            error={codeError}
          />
        </div>
        <div className="row">
          <Input
            placeholder="Designation"
            value={designation}
            onChange={(e) => {
              setDesignation(e.target.value);
              setDesignationError("");
            }}
            error={designationError}
          />
        </div>
        <div className="row">
          <Input
            placeholder="Category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setCategoryError("");
            }}
            error={categoryError}
          />
        </div>
        <div className="row">
          <Input
            placeholder="Price Achat Ht"
            value={prixAchatHt}
            onChange={(e) => {
              setPrixAchatHt(e.target.value);
              setPrixAchatHtError("");
            }}
            error={prixAchatHtError}
          />
        </div>
        <div className="row">
          <Input
            placeholder="Price Vente Ht"
            value={prixVenteHt}
            onChange={(e) => {
              setPrixVenteHt(e.target.value);
              setPrixVenteHtError("");
            }}
            error={prixVenteHtError}
          />
        </div>
        <div className="row">
          <Input
            placeholder="Marge Ht"
            value={margeHt}
            onChange={(e) => {
              setMargeHt(e.target.value);
              setMargeHtError("");
            }}
            error={margeHtError}
          />
        </div>

        <div className="row">
          <Input
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
              setQuantityError("");
            }}
            error={quantityError}
          />
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ModalComp;
