import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import '../assets/style/Login.css' // Stellen Sie sicher, dass der Pfad zu Ihrer CSS-Datei korrekt ist
import { AccountContext } from './Accounts';

Modal.setAppElement('#root') // set the root element for the modal

function Login({ isOpen, onRequestClose, onRegisterOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState ("");

  const { authenticate } = useContext(AccountContext);

  const Submit = (event) => {
    event.preventDefault();
   
    authenticate(email, password, onRequestClose)
    .then(data => {
      console.log("Logged in!", data);
      onRequestClose();
    })
    .catch(err => {
      console.error("failed to login", err);
        setError("Benutzerdaten stimmmen nicht überein.")
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
            <div className="row">
              <i className="fas fa-user" />
              <input value={email} onChange={(event) => setEmail(event.target.value)} type="text" placeholder="Email" required="" />
            </div>
            <div className="row">
              <i className="fas fa-lock" />
              <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Passwort" required="" />
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
          {error && <div className='error-container'><span className="error">{error}</span></div>}
        </div>
      </div>
    </Modal>
  );
}

export default Login;
