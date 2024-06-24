import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import '../assets/style/Login.css'
import '../assets/style/Error.css'
import { AccountContext } from './Accounts';

Modal.setAppElement('#root')

function Login({ isOpen, onRequestClose, onRegisterOpen }) {
  const [email, setEmail] = useState(""); // Zustand für die E-Mail
  const [password, setPassword] = useState(""); // Zustand für das Passwort
  const [error, setError] = useState(""); // Zustand für den Error

  const { authenticate } = useContext(AccountContext); // Authentifizierungsfunktion aus dem Kontext holen

  const Submit = (event) => {
    event.preventDefault(); // Verhindert das Neuladen der Seite beim Absenden des Formulars
   
    authenticate(email, password, onRequestClose) // Authentifizieren Sie den Benutzer
    .then(data => {
      console.log("Logged in!", data);
      onRequestClose(); // Schließt das Modal, wenn die Anmeldung erfolgreich ist
    })
    .catch(err => {
      console.error("failed to login", err); // Fehlermeldung anzeigen, wenn die Anmeldung fehlschlägt
      setError("Benutzerdaten stimmen nicht überein."); // Setzt den Fehlerzustand auf die entsprechende Fehlermeldung
    });
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="login-modal">
      <div className="container">
        <div className="wrapper">
          <div className="title">
            <span>Login</span>
          </div>
          <form action="#" onSubmit={Submit}>
            <div className={`row ${error ? 'error-border' : ''}`}>
              <i className="fas fa-user" />
              <input value={email} onChange={(event) => setEmail(event.target.value)} type="text" placeholder="Email" required="" />
            </div>
            <div className={`row ${error ? 'error-border' : ''}`}>
              <i className="fas fa-lock" />
              <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Passwort" required="" />
            </div>
            <div className="pass">
              <a href="#">Passwort vergessen.</a> 
            </div>
            <div className="row button">
              <input type="submit" value="Login" />  
            </div>
            <div className="signup-link">
            Kein Konto? <a href="#" onClick={(event) => { event.preventDefault(); onRequestClose(); setTimeout(onRegisterOpen, 0); }}>Konto erstellen</a>
            </div>
          </form>
        </div>
        {error && <div className="error-container"><span className="error">{error}</span></div>}
      </div>
    </Modal>
  );
}

export default Login;
