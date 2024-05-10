import React, { useState } from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link
              to="/stock"
              className="hover-effect"
              onClick={closeMobileMenu}
            >
              All Stocks
            </Link>
          </li>

          <li>
            <Link to="/" className="hover-effect" onClick={closeMobileMenu}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
      <div id="mobile" onClick={toggleMobileMenu}>
        <i className={`fas fa-${isMobileMenuOpen ? "times" : "bars"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M1.25 3.25A.75.75 0 0 1 2 2.5h12A.75.75 0 0 1 14 4H2a.75.75 0 0 1-.75-.75m0 4.75A.75.75 0 0 1 2 7.25h12a.75.75 0 0 1 0 1.5H2A.75.75 0 0 1 1.25 8M2 12a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5z"
              clipRule="evenodd"
            />
          </svg>
        </i>
      </div>
    </nav>
  );
}

export default NavBar;
