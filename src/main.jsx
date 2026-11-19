import React from 'react';
import {createRoot} from 'react-dom/client';
import {HashRouter,Routes,Route,Link} from 'react-router-dom';
import Inicio from './Inicio.jsx';
import Header from './Header.jsx';
import AcercaDeNosotros from './AcercaDeNosotros.jsx';
import Reservas from './Reservas.jsx';
import './style.css';

createRoot(document.getElementById('root')).render(<HashRouter><Header/><main>
  <Routes>
    <Route path="/" element={<Inicio/>}/>
    <Route path="/acerca" element={<AcercaDeNosotros/>}/>
    <Route path="/reservas" element={<Reservas/>}/>
    <Route path="*" element={<><h1>Página no encontrada</h1><Link to="/">Volver al inicio</Link></>}/>
  </Routes>
</main><footer>Posada del Valle · Trabajo práctico de Lenguajes IV</footer></HashRouter>);
