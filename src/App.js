import React from "react"; 
import Abwicklung from "./pages/Abwicklung";
import Bestell from "./pages/Bestell";
import Home from "./pages/Home";
import Support from "./pages/Support";
import SupportTickets from "./pages/SupportTickets"; // Importiere die SupportTickets-Komponente
import Warenkorb from "./pages/Warenkorb";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/abwicklung" element={<Abwicklung />} />
        <Route path="/bestell" element={<Bestell />} />
        <Route path="/support" element={<Support />} />
        <Route path="/support-tickets" element={<SupportTickets />} /> {/* Neue Route für SupportTickets */}
        <Route path="/warenkorb" element={<Warenkorb />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
