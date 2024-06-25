import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import '../assets/style/Login.css'
import { AccountContext } from './Accounts';

Modal.setAppElement('#root')


// Login-Funktion

function Login({ isOpen, onRequestClose, onRegisterOpen }) {

  // Zustandsvariablen für E-Mail, Passwort, Fehlermeldung und Eingabefehler

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState ("");
  const [inputError, setInputError] = useState({
    email: false,
    password: false
  });

  // Zugriff auf die Authentifizierungsfunktion aus dem Kontext


  const { authenticate } = useContext(AccountContext);

  // Funktion, die beim Absenden des Formulars aufgerufen wird

  const Submit = (event) => {
    event.preventDefault();
    const newInputError = {
      email: email === "",
      password: password === ""
    };
    setInputError(newInputError);
    if (Object.values(newInputError).some(error => error)) {
      setTimeout(() => setInputError({
        email: false,
        password: false
      }), 3000);
      return;
    }
    authenticate(email, password, onRequestClose)
    .then(data => {
      console.log("Logged in!", data);
      onRequestClose();
    })
    .catch(err => {
      console.error("failed to login", err);
      setError("Benutzerdaten stimmen nicht überein.")
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
            <div className={`row ${inputError.email ? 'error' : ''}`}>
              <i className="fas fa-user" />
              <input value={email} onChange={(event) => setEmail(event.target.value)} type="text" placeholder="Email" required="" />
            </div>
            <div className={`row ${inputError.password ? 'error' : ''}`}>
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
          {error && <div className='error-container'><span className="error">{error}</span></div>}
        </div>
      </div>
    </Modal>
  );
}

export default Login
