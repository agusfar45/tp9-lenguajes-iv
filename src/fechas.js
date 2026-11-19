const DAY_MS = 86_400_000;
const saltaDate = new Intl.DateTimeFormat('es-AR', {
  timeZone: 'America/Argentina/Salta',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});
const displayDate = new Intl.DateTimeFormat('es-AR', { timeZone: 'UTC' });

export function hoyEnSalta(now = new Date()) {
  const parts = saltaDate.formatToParts(now);
  const part = (type) => parts.find((item) => item.type === type).value;
  return [part('year'), part('month'), part('day')].join('-');
}

export function diaSiguiente(date) {
  return new Date(Date.parse(date) + DAY_MS).toISOString().slice(0, 10);
}

export function cantidadNoches(ingreso, salida) {
  return (Date.parse(salida) - Date.parse(ingreso)) / DAY_MS;
}

export function fechaVisible(date) {
  return displayDate.format(new Date(date));
}
