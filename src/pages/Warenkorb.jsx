import React, { useState } from 'react';
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

function Warenkorb({ orders, removeOrder, clearOrders }) {
  const [discountCode, setDiscountCode] = useState('');
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [discountError, setDiscountError] = useState('');

  const originalTotalCost = orders.reduce((acc, order) => {
    const instanceCost = instanceDetails[order.instanceType].price;
    const storageCost = calculateStorageCost(order.storage);
    return acc + instanceCost + storageCost;
  }, 0);

  const discountAmount = discountCode === 'ts24' && isDiscountApplied ? originalTotalCost : 0;
  const totalCost = originalTotalCost - discountAmount;

  const applyDiscountCode = () => {
    if (discountCode === 'ts24') {
      setIsDiscountApplied(true);
      setDiscountError('');
    } else {
      setIsDiscountApplied(false);
      setDiscountError('Ungültiger Gutscheincode');
    }
  };

  const removeDiscountCode = () => {
    setDiscountCode('');
    setIsDiscountApplied(false);
    setDiscountError('');
  };

  const submitOrders = () => {
    console.log('Sending orders:', orders);  // Hinzugefügt zur Überprüfung der gesendeten Daten
    fetch('http://localhost:5000/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orders),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      clearOrders();  // Leert den Warenkorb nach erfolgreicher Bestellung
    })
    .catch((error) => {
      console.error('Error:', error);
      // Optional: Handle error (e.g., show an error message)
    });
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
            <div className="discount-code-container">
              <label htmlFor="discount-code">Gutscheincode:</label>
              <input
                type="text"
                id="discount-code"
                className="discount-code-input"
                placeholder="Gutscheincode eingeben"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <button className="apply-discount-button" onClick={applyDiscountCode}>
                Anwenden
              </button>
              {discountError && <p className="error-message">{discountError}</p>}
            </div>
            <div className="invoice-footer">
              <h4>Betrag: <small>{originalTotalCost.toFixed(2)}€</small></h4>
              {isDiscountApplied && (
                <>
                  <div className="discount-message">
                    <p>Rabatt: <small>-{discountAmount.toFixed(2)}€</small></p>
                    <button className="remove-discount-button" onClick={removeDiscountCode}>
                      Entfernen
                    </button>
                  </div>
                  <h4>Zu zahlender Betrag: <strong>{totalCost.toFixed(2)}€</strong></h4>
                </>
              )}
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
