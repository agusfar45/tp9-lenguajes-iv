import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="encabezado">
      <div className="contenedor encabezado-fila">
        <Link to="/" className="marca" aria-label="Posada del Valle, ir al inicio">
          <svg viewBox="0 0 40 40" aria-hidden="true" className="marca-icono">
            <circle cx="27" cy="12" r="6" fill="#d99a3d" />
            <path d="M2 34 L14 15 L21 25 L26 18 L38 34Z" fill="currentColor" />
          </svg>
          <span>Posada <em>del Valle</em></span>
        </Link>
        <nav aria-label="Navegación principal" className="menu">
          <NavLink to="/" end>Inicio</NavLink>
          <NavLink to="/acerca">Acerca de nosotros</NavLink>
          <NavLink to="/reservas">Reservas</NavLink>
        </nav>
      </div>
      <div className="aguayo" aria-hidden="true" />
    </header>
  );
}
