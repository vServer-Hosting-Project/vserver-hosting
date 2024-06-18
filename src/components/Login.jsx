import React, { useState } from 'react';
import Modal from 'react-modal';
import '../assets/style/Login.css' // Stellen Sie sicher, dass der Pfad zu Ihrer CSS-Datei korrekt ist
import UserPool from './UserPool';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

Modal.setAppElement('#root') // set the root element for the modal

function Login({ isOpen, onRequestClose, onRegisterOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Submit = (event) => {
    event.preventDefault();
   
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool
    });
  
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log('authentication successful', data);
        // Hier können Sie den Erfolg des Authentication-Prozess behandeln
      },
      onFailure: (err) => {
        console.error('authentication failed', err);
        // Hier können Sie den Fehlern des Authentication-Prozess behandeln
      },
      newPasswordRequired: (data) => {
        console.log('new password required', data);
        // Hier können Sie den Fall implementieren, wenn ein neues Passwort erforderlich ist
      }
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
        </div>
      </div>
    </Modal>
  );
}

export default Login;
