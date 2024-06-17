// Register.js
import React from 'react';
import Modal from 'react-modal';
import '../assets/style/Login.css' // Stellen Sie sicher, dass der Pfad zu Ihrer CSS-Datei korrekt ist

Modal.setAppElement('#root') // set the root element for the modal

function Register({ isOpen, onRequestClose, onLoginOpen }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="login-modal">
      <div className="container">
        <div className="wrapper">
          <div className="title">
            <span>Konto erstellen</span>
          </div>
          <form action="#">
            <div className="row">
              <i className="fas fa-user" />
              <input type="text" placeholder="Name" required="" />
            </div>
            <div className="row">
              <i className="fas fa-envelope" />
              <input type="text" placeholder="Email oder Telefon" required="" />
            </div>
            <div className="row">
              <i className="fas fa-lock" />
              <input type="password" placeholder="Passwort" required="" />
            </div>
            <div className="row">
              <i className="fas fa-lock" />
              <input type="password" placeholder="Passwort bestätigen" required="" />
            </div>
            <div className="row button">
              <input type="submit" defaultValue="Konto erstellen" />
            </div>
            <div className="signup-link">
              Bereits ein Konto? <a href="#" onClick={(event) => { event.preventDefault(); onRequestClose(); setTimeout(onLoginOpen, 0); }}>Einloggen</a>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default Register;
