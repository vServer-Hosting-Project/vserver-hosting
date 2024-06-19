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

  return (
    <Account>
    <BrowserRouter>
    <Status />
      <Navbar onLoginOpen={openLogin} onRegisterOpen={openRegister} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/support" element={<Support />} />
        <Route path="/warenkorb" element={<Warenkorb orders={orders} />} />
        <Route path="/konfigurator" element={<Configurator addOrder={addOrder} />} />
      </Routes>
      <Login isOpen={showLogin} onRequestClose={closeLogin} onRegisterOpen={openRegister} />
      <Register isOpen={showRegister} onRequestClose={closeRegister} onLoginOpen={openLogin} />
    </BrowserRouter>
    </Account>
  );
}

export default App;
