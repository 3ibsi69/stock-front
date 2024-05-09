import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/Login";
import Stock from "./pages/Stock";
import Navbar from "./components/navbar";

import "./tailwind.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/stock" element={<Stock />} />
      </Routes>
    </BrowserRouter>
  );
}

root.render(<App />);
