import React from 'react';
import { Link } from 'react-router-dom';
import hotel from './assets/hotel.svg';
import { rooms, pesos } from './cuartos.js';

const destacados = [
  ['Desayuno regional', 'Tamales, quesillo con cayote y pan casero cada mañana.'],
  ['Patio colonial', 'Galería de arcos, fuente de piedra y jazmines.'],
  ['A 10 minutos', 'Del centro histórico y la plaza 9 de Julio.'],
];

export default function Inicio() {
  const desde = Math.min(...rooms.map((room) => room.price));

  return (
    <>
      <section className="hero contenedor">
        <div className="hero-texto">
          <p className="etiqueta">Salta · Valle de Lerma</p>
          <h1>Dormí entre <em>cerros</em> y arcos coloniales</h1>
          <p className="hero-bajada">
            Cuatro habitaciones alrededor de un patio de adobe, con desayuno regional
            y vista a la precordillera.
          </p>
          <div className="acciones">
            <Link className="boton" to="/reservas">Reservar estadía</Link>
            <Link className="boton boton-claro" to="/acerca">Conocer la posada</Link>
          </div>
          <p className="hero-precio">Desde <strong>{pesos(desde)}</strong> por noche</p>
        </div>
        <div className="hero-visual">
          <figure className="arco hero-imagen">
            <img src={hotel} alt="Ilustración de la fachada colonial de Posada del Valle con cerros al atardecer" />
          </figure>
          <p className="sello">4 habitaciones<br />desayuno<br />incluido</p>
        </div>
      </section>

      <section className="contenedor franja" aria-label="Lo que ofrece la posada">
        {destacados.map(([titulo, texto], i) => (
          <article key={titulo}>
            <span>0{i + 1}</span>
            <h3>{titulo}</h3>
            <p>{texto}</p>
          </article>
        ))}
      </section>

      <section className="contenedor">
        <div className="titulo-seccion">
          <h2>Nuestras <em>habitaciones</em></h2>
          <Link to="/reservas">Ver disponibilidad →</Link>
        </div>
        <div className="galeria">
          {rooms.map((room) => (
            <Link to="/reservas" state={{ habitacion: room.id }} className="tarjeta-galeria" key={room.id}>
              <div className="arco">
                <img src={room.image} alt={`Ilustración de la habitación ${room.name}`} loading="lazy" />
              </div>
              <span className="numero">N.º {room.code}</span>
              <h3>{room.name}</h3>
              <p>{room.description}</p>
              <p className="tarjeta-precio">{pesos(room.price)} <small>/ noche</small></p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
