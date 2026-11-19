import React from 'react';
import { Link } from 'react-router-dom';
export default function Inicio(){
  return <section className="hotel-hero"><small>Salta, Argentina</small><h1>Posada del Valle</h1>
    <p>Elegí tu habitación y las fechas de tu estadía.</p><Link className="button" to="/reservas">Ver habitaciones</Link></section>;
}
