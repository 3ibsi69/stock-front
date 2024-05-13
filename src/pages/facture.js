import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "rizzui";
import "../styles/facture.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const Facture = (props) => {
  const navigate = useNavigate();
  const [toUser, setToUser] = useState("");
  const [toUserError, setToUserError] = useState("");
  const [fromUser, setFromUser] = useState("");
  const [fromUserError, setFromUserError] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([{ value: "", label: "" }]);
  const [selectedProducts, setSelectedProducts] = useState([]); // Changed to an array
  const [productQuantities, setProductQuantities] = useState({}); // State to store product quantities

  const animatedComponents = makeAnimated();

  const onButtonClick = async () => {
    try {
      if (toUser === "") {
        setToUserError("To User is required");
        return;
      }
      if (fromUser === "") {
        setFromUserError("From User is required");
        return;
      }
      if (selectedProducts.length === 0) {
        toast.error("Please select at least one product");
        return;
      }
      if (Object.keys(productQuantities).length === 0) {
        toast.error("Please enter quantity for selected products");
        return;
      }
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3637/facture/create",
        {
          toUser: toUser,
          fromUser: fromUser,
          products: selectedProducts.map((product) => ({
            _id: product.value,
            quantity: productQuantities[product.value],
          })),
        }
      );
      if (response.status === 200) {
        toast.success("Facture created successfully");
        setToUser("");
        setFromUser("");
        setSelectedProducts([]);
        setProductQuantities({});
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOptions = async () => {
    try {
      const response = await axios.get("http://localhost:3637/stock/getAll");
      setOptions(
        response.data.map((item) => ({
          value: item._id,
          label: item.name,
        }))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };
  useEffect(() => {
    fetchOptions();
  }, []);

  return (
    <div className="Facture-container">
      <form className="form">
        <h1 className="title">Facture</h1>

        <div className="row-input">
          <Input
            type="toUser"
            placeholder="To User"
            value={toUser}
            onChange={(e) => {
              setToUser(e.target.value);
              setToUserError("");
            }}
            error={toUserError}
          />
        </div>
        <div className="row-input">
          <Input
            type="fromUser"
            placeholder="From User"
            value={fromUser}
            onChange={(e) => {
              setFromUser(e.target.value);
              setFromUserError("");
            }}
            error={fromUserError}
          />
        </div>
        <div className="row-input">
          {options.length > 0 && (
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              defaultValue={selectedProducts}
              isMulti
              options={options}
              onChange={(selected) => setSelectedProducts(selected)}
            />
          )}
        </div>

        {selectedProducts.map((product, index) => (
          <div className="row-input-q" key={index}>
            <div className="label">{product.label}</div>
            <Input
              className="input"
              type="number"
              placeholder="Quantity"
              value={productQuantities[product.value] || ""}
              onChange={(e) =>
                handleQuantityChange(product.value, e.target.value)
              }
            />
          </div>
        ))}

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

export default Facture;
