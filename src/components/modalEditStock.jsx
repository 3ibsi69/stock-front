import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { Input } from "rizzui";
import axios from "axios";
import "../styles/modal.css";
import "react-toastify/dist/ReactToastify.css";

const ModalCompEdit = ({
  product,
  onResponseData,
  open,
  handleCancel,
  setOpen,
}) => {
  const [name, setName] = useState(product.name || "");
  const [nameError, setNameError] = useState("");
  const [code, setCode] = useState(product.code || "");
  const [codeError, setCodeError] = useState("");
  const [designation, setDesignation] = useState(product.designation || "");
  const [designationError, setDesignationError] = useState("");
  const [category, setCategory] = useState(product.category || "");
  const [categoryError, setCategoryError] = useState("");
  const [prixAchatHt, setPrixAchatHt] = useState(product.prixAchatHT || "");
  const [prixAchatHtError, setPrixAchatHtError] = useState("");
  const [prixVenteHt, setPrixVenteHt] = useState(product.prixVenteHT || "");
  const [prixVenteHtError, setPrixVenteHtError] = useState("");
  const [margeHt, setMargeHt] = useState(product.MargeHT || "");
  const [margeHtError, setMargeHtError] = useState("");
  const [quantity, setQuantity] = useState(product.quantite || "");
  const [quantityError, setQuantityError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setCode(product.code || "");
      setDesignation(product.designation || "");
      setCategory(product.category || "");
      setPrixAchatHt(product.prixAchatHT || "");
      setPrixVenteHt(product.prixVenteHT || "");
      setMargeHt(product.MargeHT || "");
      setQuantity(product.quantite || "");
    }
  }, [product]);
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

      if (
        name !== "" &&
        category !== "" &&
        prixAchatHt !== "" &&
        prixVenteHt !== "" &&
        quantity !== "" &&
        /^\d+$/.test(prixAchatHt) &&
        /^\d+$/.test(prixVenteHt) &&
        /^\d+$/.test(quantity)
      ) {
        setLoading(true);
        axios
          .put(`http://localhost:3637/stock/update/${product._id}`, {
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
            setLoading(false);
            onResponseData(res.data);
            setOpen(false);
            setName(res.data.name);
            setCode(res.data.code);
            setDesignation(res.data.designation);
            setCategory(res.data.category);
            setPrixAchatHt(res.data.prixAchatHt);
            setPrixVenteHt(res.data.prixVenteHt);
            setQuantity(res.data.quantity);
            setMargeHt(res.data.margeHt);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal
        visible={open}
        title="Edit Product"
        onOk={handleOk}
        okText="Edit"
        confirmLoading={loading}
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
    </>
  );
};

export default ModalCompEdit;
