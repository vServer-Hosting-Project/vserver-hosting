import React, { useState } from 'react';
import Modal from 'react-modal';
import '../assets/style/Login.css'
import UserPool from './UserPool';

Modal.setAppElement('#root')

function Register({ isOpen, onRequestClose, onLoginOpen }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Die Passwörter stimmen nicht überein.");
      return;
    }
      UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log(data);
      }
    })
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="login-modal">
      <div className="container">
        <div className="wrapper">
          <div className="title">
            <span>Konto erstellen</span>
          </div>
          <form action="#" onSubmit={handleSubmit}>
            <div className="row">
              <i className="fas fa-user" />
              <input value={name} onChange={(event) => setName(event.target.value)} type="text" placeholder="Name" required="" />
            </div>
            <div className="row">
              <i className="fas fa-envelope" />
              <input value={email} onChange={(event) => setEmail(event.target.value)} type="text" placeholder="Email" required="" />
            </div>
            <div className="row">
              <i className="fas fa-lock" />
              <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Passwort" required="" />
            </div>
            <div className="row">
              <i className="fas fa-lock" />
              <input value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} type="password" placeholder="Passwort bestätigen" required="" />
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

export default Register
