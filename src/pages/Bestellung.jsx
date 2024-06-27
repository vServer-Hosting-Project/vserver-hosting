import React from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';

function Bestellung() {
  const location = useLocation();
  const { customerData, orderId } = location.state || {};

  return (
    <div className="container payment-container">
      <header className="header">
        <h3>Vielen Dank für Ihre Bestellung</h3>
      </header>
      <main className="payment">
        <div className="invoice">
          <h4>Rechnung</h4>
          <p><strong>Bestellnummer:</strong> {orderId}</p>
          <p><strong>Name:</strong> {customerData.firstName} {customerData.lastName}</p>
          <p><strong>Anschrift:</strong></p>
          <p>{customerData.street}</p>
          <p>{customerData.phone}</p>
          <p>{customerData.email}</p>
        </div>
      </main>
    </div>
  );
}

export default Bestellung;
