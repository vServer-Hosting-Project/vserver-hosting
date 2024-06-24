import React, { useState } from 'react';
import Modal from 'react-modal';
import '../assets/style/Login.css'
import '../assets/style/Error.css'
import UserPool from './UserPool';

Modal.setAppElement('#root') 

function Register({ isOpen, onRequestClose, onLoginOpen, onConfirmOpen }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Überprüft, ob alle Felder ausgefüllt sind
    if (!name || !email || !password || !confirmPassword) {
      setError("Bitte füllen Sie alle Felder aus.");
      return;
    }

    // Überprüft, ob die Passwörter übereinstimmen
    if (password !== confirmPassword) {
      setError("Die Passwörter stimmen nicht überein.");
      return;
    }

    // Überprüft, ob das Passwort den Anforderungen entspricht
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      setError("Das Passwort muss mindestens 8 Zeichen lang sein, mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten.");
      return;
    }

    // Registriert den Benutzer mit dem UserPool
    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        console.error(err);
        setError(err.message);
      } else {
        console.log(data);
        onRequestClose(false); // Schließt das Modal, wenn die Registrierung erfolgreich ist
        setTimeout(() => {
          onConfirmOpen(); // Öffnet das Confirm-Modal
      }, 0);
    }
  })


}
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="login-modal">
      <div className="container">
        <div className="wrapper">
          <div className="title">
            <span>Konto erstellen</span>
          </div>
          <form action="#" onSubmit={handleSubmit}>
            <div className={`row ${error ? 'error-border' : ''}`}>
              <i className="fas fa-user" />
              <input value={name} onChange={(event) => setName(event.target.value)} type="text" placeholder="Name" required="" />
            </div>
            <div className={`row ${error ? 'error-border' : ''}`}>
              <i className="fas fa-envelope" />
              <input value={email} onChange={(event) => setEmail(event.target.value)} type="text" placeholder="Email" required="" />
            </div>
            <div className={`row ${error ? 'error-border' : ''}`}>
              <i className="fas fa-lock" />
              <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Passwort" required="" />
            </div>
            <div className={`row ${error ? 'error-border' : ''}`}>
              <i className="fas fa-lock" />
              <input value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} type="password" placeholder="Passwort bestätigen" required="" />
            </div>
            <div className="row button">
              <input type="submit" value="Konto erstellen" />
            </div>
            <div className="signup-link">
              Bereits ein Konto? <a href="#" onClick={(event) => { event.preventDefault(); onRequestClose(); setTimeout(onLoginOpen, 0); }}>Einloggen</a>
            </div>
          </form>
        </div>
        {error && <div className="error-container"><span className="error">{error}</span></div>}
      </div>
    </Modal>
  );
}

export default Register;
