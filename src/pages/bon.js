import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "rizzui";
import "../styles/facture.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Bon = (props) => {
  const [toUser, setToUser] = useState("");
  const [toUserError, setToUserError] = useState("");
  const [fromUser, setFromUser] = useState("");
  const [fromUserError, setFromUserError] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentMethodError, setPaymentMethodError] = useState("");
  const [giveRemise, setGiveRemise] = useState(false);
  const [Remise, setRemise] = useState("");
  const [RemiseError, setRemiseError] = useState("");
  const [timbreF, setTimbreF] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState([
    {
      value: "",
      code: "",
      label: "",
      designation: "",
      category: "",
      prixAchatHT: "",
      prixVenteHT: "",
      MargeHT: "",
      quantite: "",
    },
  ]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productQuantities, setProductQuantities] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const User = JSON.parse(localStorage.getItem("user"));
    if (!User) {
      navigate("/");
    }
  }, [navigate]);

  const getFacture = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3637/bon/get/${id}`);
      const factureData = response.data;

      const pdfResponse = await axios.post(
        "http://localhost:3637/pdf/get/bon",
        {
          content: [
            {
              to: toUser,
              from: fromUser,
              factureId: response.data._id,
              count: response.data.count,
              PaimentMethod: paymentMethod,
              giveRemise: giveRemise,
              Remise: Remise,
              timbreFiscal: timbreF,
              products: factureData.products,
            },
          ],
        },
        { responseType: "blob" }
      );

      const blob = new Blob([pdfResponse.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "bon-de-livraison.pdf");

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

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
      if (paymentMethod === "") {
        setPaymentMethodError("Payment Method is required");
        return;
      }
      if (giveRemise && Remise === "") {
        setRemiseError("Remise is required");
        return;
      }

      setLoading(true);
      const response = await axios.post("http://localhost:3637/bon/create", {
        to: toUser,
        from: fromUser,
        PaimentMethod: paymentMethod,
        Remise: Remise,
        giveRemise: giveRemise,
        timbreFiscal: timbreF,
        products: selectedProducts.map((product) => ({
          _id: product.value,
          code: product.code,
          designation: product.designation,
          category: product.category,
          prixAchatHT: product.prixAchatHT,
          prixVenteHT: product.prixVenteHT,
          MargeHT: product.MargeHT,
          quantite: productQuantities[product.value],
        })),
      });
      if (response.data.msg === "Out of stock") {
        toast.error("Out of stock");
        setLoading(false);

        return;
      } else {
        toast.success("Bon de livraison created successfully");
        setToUser("");
        setFromUser("");
        setSelectedProducts([]);
        setProductQuantities({});
        setLoading(false);
        getFacture(response.data._id);
        setPaymentMethod("");
        setRemise("");
        setGiveRemise(false);
        setTimbreF(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const searchProduct = (inputValue) => {
    axios
      .post("http://localhost:3637/stock/search", {
        search: inputValue.target.value,
      })
      .then((res) => {
        setOptions(
          res.data.map((item) => ({
            value: item._id,
            label: item.name,
            code: item.code,
            designation: item.designation,
            category: item.category,
            prixAchatHT: item.prixAchatHT,
            prixVenteHT: item.prixVenteHT,
            MargeHT: item.MargeHT,
            quantite: item.quantite,
          }))
        );
        setShowOptions(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleOptionSelect = (option) => {
    setSelectedProducts([...selectedProducts, option]);
    setShowOptions(false);
  };

  return (
    <div className="Facture-container">
      <form className="form">
        <h1 className="title">Bon De Livraison</h1>

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
          <Input type="text" placeholder="Product" onChange={searchProduct} />
          {showOptions && options.length > 0 && (
            <div className="options-container">
              {options.map((option) => (
                <div
                  key={option.value}
                  className="option"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="row-input">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <input
                type="checkbox"
                value={giveRemise}
                onChange={(e) => setGiveRemise(e.target.checked)}
                style={{ marginRight: "10px" }}
              />
              <label>Give Remise</label>
            </div>
            <Input
              type="Remise"
              placeholder="Remise"
              value={Remise}
              onChange={(e) => {
                setRemise(e.target.value);
                setRemiseError("");
              }}
              error={RemiseError}
              disabled={!giveRemise}
            />
          </div>
        </div>

        <div className="row-input">
          <select
            value={paymentMethod}
            className="select"
            onChange={(e) => {
              setPaymentMethod(e.target.value);
              setPaymentMethodError("");
            }}
          >
            <option value="">Select Payment Method</option>
            <option value="Cash">Cash</option>
            <option value="Cheque">Cheque</option>
            <option value="Bon de Dommande">Bon De Commande</option>
          </select>
        </div>
        <div className="row-input">
          <input
            type="checkbox"
            value={timbreF}
            onChange={(e) => setTimbreF(e.target.checked)}
            style={{ marginRight: "10px" }}
          />
          <label>Timbre Fiscale</label>
        </div>
        {selectedProducts.length > 0 &&
          selectedProducts.map((product, index) => (
            <div className="row-input-q" key={index}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  className="delete"
                  onClick={() =>
                    setSelectedProducts([
                      ...selectedProducts.filter(
                        (item) => item.value !== product.value
                      ),
                    ])
                  }
                  style={{
                    cursor: "pointer",
                    marginRight: "5px",
                    color: "red",
                    fontStyle: "italic",
                  }}
                >
                  X
                </div>
                <div className="label">{product.label}</div>
              </div>
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

export default Bon;
