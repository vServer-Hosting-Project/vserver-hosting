import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import '../assets/style/Login.css'
import '../assets/style/Error.css'
import { AccountContext } from './Accounts';

Modal.setAppElement('#root')
function Confirm({ isOpen, onRequestClose }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Zugriff auf die Bestätigungsfunktion aus dem Kontext#
  
  const { confirm } = useContext(AccountContext);

  // Funktion, die beim Absenden des Formulars aufgerufen wird
  
  const onSubmit = (event) => {
    event.preventDefault();
  
    // Überprüfung, ob ein Code eingegeben wurde

    if (!code) {
      setError("Bitte geben Sie einen Bestätigungscode ein.");
      return;
    }
    console.log('Calling confirm function in Confirm.jsx with code:', code);

    // Aufruf der Bestätigungsfunktion mit dem eingegebenen Code

    confirm(code)
      .then(data => {
        console.log("Bestätigungsdaten:", data);
        setError(""); 
        setSuccess(true);
        setTimeout(onRequestClose, 2000);
      })
      .catch(err => {
        console.error("Fehler bei der Bestätigung:", err);
        setError("Der eingegebene Code ist falsch.");
      });
  };
  
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="login-modal">      
      <div className="container">
        <div className="wrapper">
          <div className="title">
            <span>Code bestätigen</span>
          </div>
          <form action="#" onSubmit={onSubmit}>
            <div className={`row ${error ? 'error-border' : ''}`}>
              <i className="fas fa-lock" />
              <input value={code} onChange={(event) => setCode(event.target.value)} type="text" placeholder="Code" required="" />
            </div>
            <div className="row button">
              <input type="submit" value="Bestätigen" />
            </div>
          </form>
        </div>
        {error && <div className="error-container"><span className="error">{error}</span></div>}
        {success && <div className="success-container"><span className="success">Code erfolgreich bestätigt!</span></div>}
      </div>
    </Modal>
  );
}

export default Confirm;
