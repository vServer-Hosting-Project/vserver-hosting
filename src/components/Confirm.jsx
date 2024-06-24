import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import '../assets/style/Login.css'
import '../assets/style/Error.css'
import { AccountContext } from './Accounts';

Modal.setAppElement('#root')
function Confirm({ isOpen, onRequestClose }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { confirm } = useContext(AccountContext);

  const onSubmit = (event) => {
    event.preventDefault();
  
    if (!code) {
      setError("Bitte geben Sie einen Bestätigungscode ein.");
      return;
    }
  
    confirm(code)
      .then(data => {
        console.log("Code confirmed!", data);
        setError(""); 
        onRequestClose();
      })
      .catch(err => {
        console.error("Failed to confirm code", err);
        setError("Der eingegebene Code ist falsch.");
      });
  };
  
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="login-modal">      <div className="container">
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
      </div>
    </Modal>
  );
}

export default Confirm;
