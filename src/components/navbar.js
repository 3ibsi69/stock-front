import React, { useState } from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsSubMenuOpen(false);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsSubMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/stock" className="hover-effect" onClick={closeMenus}>
              All Stocks
            </Link>
          </li>
          <li>
            <Link
              to="/fournisseur"
              className="hover-effect"
              onClick={closeMenus}
            >
              Fournisseur
            </Link>
          </li>
          <li onClick={toggleSubMenu} className="hover-effect">
            <span
              style={{ display: "flex", alignItems: "center" }}
              id="submenu"
            >
              Documents
              <svg
                style={{ marginLeft: "5px" }}
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"
                />
              </svg>
            </span>
            {isSubMenuOpen && (
              <ul className="submenu">
                <li>
                  <Link to="/facture" onClick={closeMenus}>
                    Facture
                  </Link>
                </li>
                <li>
                  <Link to="/devis" onClick={closeMenus}>
                    Devis
                  </Link>
                </li>
                <li>
                  <Link to="/bon-de-livraison" onClick={closeMenus}>
                    Bon De Livraison
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/settings" className="hover-effect" onClick={closeMenus}>
              Account Settings
            </Link>
          </li>
          <li>
            <Link to="/" className="hover-effect" onClick={closeMenus}>
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
