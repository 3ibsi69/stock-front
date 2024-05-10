import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/Login";
import Stock from "./pages/Stock";
import Navbar from "./components/navbar";
import Settings from "./pages/settings";
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
      <div className="settings-container">
        <Settings />
      </div>
    </>
  );
}

root.render(<App />);
