const DAY_MS = 86_400_000;
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
  'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

const saltaDate = new Intl.DateTimeFormat('es-AR', {
  timeZone: 'America/Argentina/Salta',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});
const displayDate = new Intl.DateTimeFormat('es-AR', { timeZone: 'UTC' });
const shortDate = new Intl.DateTimeFormat('es-AR', {
  timeZone: 'UTC', weekday: 'short', day: 'numeric', month: 'short',
});

// Fecha de hoy en Salta con formato AAAA-MM-DD.
export function hoyEnSalta(now = new Date()) {
  const parts = saltaDate.formatToParts(now);
  const part = (type) => parts.find((item) => item.type === type).value;
  return [part('year'), part('month'), part('day')].join('-');
}

export function cantidadNoches(ingreso, salida) {
  return (Date.parse(salida) - Date.parse(ingreso)) / DAY_MS;
}

export function fechaVisible(date) {
  return displayDate.format(new Date(date));
}

// Ejemplo: "jue, 19 nov"
export function fechaCorta(date) {
  return shortDate.format(new Date(date));
}

// Recibe un mes "AAAA-MM" y devuelve otro desplazado n meses.
export function sumarMeses(mes, n) {
  const [y, m] = mes.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1 + n, 1)).toISOString().slice(0, 7);
}

export function nombreMes(mes) {
  const [y, m] = mes.split('-').map(Number);
  return `${MESES[m - 1]} ${y}`;
}

// Celdas del calendario de un mes. La semana empieza el lunes;
// los huecos iniciales se devuelven como null.
export function diasDelMes(mes) {
  const [y, m] = mes.split('-').map(Number);
  const offset = (new Date(Date.UTC(y, m - 1, 1)).getUTCDay() + 6) % 7;
  const total = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const celdas = Array(offset).fill(null);
  for (let d = 1; d <= total; d++) celdas.push(`${mes}-${String(d).padStart(2, '0')}`);
  return celdas;
}
