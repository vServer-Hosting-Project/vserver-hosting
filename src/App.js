import React, { useState } from "react"; 
import Home from "./pages/Home";
import Support from "./pages/Support";
import Warenkorb from "./pages/Warenkorb";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Configurator from "./pages/Configurator";
import Navbar from "./components/Navbar";

function App() {
  const [orders, setOrders] = useState([]);

  const addOrder = (order) => {
    setOrders([...orders, order]);
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/support" element={<Support />} />
        <Route path="/warenkorb" element={<Warenkorb orders={orders} />} />
        <Route path="/konfigurator" element={<Configurator addOrder={addOrder} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
