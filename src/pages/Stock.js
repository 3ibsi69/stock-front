import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Password } from "rizzui";
import axios from "axios";
import Inventory from "../components/inventory.tsx";
import "../styles/stock.css";
import ModalComp from "../components/modalAddStock.jsx";
const Stock = (props) => {
  const [responseData, setResponseData] = useState(null); // Step 1: Define state variable
  const navigate = useNavigate();
  const [stockData, setStockData] = useState([]);
  const handleResponseData = (data) => {
    setResponseData(data); // Step 4: Update state variable with response data
  };

  const fetchStock = async () => {
    try {
      const res = await axios.get("http://localhost:3637/stock/getAll");
      setStockData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchStock();
  }, [responseData]);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (!userString) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="stock-container">
      <div className="stock-header">
        <div></div>
        <ModalComp onResponseData={handleResponseData} />
      </div>

      <div className="stock-content">
        <Inventory data={stockData} fetchStock={fetchStock} />
      </div>
    </div>
  );
};

export default Stock;
