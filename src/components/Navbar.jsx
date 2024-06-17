// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import firmaLogo from '../assets/images/firma.png';

function Navbar({ onLoginOpen, onRegisterOpen }) {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <Link className="navbar-brand" to="/">
        <div className="logo-icon">
          <img src={firmaLogo} width={80} height={50} alt="Firma Logo" />
        </div>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link custom-link" to="/support" id="support-link">
              Hilfe & Support
            </Link>
          </li>
          <li className="nav-item"></li>
          <li className="nav-item">
            <Link className="nav-link custom-link" to="/warenkorb" id="warenkorb-link">
              Warenkorb
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-link" to="#" onClick={onLoginOpen}>
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
