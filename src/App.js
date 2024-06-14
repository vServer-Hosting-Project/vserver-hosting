import React from "react"; 
import Abwicklung from "./pages/Abwicklung";
import Bestell from "./pages/Bestell";
import Home from "./pages/Home";
import Support from "./pages/Support";
import Warenkorb from "./pages/Warenkorb";
import Konfigurator from "./pages/Configurator";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Configurator from "./pages/Configurator";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/abwicklung" element={<Abwicklung />} />
        <Route path="/bestell" element={<Bestell />} />
        <Route path="/support" element={<Support />} />
        <Route path="/warenkorb" element={<Warenkorb />} />
        <Route path="/konfigurator" element={<Configurator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App