<<<<<<< Updated upstream
import React from "react"; 
import Abwicklung from "./pages/Abwicklung";
import Bestell from "./pages/Bestell";
=======
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from 'axios';

>>>>>>> Stashed changes
import Home from "./pages/Home";
import Support from "./pages/Support";
import SupportTickets from "./pages/SupportTickets"; // Importiere die SupportTickets-Komponente
import Warenkorb from "./pages/Warenkorb";
<<<<<<< Updated upstream
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
=======
import Configurator from "./pages/Configurator";
import Navbar from "./components/Navbar";

function App() {
  const [orders, setOrders] = useState([]);

  // Funktion zum Hinzufügen einer Bestellung
  const addOrder = async (order) => {
    try {
      // HTTP-POST-Anfrage an den Server senden
      await axios.post('http://localhost:5000/api/order', order);
      // Bestellung zur lokalen State hinzufügen
      setOrders([...orders, order]);
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

>>>>>>> Stashed changes
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/abwicklung" element={<Abwicklung />} />
        <Route path="/bestell" element={<Bestell />} />
        <Route path="/support" element={<Support />} />
<<<<<<< Updated upstream
        <Route path="/support-tickets" element={<SupportTickets />} /> {/* Neue Route für SupportTickets */}
        <Route path="/warenkorb" element={<Warenkorb />} />
=======
        {/* Warenkorb-Komponente mit Bestellungen als Prop übergeben */}
        <Route path="/warenkorb" element={<Warenkorb orders={orders} />} />
        {/* Konfigurator-Komponente mit addOrder-Funktion als Prop übergeben */}
        <Route path="/konfigurator" element={<Configurator addOrder={addOrder} />} />
>>>>>>> Stashed changes
      </Routes>
    </BrowserRouter>
  );
}

export default App;
