import React from 'react';
import { NavLink } from 'react-router-dom';
export default function Header(){
  return <header><strong>Posada del Valle</strong><nav aria-label="Navegación principal">
    <NavLink to="/" end>Inicio</NavLink><NavLink to="/acerca">Acerca de nosotros</NavLink><NavLink to="/reservas">Reservas</NavLink>
  </nav></header>;
}
