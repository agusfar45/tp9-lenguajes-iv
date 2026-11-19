export const rooms = [
  {id:'patio', name:'Patio', detail:'Cama doble · 2 huéspedes', price:68000, code:'01'},
  {id:'cerro', name:'Vista al cerro', detail:'Cama queen · 2 huéspedes', price:81000, code:'02'},
  {id:'familiar', name:'Familiar', detail:'Dos camas dobles · 4 huéspedes', price:102000, code:'03'},
  {id:'suite', name:'Suite del valle', detail:'Cama king · 2 huéspedes', price:124000, code:'04'},
];
export const pesos = value => new Intl.NumberFormat('es-AR', {style:'currency',currency:'ARS',maximumFractionDigits:0}).format(value);
