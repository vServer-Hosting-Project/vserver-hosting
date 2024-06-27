import React from 'react';
import { useLocation } from 'react-router-dom';

const Bestellung = () => {
  const location = useLocation();
  const { customerData, orders, orderNumber } = location.state;

  return (
    <div className="container">
      <h2>Vielen Dank für Ihre Bestellung!</h2>
      <p>Ihre Bestellnummer: {orderNumber}</p>
      <h3>Rechnungsinformationen</h3>
      <p>Name: {customerData.firstName} {customerData.lastName}</p>
      <p>Straße: {customerData.street}</p>
      <p>Telefon: {customerData.phone}</p>
      <p>E-Mail: {customerData.email}</p>
      
      <h3>Bestellte Produkte</h3>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Instanztyp</th>
            <th>CPU</th>
            <th>RAM (GB)</th>
            <th>Betriebssystem</th>
            <th>Betriebssystemversion</th>
            <th>Speicher (GB)</th>
            <th>Preis (€)</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.instanceType}</td>
              <td>{order.vCPUs}</td>
              <td>{order.RAM}</td>
              <td>{order.os}</td>
              <td>{order.osVersion}</td>
              <td>{order.storage}</td>
              <td>{order.price}€</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bestellung;
