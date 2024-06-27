import React from 'react';
import { useLocation } from 'react-router-dom';

const instanceDetails = {
  't2.micro': { vCPUs: 1, RAM: 1, price: 20 },
  't3.small': { vCPUs: 2, RAM: 2, price: 30 },
  't3.medium': { vCPUs: 2, RAM: 4, price: 40 },
  't3.large': { vCPUs: 2, RAM: 8, price: 45 },
  'm5.large': { vCPUs: 2, RAM: 8, price: 49 },
  'm5.xlarge': { vCPUs: 4, RAM: 16, price: 65 },
  'c5.large': { vCPUs: 2, RAM: 4, price: 55 },
  'c5.xlarge': { vCPUs: 4, RAM: 8, price: 59 }
};

const calculateStorageCost = (storage) => {
  return storage > 30 ? (storage - 30) / 10 : 0;
};

const Bestellung = () => {
  const location = useLocation();
  const { customerData, orders, orderNumber } = location.state;

  const originalTotalCost = orders.reduce((acc, order) => {
    const instance = order.instanceType ? instanceDetails[order.instanceType] : null;
    const price = instance ? instance.price : 0;
    const storageCost = calculateStorageCost(order.storage);
    return acc + price + storageCost;
  }, 0);

  const discountAmount = customerData.discountCode === 'ts24' ? originalTotalCost - 0.01 : 0;
  const discountedTotalCost = originalTotalCost - discountAmount;
  const taxRate = 0.19;
  const taxAmount = discountedTotalCost * taxRate;
  const totalCost = (discountedTotalCost + taxAmount).toFixed(2).replace('.', ',');

  return (
    <div className="container order-container">
      <header className="header">
        <h3>Vielen Dank für Ihre Bestellung!</h3>
      </header>
      <main className="order-summary">
        <h4>Bestellübersicht</h4>
        <p><strong>Bestellnummer:</strong> {orderNumber}</p>
        <div className="billing-address">
          <h5>Rechnungsadresse:</h5>
          <p>{customerData.firstName} {customerData.lastName}</p>
          <p>{customerData.street}</p>
          <p>{customerData.phone}</p>
          <p>{customerData.email}</p>
        </div>
        <h4>Bestellte Produkte</h4>
        <table className="order-table">
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
            {orders.map((order, index) => {
              const instance = order.instanceType ? instanceDetails[order.instanceType] : null;
              const price = instance ? instance.price : 0;
              const storageCost = calculateStorageCost(order.storage);
              const totalInstanceCost = price + storageCost;

              return (
                <tr key={index}>
                  <td>{order.instanceType}</td>
                  <td>{instance ? instance.vCPUs : ''}</td>
                  <td>{instance ? instance.RAM : ''}</td>
                  <td>{order.os}</td>
                  <td>{order.osVersion}</td>
                  <td>{order.storage}</td>
                  <td>{totalInstanceCost.toFixed(2).replace('.', ',')}€</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="invoice-summary">
          <p><strong>Rechnungsbetrag: {totalCost}€</strong></p>
        </div>
      </main>
    </div>
  );
}

export default Bestellung;
