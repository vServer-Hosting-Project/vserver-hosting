import React, { useState, useContext, useEffect } from 'react';
import '../App.css';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login'; 
import { AccountContext } from '../components/Accounts';
import Register from '../components/Register';
import Confirm from '../components/Confirm';
import '../assets/style/Rechnung.css'

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

function Zahlung({ orders, submitOrder }) {
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    phone: '',
    email: '',
    discountCode: '',
    title: '',
    postalCode: ''
  });
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountError, setDiscountError] = useState('');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [paypalKey, setPaypalKey] = useState(0); // State for forcing PayPal button re-render

  const { isLoggedIn } = useContext(AccountContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {})

  const applyDiscountCode = () => {
    if (customerData.discountCode === 'ts24') {
      setDiscountApplied(true);
      setDiscountError('');
      setPaypalKey(prevKey => prevKey + 1); // Update PayPal key to force re-render
      console.log("Discount applied. Total cost: ", getTotalCost());
    } else {
      setDiscountApplied(false);
      setDiscountError('Ungültiger Gutscheincode');
      setPaypalKey(prevKey => prevKey + 1); // Update PayPal key to force re-render
    }
  };

  const removeDiscountCode = () => {
    setCustomerData(prevData => ({
      ...prevData,
      discountCode: ''
    }));
    setDiscountApplied(false);
    setDiscountError('');
    setPaypalKey(prevKey => prevKey + 1); // Update PayPal key to force re-render
    console.log("Discount removed. Total cost: ", getTotalCost());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setIsLoginOpen(true);
    } else {
      submitOrder(customerData);
      const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      navigate('/bestellung', { state: { customerData, orders, orderNumber } });
    }
  };

  const originalTotalCost = orders.reduce((acc, order) => {
    const instance = order.instanceType ? instanceDetails[order.instanceType] : null;
    if (!instance) {
      console.error(`Instance type ${order.instanceType} not found in instanceDetails`);
      return acc;
    }
    const instanceCost = instance.price;
    const storageCost = calculateStorageCost(order.storage);
    return acc + instanceCost + storageCost;
  }, 0);

  const discountAmount = discountApplied ? originalTotalCost - 0.01 : 0;
  const discountedTotalCost = originalTotalCost - discountAmount;
  const taxRate = 0.19; 
  const taxAmount = discountedTotalCost * taxRate;
  const totalCost = (discountApplied ? 0.01 : discountedTotalCost + taxAmount).toFixed(2).replace('.', ',');

  const getTotalCost = () => (discountApplied ? discountedTotalCost + taxAmount : originalTotalCost + taxAmount).toFixed(2).replace('.', ',');

  return (
    <div className="container payment-container">
      <header className="header">
        <h3>Zahlungsinformationen</h3>
      </header>
      <main className="payment">
        <div className="invoice">
          <h4>Rechnung</h4>
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
              {orders.map((order, index) => {
                const instance = order.instanceType ? instanceDetails[order.instanceType] : null;
                if (!instance) {
                  console.error(`Instance type ${order.instanceType} not found in instanceDetails`);
                  return null;
                }
                const storageCost = calculateStorageCost(order.storage);
                const totalInstanceCost = instance.price + storageCost;

                return (
                  <tr key={index}>
                    <td>{order.instanceType}</td>
                    <td>{instance.vCPUs}</td>
                    <td>{instance.RAM}</td>
                    <td>{order.os}</td>
                    <td>{order.osVersion}</td>
                    <td>{order.storage}</td>
                    <td>{totalInstanceCost.toFixed(2).replace('.', ',')}€</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="discount-code-container">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
              <label htmlFor="discountCode" className="discount-code-label" style={{ alignSelf: 'flex-start' }}>Gutscheincode:</label>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <input
                  type="text"
                  id="discountCode"
                  name="discountCode"
                  value={customerData.discountCode}
                  onChange={handleChange}
                  className="discount-code-input"
                  style={{ flex: '1' }}
                />
                <button type="button" onClick={applyDiscountCode} className="apply-discount-button">Anwenden</button>
              </div>
            </div>
            {discountError && <p className="error-message">{discountError}</p>}
            {discountApplied && (
              <button type="button" onClick={removeDiscountCode} className="remove-discount-button">Entfernen</button>
            )}
          </div>
          <div className="invoice-summary">
            <p>Zwischensumme: {originalTotalCost.toFixed(2).replace('.', ',')}€</p>
            {discountApplied && <p>Rabatt: -{discountAmount.toFixed(2).replace('.', ',')}€</p>}
            <p>MwSt (19%): {taxAmount.toFixed(2).replace('.', ',')}€</p>
            <p><strong>Gesamtbetrag: {totalCost.replace('.', ',')}€</strong></p>
          </div>
        </div>
        <div className="customer-data-container">
          <h4>Rechnungs- und Lieferadressen angeben</h4>
          <form onSubmit={handleSubmit} className="payment-form">
            <div className="form-group">
              <label htmlFor="title" className="title-label">Anrede*</label>
              <select id="title" name="title" value={customerData.title} onChange={handleChange} required>
                <option value="">Bitte auswählen</option>
                <option value="Herr">Herr</option>
                <option value="Frau">Frau</option>
              </select>
            </div>
            <div className="form-row">
              <div className="form-group-firstname">
                <label htmlFor="firstName" className="title-name">Vorname:*</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={customerData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group-surname">
                <label htmlFor="lastName">Nachname:*</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={customerData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="street">Straße und Hausnummer:*</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={customerData.street}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="postalCode">PLZ und Ort:*</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={customerData.postalCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Telefon:*</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={customerData.phone}
                  onChange={handleChange}
                  required
                  className="small-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-Mail:*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={customerData.email}
                  onChange={handleChange}
                  required
                  className="small-input"
                />
              </div>
            </div>
            <div className="button-container">
              <button type="submit" className="submit-button">Bestellung abschicken</button>
              <div className="paypal-button-container">
                <PayPalScriptProvider key={paypalKey} options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID, "currency": "EUR" }}>
                  <PayPalButtons
                    fundingSource='paypal'
                    createOrder={(data, actions) => {
                      console.log("Total Cost: ", getTotalCost());
                      return actions.order.create({
                        purchase_units: [{
                          amount: {
                            value: getTotalCost().replace(',', '.')
                          }
                        }]
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
                        navigate('/bestellung', { state: { customerData, orders, orderNumber } });
                        alert("Transaction completed by " + details.payer.name.given_name);
                      });
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            </div>
          </form>
        </div>
        <Login isOpen={isLoginOpen} onRequestClose={() => setIsLoginOpen(false)} onRegisterOpen={() => setIsRegisterOpen(true)} />
        <Register isOpen={isRegisterOpen} 
          onRequestClose={() => {setIsRegisterOpen(false); setIsLoginOpen(true);}} 
          onConfirmOpen={() => {
          setIsConfirmOpen(true);
          setIsLoginOpen(false);
          }} 
        />
        <Confirm isOpen={isConfirmOpen} onRequestClose={() => setIsConfirmOpen(false)} />
      </main>
    </div>
  );
}

export default Zahlung;
