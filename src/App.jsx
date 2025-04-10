import React from "react";
import Inicio from "./Components/Inicio";
import PantallaPrincipal from "./Components/PantallaPrincipal";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Routes,
} from "react-router-dom";
import PantallaCasaCampaña from "./Components/PantallaCasaCampaña";
import PantallaLogistica from "./Components/PantallaLogistica";
import PantallaRedes from "./Components/PantallaRedes";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/home/:codigo" element={<PantallaPrincipal />} />
        <Route
          path="/casaCampaña/:codigo"
          element={<PantallaCasaCampaña />}
        />
        <Route
          path="/logistica/:codigo"
          element={<PantallaLogistica />}
        />
        <Route
          path="/redes/:codigo"
          element={<PantallaRedes />}
        />
      </Routes>
    </Router>
  );
}
