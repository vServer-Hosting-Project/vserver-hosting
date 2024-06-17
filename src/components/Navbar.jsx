import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import firmaLogo from '../assets/images/firma.png';

function Navbar({ onLoginOpen, onRegisterOpen }) {
  // Zustand hinzufügen
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Funktion zum Umschalten des Anmeldestatus
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
    if (!isLoggedIn) {
      onLoginOpen();
    }
  };

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
          <li className="nav-item">
            <Link className="nav-link custom-link" to="/konfigurator" id="konfigurator-link">
              Konfigurator
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-link" to="/warenkorb" id="warenkorb-link">
              Warenkorb
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-link" to="#" onClick={toggleLogin}>
              {isLoggedIn ? 'Logout' : 'Login'}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
