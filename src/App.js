import React, { useState } from 'react';
import Home from "./pages/Home";
import Support from "./pages/Support";
import Warenkorb from "./pages/Warenkorb";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Configurator from "./pages/Configurator";
import Navbar from "./components/Navbar";
import Login from './components/Login';
import Register from './components/Register';
import { Account } from './components/Accounts';
import Status from './components/Status';

function App() {
  const [orders, setOrders] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const openLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const closeLogin = () => {
    setShowLogin(false);
  };

  const openRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const closeRegister = () => {
    setShowRegister(false);
  };

  const addOrder = (order) => {
    setOrders([...orders, order]);
  };

  const removeOrder = (index) => {
    setOrders(orders.filter((_, i) => i !== index));
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
      setOrders([]);  // Leert den Warenkorb nach erfolgreicher Bestellung
    })
    .catch((error) => {
      console.error('Error:', error);
      // Optional: Handle error (e.g., show an error message)
    });
  };

  return (
    <Account>
      <BrowserRouter>
        <Status />
        <Navbar onLoginOpen={openLogin} cartCount={orders.length} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/support" element={<Support />} />
          <Route path="/warenkorb" element={<Warenkorb orders={orders} removeOrder={removeOrder} submitOrders={submitOrders} />} />
          <Route path="/konfigurator" element={<Configurator addOrder={addOrder} />} />
        </Routes>
        <Login isOpen={showLogin} onRequestClose={closeLogin} onRegisterOpen={openRegister} />
        <Register isOpen={showRegister} onRequestClose={closeRegister} onLoginOpen={openLogin} />
      </BrowserRouter>
    </Account>
  );
}

export default App;
