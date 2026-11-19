import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { rooms, pesos } from './cuartos.js';
import {
  cantidadNoches, diasDelMes, fechaCorta, fechaVisible, hoyEnSalta, nombreMes, sumarMeses,
} from './fechas.js';

const DIAS = ['lu', 'ma', 'mi', 'ju', 'vi', 'sá', 'do'];

// Calendario de dos meses para elegir un rango: primer clic = ingreso, segundo = salida.
function Calendario({ hoy, ingreso, salida, onElegir }) {
  const [mes, setMes] = useState(hoy.slice(0, 7));
  const [hover, setHover] = useState('');
  const fin = salida || (ingreso && hover > ingreso ? hover : '');

  return (
    <div className="calendario">
      <div className="calendario-nav">
        <button type="button" className="icono" aria-label="Mes anterior"
          disabled={mes <= hoy.slice(0, 7)} onClick={() => setMes(sumarMeses(mes, -1))}>‹</button>
        <button type="button" className="icono" aria-label="Mes siguiente"
          onClick={() => setMes(sumarMeses(mes, 1))}>›</button>
      </div>
      <div className="meses" onMouseLeave={() => setHover('')}>
        {[mes, sumarMeses(mes, 1)].map((m) => (
          <div className="mes" key={m}>
            <h3>{nombreMes(m)}</h3>
            <div className="grilla">
              {DIAS.map((d) => <span className="dia-semana" key={d}>{d}</span>)}
              {diasDelMes(m).map((fecha, i) => {
                if (!fecha) return <span key={`vacio-${i}`} />;
                const clases = ['dia'];
                if (fecha === hoy) clases.push('hoy');
                if (fecha === ingreso) clases.push('inicio');
                if (fecha === fin) clases.push('fin');
                if (ingreso && fin) {
                  if (fecha > ingreso && fecha < fin) clases.push('en-rango');
                  if (fecha === ingreso || fecha === fin) clases.push('con-rango');
                  if (!salida) clases.push('tentativo');
                }
                return (
                  <button type="button" key={fecha} className={clases.join(' ')}
                    disabled={fecha < hoy} aria-label={fechaVisible(fecha)}
                    aria-pressed={fecha === ingreso || fecha === salida}
                    onClick={() => onElegir(fecha)} onMouseEnter={() => setHover(fecha)}>
                    {Number(fecha.slice(8))}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Reservas() {
  const location = useLocation();
  const [roomId, setRoomId] = useState(location.state?.habitacion ?? '');
  const [ingreso, setIngreso] = useState('');
  const [salida, setSalida] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const [error, setError] = useState('');

  const hoy = hoyEnSalta();
  const habitacion = rooms.find((room) => room.id === roomId);
  const noches = cantidadNoches(ingreso, salida);
  const rangoValido = ingreso >= hoy && Number.isInteger(noches) && noches > 0;
  const total = habitacion && rangoValido ? noches * habitacion.price : 0;

  function limpiarMensajes() {
    setConfirmacion('');
    setError('');
  }

  function elegirFecha(fecha) {
    if (!ingreso || salida || fecha <= ingreso) {
      setIngreso(fecha);
      setSalida('');
    } else {
      setSalida(fecha);
    }
    limpiarMensajes();
  }

  function reservar(event) {
    event.preventDefault();
    if (!habitacion) {
      setError('Elegí una habitación.');
      return;
    }
    if (!rangoValido || ingreso < hoyEnSalta()) {
      setError('Marcá en el calendario el día de ingreso y después el de salida.');
      return;
    }
    const mensaje = `Reserva de demostración confirmada. Habitación: ${habitacion.name}. Ingreso: ${fechaVisible(ingreso)}. Salida: ${fechaVisible(salida)}. Total: ${pesos(total)}.`;
    setError('');
    setConfirmacion(mensaje);
    window.alert(mensaje);
  }

  return (
    <section className="contenedor">
      <header className="titulo-pagina">
        <p className="etiqueta">Reservas</p>
        <h1>Elegí tu <em>habitación</em> y tus fechas</h1>
      </header>

      <form onSubmit={reservar} className="reserva-layout" noValidate>
        <div>
          <fieldset className="paso">
            <legend><span className="paso-num">1</span>Habitación</legend>
            <div className="habitaciones">
              {rooms.map((room) => (
                <label className="habitacion" key={room.id}>
                  <input type="radio" name="habitacion" value={room.id}
                    checked={roomId === room.id}
                    onChange={() => { setRoomId(room.id); limpiarMensajes(); }} />
                  <span className="arco habitacion-imagen">
                    <img src={room.image} alt="" loading="lazy" />
                  </span>
                  <span className="habitacion-info">
                    <span className="numero">Habitación {room.code}</span>
                    <strong>{room.name}</strong>
                    <span>{room.detail}</span>
                    <span className="precio">{pesos(room.price)} <small>/ noche</small></span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="paso">
            <legend><span className="paso-num">2</span>Fechas de la estadía</legend>
            <p className="ayuda">Tocá el día de ingreso y después el de salida.</p>
            <Calendario hoy={hoy} ingreso={ingreso} salida={salida} onElegir={elegirFecha} />
          </fieldset>
        </div>

        <aside className="ticket">
          <div className="ticket-cabecera">
            {habitacion
              ? <img src={habitacion.image} alt={`Ilustración de la habitación ${habitacion.name}`} />
              : <p className="ticket-vacio">Elegí una habitación</p>}
          </div>
          <div className="ticket-cuerpo">
            <p className="etiqueta">Tu reserva</p>
            <h2>{habitacion ? habitacion.name : 'Sin habitación'}</h2>
            <dl className="ticket-fechas">
              <div><dt>Ingreso</dt><dd>{ingreso ? fechaCorta(ingreso) : '—'}</dd></div>
              <div><dt>Salida</dt><dd>{salida ? fechaCorta(salida) : '—'}</dd></div>
            </dl>
            <div className="ticket-corte" aria-hidden="true" />
            <p className="ticket-total">
              <span>{rangoValido ? `${noches} ${noches === 1 ? 'noche' : 'noches'}` : 'Total'}</span>
              <strong>{total ? pesos(total) : '—'}</strong>
            </p>
            <button type="submit" className="boton boton-ancho">Confirmar reserva</button>
            {error && <p role="alert" className="error">{error}</p>}
            <output aria-live="polite" className={confirmacion ? 'confirmacion' : undefined}>
              {confirmacion}
            </output>
          </div>
        </aside>
      </form>
    </section>
  );
}
