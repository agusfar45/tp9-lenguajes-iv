import React, { useState } from 'react';
import { rooms, pesos } from './cuartos.js';
import { cantidadNoches, diaSiguiente, fechaVisible, hoyEnSalta } from './fechas.js';

export default function Reservas() {
  const [roomId, setRoomId] = useState('');
  const [ingreso, setIngreso] = useState('');
  const [salida, setSalida] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const [error, setError] = useState('');

  const habitacion = rooms.find((room) => room.id === roomId);
  const hoy = hoyEnSalta();
  const salidaMinima = diaSiguiente(ingreso >= hoy ? ingreso : hoy);
  const noches = cantidadNoches(ingreso, salida);
  const rangoValido = ingreso >= hoy && Number.isInteger(noches) && noches > 0;

  function limpiarMensajes() {
    setConfirmacion('');
    setError('');
  }

  function cambiarIngreso(event) {
    const fecha = event.target.value;
    setIngreso(fecha);
    if (!fecha || salida <= fecha) setSalida('');
    limpiarMensajes();
  }

  function reservar(event) {
    event.preventDefault();
    if (!habitacion || ingreso < hoyEnSalta() || !rangoValido) {
      setError('Elegí una habitación y un rango válido. La salida debe ser posterior al ingreso.');
      return;
    }
    const mensaje = `Reserva de demostración confirmada. Habitación: ${habitacion.name}. Ingreso: ${fechaVisible(ingreso)}. Salida: ${fechaVisible(salida)}. Total: ${pesos(noches * habitacion.price)}.`;
    setError('');
    setConfirmacion(mensaje);
    window.alert(mensaje);
  }

  return (
    <>
      <h1>Reservas</h1>
      <form onSubmit={reservar}>
        <fieldset className="rooms">
          <legend>Elegí una habitación</legend>
          {rooms.map((room) => (
            <label className="room" key={room.id}>
              <input type="radio" name="habitacion" value={room.id} required
                checked={roomId === room.id}
                onChange={() => { setRoomId(room.id); limpiarMensajes(); }} />
              <span className="room-code">Habitación {room.code}</span>
              <strong>{room.name}</strong>
              <span>{room.detail}</span>
              <span>{pesos(room.price)} por noche</span>
            </label>
          ))}
        </fieldset>
        <section className="panel" aria-labelledby="fechas-titulo">
          <h2 id="fechas-titulo">Fechas de la estadía</h2>
          <div className="bounds">
            <label>Ingreso
              <input type="date" required min={hoy} value={ingreso} onChange={cambiarIngreso} />
            </label>
            <label>Salida
              <input type="date" required min={salidaMinima} value={salida}
                onChange={(event) => { setSalida(event.target.value); limpiarMensajes(); }} />
            </label>
          </div>
          {habitacion && rangoValido && <p>{noches} {noches === 1 ? 'noche' : 'noches'} · {pesos(noches * habitacion.price)}</p>}
          <button type="submit">Confirmar reserva</button>
          {error && <p role="alert">{error}</p>}
          <output aria-live="polite">{confirmacion}</output>
        </section>
      </form>
    </>
  );
}
