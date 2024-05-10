import React, { useState } from "react";
import { Button, Modal, Space } from "antd";
import { Input } from "rizzui";
import axios from "axios";
import "../styles/modal.css";

const ModalComp = ({ onResponseData }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [nameError, setNameError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [priceError, setPriceError] = useState("");
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
          .post("http://localhost:3637/stock/create", {
            name,
            category,
            price: price * quantity,
            quantity,
          })
          .then((res) => {
            setLoading(false);
            onResponseData(res.data);
            setOpen(false);
            setName("");
            setPrice("");
            setCategory("");
            setQuantity("");
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

export default ModalComp;
