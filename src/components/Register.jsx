import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../assets/style/Login.css'
import UserPool from './UserPool';

Modal.setAppElement('#root')

function Register({ isOpen, onRequestClose, onLoginOpen, onConfirmOpen }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
    match: null
  });
  const [inputError, setInputError] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  useEffect(() => {
    setPasswordError({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password),
      match: password && confirmPassword ? password === confirmPassword : null
    });
  }, [password, confirmPassword]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newInputError = {
      name: name === "",
      email: email === "",
      password: password === "",
      confirmPassword: confirmPassword === ""
    };
    setInputError(newInputError);
    if (Object.values(newInputError).some(error => error)) {
      setTimeout(() => setInputError({
        name: false,
        email: false,
        password: false,
        confirmPassword: false
      }), 3000);
      return;
    }
    if (password !== confirmPassword) {
      alert("Die Passwörter stimmen nicht überein.");
      return;
    }
    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log(data);
        onRequestClose();
        onConfirmOpen();
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
            <div className={`row ${inputError.name ? 'error' : ''}`}>
              <i className="fas fa-user" />
              <input value={name} onChange={(event) => setName(event.target.value)} type="text" placeholder="Name" required="" />
            </div>
            <div className={`row ${inputError.email ? 'error' : ''}`}>
              <i className="fas fa-envelope" />
              <input value={email} onChange={(event) => setEmail(event.target.value)} type="text" placeholder="Email" required="" />
            </div>
            <div className={`row ${inputError.password ? 'error' : ''}`}>
              <i className="fas fa-lock" />
              <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Passwort" required="" />
            </div>
            <div className={`row ${inputError.confirmPassword ? 'error' : ''}`}>
              <i className="fas fa-lock" />
              <input value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} type="password" placeholder="Passwort bestätigen" required="" />
            </div>
            <ul className="password-requirements">
              <li className={passwordError.length ? "valid" : ""}>- 8 Zeichen</li>
              <li className={passwordError.uppercase ? "valid" : ""}>- 1 Großbuchstabe</li>
              <li className={passwordError.lowercase ? "valid" : ""}>- 1 Kleinbuchstabe</li>
              <li className={passwordError.number ? "valid" : ""}>- 1 Zahl</li>
              <li className={passwordError.specialChar ? "valid" : ""}>- 1 Sonderzeichen</li>
              <li className={passwordError.match ? "valid" : ""}>- Passwörter stimmen überein</li>
            </ul>
            <div className="row button">
              <input type="submit" value="Konto erstellen" />
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
