import patio from './assets/patio.svg';
import cerro from './assets/cerro.svg';
import familiar from './assets/familiar.svg';
import suite from './assets/suite.svg';

export const rooms = [
  {
    id: 'patio', code: '01', name: 'Patio', price: 68000, image: patio,
    detail: 'Cama doble · 2 huéspedes',
    description: 'Abre al patio colonial, entre jazmines y una fuente de piedra.',
  },
  {
    id: 'cerro', code: '02', name: 'Vista al cerro', price: 81000, image: cerro,
    detail: 'Cama queen · 2 huéspedes',
    description: 'Un ventanal completo hacia los cerros del Valle de Lerma.',
  },
  {
    id: 'familiar', code: '03', name: 'Familiar', price: 102000, image: familiar,
    detail: 'Dos camas dobles · 4 huéspedes',
    description: 'Amplia, luminosa y pensada para viajar en familia.',
  },
  {
    id: 'suite', code: '04', name: 'Suite del valle', price: 124000, image: suite,
    detail: 'Cama king · 2 huéspedes',
    description: 'Ventanal en arco, cama king y textiles tejidos en telar.',
  },
];

export const pesos = (value) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value);
