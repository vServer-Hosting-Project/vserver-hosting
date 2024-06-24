import React from 'react';
import linuxLogo from '../assets/logos/linux.png';
import windowsLogo from '../assets/logos/windows.png';
import '../App.css';

const instanceDetails = {
  't2.micro': { vCPUs: 1, RAM: 1 },
  't3.small': { vCPUs: 2, RAM: 2 },
  't3.medium': { vCPUs: 2, RAM: 4 },
  't3.large': { vCPUs: 2, RAM: 8 },
  'm5.large': { vCPUs: 2, RAM: 8 },
  'm5.xlarge': { vCPUs: 4, RAM: 16 },
  'c5.large': { vCPUs: 2, RAM: 4 },
  'c5.xlarge': { vCPUs: 4, RAM: 8 }
};

function Warenkorb({ orders, removeOrder, submitOrders }) {
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
                  <th>Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.instanceType}</td>
                    <td>{instanceDetails[order.instanceType].vCPUs}</td>
                    <td>{instanceDetails[order.instanceType].RAM}</td>
                    <td>
                      <img
                        src={order.os === 'Linux' ? linuxLogo : windowsLogo}
                        alt={order.os}
                        className={order.os === 'Linux' ? 'cart-linux-logo' : 'cart-windows-logo'}
                      />
                    </td>
                    <td>{order.osVersion}</td>
                    <td>{order.storage}</td>
                    <td>
                      <button
                        className="remove-button"
                        onClick={() => removeOrder(index)}
                      >
                        Entfernen
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="invoice-footer">
              <button className="submit-button" onClick={submitOrders}>
                Bestellung abschicken
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Warenkorb;
