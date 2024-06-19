import React from 'react';
import Modal from 'react-modal';
import '../assets/style/Login.css' // Stellen Sie sicher, dass der Pfad zu Ihrer CSS-Datei korrekt ist

Modal.setAppElement('#root') // set the root element for the modal

function Login({ isOpen, onRequestClose, onRegisterOpen }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="login-modal">
      <div className="container">
        <div className="wrapper">
          <div className="title">
            <span>Login</span>
          </div>
          <form action="#">
            <div className="row">
              <i className="fas fa-user" />
              <input type="text" placeholder="Email" required="" />
            </div>
            <div className="row">
              <i className="fas fa-lock" />
              <input type="password" placeholder="Passwort" required="" />
            </div>
            <div className="pass">
              <a href="#">Passwort vergessen.</a>
            </div>
            <div className="row button">
              <input type="submit" Value="Login" />
            </div>
            <div className="signup-link">
            Kein Konto? <a href="#" onClick={(event) => { event.preventDefault(); onRequestClose(); setTimeout(onRegisterOpen, 0); }}>Konto erstellen</a>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default Login;
