import React from 'react';
import { useNavigate } from 'react-router-dom';
import linuxLogo from '../assets/logos/linux.png';
import windowsLogo from '../assets/logos/windows.png';
import '../App.css';

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

function calculateStorageCost(storage) {
  return storage > 30 ? (storage - 30) / 10 : 0;
}

function Warenkorb({ orders, removeOrder }) {
  const navigate = useNavigate();

  const originalTotalCost = orders.reduce((acc, order) => {
    const instanceCost = instanceDetails[order.instanceType].price;
    const storageCost = calculateStorageCost(order.storage);
    return acc + instanceCost + storageCost;
  }, 0);

  const handleProceedToPayment = () => {
    navigate('/zahlung');
  };

  return (
    <div className="container cart-container">
      <header className="header">
        <h3>Warenkorb</h3>
      </header>
      <main className="cart">
        {orders.length === 0 ? (
          <p>Ihr Warenkorb ist leer.</p>
        ) : (
          <div className="invoice">
            <div className="invoice-header">
            </div>
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
                  <th>Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => {
                  const instance = instanceDetails[order.instanceType];
                  const storageCost = calculateStorageCost(order.storage);
                  const totalInstanceCost = instance.price + storageCost;

                  return (
                    <tr key={index}>
                      <td>{order.instanceType}</td>
                      <td>{instance.vCPUs}</td>
                      <td>{instance.RAM}</td>
                      <td>
                        <img
                          src={order.os === 'Linux' ? linuxLogo : windowsLogo}
                          alt={order.os}
                          className={order.os === 'Linux' ? 'cart-linux-logo' : 'cart-windows-logo'}
                        />
                      </td>
                      <td>{order.osVersion}</td>
                      <td>{order.storage}</td>
                      <td><strong>{totalInstanceCost.toFixed(2)}€</strong></td>
                      <td>
                        <button
                          className="remove-button"
                          onClick={() => removeOrder(index)}
                        >
                          Entfernen
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="invoice-footer">
              <h4>Betrag: <small>{originalTotalCost.toFixed(2)}€</small></h4>
              <button className="submit-button" onClick={handleProceedToPayment}>
                Weiter zur Zahlung
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Warenkorb;
