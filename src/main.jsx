import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Inicio from './Inicio.jsx';
import Header from './Header.jsx';
import AcercaDeNosotros from './AcercaDeNosotros.jsx';
import Reservas from './Reservas.jsx';
import './style.css';

// Al cambiar de página, vuelve al principio.
function VolverArriba() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <VolverArriba />
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/acerca" element={<AcercaDeNosotros />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="*" element={
          <section className="contenedor vacio">
            <h1>Página no encontrada</h1>
            <Link className="boton" to="/">Volver al inicio</Link>
          </section>
        } />
      </Routes>
    </main>
    <footer className="pie">
      <div className="aguayo" aria-hidden="true" />
      <div className="contenedor pie-fila">
        <div>
          <strong className="pie-marca">Posada <em>del Valle</em></strong>
          <p>Hotel ficticio en Salta, Argentina.</p>
        </div>
        <p>Trabajo práctico 9 · Lenguajes IV · UCASAL 2026</p>
      </div>
    </footer>
  </HashRouter>,
);
