import React from 'react';
import { Link } from 'react-router-dom';
import hotel from './assets/hotel.svg';

const servicios = [
  ['Desayuno regional', 'Tamales, humitas en temporada, quesillo con cayote y café de filtro.'],
  ['Patio con fuente', 'Un patio de adobe con galería de arcos para leer o tomar mate.'],
  ['Wi-Fi en toda la casa', 'Conexión estable en habitaciones y espacios comunes.'],
  ['Traslados', 'Coordinamos traslados al aeropuerto y excursiones a Cafayate.'],
  ['Textiles artesanales', 'Mantas y aguayos tejidos por artesanas del Valle Calchaquí.'],
  ['Atención 24 h', 'Recepción disponible día y noche para lo que necesites.'],
];

const datos = [
  ['Ingreso', 'desde las 14 h'],
  ['Salida', 'hasta las 10 h'],
  ['Centro histórico', '10 min'],
  ['Aeropuerto', '15 min'],
];

export default function AcercaDeNosotros() {
  return (
    <>
      <section className="contenedor acerca">
        <div>
          <p className="etiqueta">Nuestra historia</p>
          <h1>Una casona de adobe con <em>alma salteña</em></h1>
          <p>
            Posada del Valle es una casona de estilo colonial con galería de arcos, techos de teja
            y un patio central. Tiene cuatro habitaciones, cada una con su propio carácter y
            textiles hechos a mano.
          </p>
          <p>
            Es un hotel ficticio creado para el trabajo práctico 9 de Lenguajes IV. El sitio
            permite elegir una habitación y simular una reserva por rango de fechas.
          </p>
          <Link className="boton" to="/reservas">Ver habitaciones</Link>
        </div>
        <figure className="arco acerca-imagen">
          <img src={hotel} alt="Ilustración de la fachada de la posada" />
        </figure>
      </section>

      <section className="contenedor">
        <h2 className="titulo-simple">Servicios</h2>
        <ul className="servicios">
          {servicios.map(([titulo, texto]) => (
            <li key={titulo}>
              <strong>{titulo}</strong>
              <p>{texto}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="contenedor ubicacion">
        <div>
          <p className="etiqueta">Ubicación</p>
          <h2>Cerca de todo, <em>lejos del ruido</em></h2>
          <p>
            Estamos en una calle tranquila al pie del cerro San Bernardo, a pocas cuadras
            del teleférico y a diez minutos del casco histórico.
          </p>
        </div>
        <dl>
          {datos.map(([nombre, valor]) => (
            <div key={nombre}>
              <dt>{nombre}</dt>
              <dd>{valor}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
