import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/Login";
import Stock from "./pages/Stock";
import Navbar from "./components/navbar";
import Settings from "./pages/settings";
import Fournisseur from "./pages/fournisseur";
import Facture from "./pages/facture";
import Devis from "./pages/devis";
import Bon from "./pages/bon";

import "./styles/modal.css";

import "./tailwind.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginS />} />
        <Route path="/signup" element={<SignupS />} />
        <Route path="/stock" element={<Stocks />} />
        <Route path="/settings" element={<SettingsS />} />
        <Route path="/fournisseur" element={<FournisseurS />} />
        <Route path="/facture" element={<FactureS />} />
        <Route path="/devis" element={<DevisS />} />
        <Route path="/bon-de-commande" element={<BonS />} />
      </Routes>
    </BrowserRouter>
  );
}
function SignupS() {
  return <Signup />;
}

function LoginS() {
  return <Login />;
}

function Stocks() {
  return (
    <>
      <Navbar />
      <div className="stock-container">
        <Stock />
      </div>
    </>
  );
}
function SettingsS() {
  return (
    <>
      <Navbar />
      <Settings />
    </>
  );
}
function FournisseurS() {
  return (
    <>
      <Navbar />
      <div className="fournisseur-container">
        <Fournisseur />
      </div>
    </>
  );
}
function FactureS() {
  return (
    <>
      <Navbar />
      <div className="facture-container">
        <Facture />
      </div>
    </>
  );
}

function DevisS() {
  return (
    <>
      <Navbar />
      <div className="facture-container">
        <Devis />
      </div>
    </>
  );
}
function BonS() {
  return (
    <>
      <Navbar />
      <div className="facture-container">
        <Bon />
      </div>
    </>
  );
}
root.render(<App />);
