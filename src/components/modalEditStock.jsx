import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { Input } from "rizzui";
import axios from "axios";
import "../styles/modal.css";

const ModalCompEdit = ({
  product,
  onResponseData,
  open,
  handleCancel,
  setOpen,
}) => {
  const [name, setName] = useState(product.name || "");
  const [price, setPrice] = useState(product.price || "");
  const [category, setCategory] = useState(product.category || "");
  const [quantity, setQuantity] = useState(product.quantity || "");
  const [nameError, setNameError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.price || "");
      setCategory(product.category || "");
      setQuantity(product.quantity || "");
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
      if (price === "" || !/^\d+$/.test(price)) {
        setPriceError("Price is required and should be in digits");
      }
      if (quantity === "" || !/^\d+$/.test(quantity)) {
        setQuantityError("Quantity is required and should be in digits");
      }
      if (
        name !== "" &&
        category !== "" &&
        price !== "" &&
        quantity !== "" &&
        /^\d+$/.test(price) &&
        /^\d+$/.test(quantity)
      ) {
        setLoading(true);
        axios
          .put(`http://localhost:3637/stock/update/${product._id}`, {
            name,
            category,
            price: price * quantity,
            quantity,
          })
          .then((res) => {
            setLoading(false);
            onResponseData(res.data);
            setOpen(false);
            setName(res.data.name);
            setPrice(res.data.price);
            setCategory(res.data.category);
            setQuantity(res.data.quantity);
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
            placeholder="Price of One Product"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              setPriceError("");
            }}
            error={priceError}
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
