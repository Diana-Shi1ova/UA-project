//import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useEffect } from 'react';
import './App.css'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Busqueda from './pages/Busqueda';
import Asset from './pages/Asset';
import Perfil from './pages/Perfil';
import MisDatos from './pages/MisDatos';
import CambioContrasenya from './pages/CambioContrasenya';
import EliminarCuenta from './pages/EliminarCuenta';
import SubirAsset from './pages/SubirAsset';
import Historial from './pages/Historial';
import Favoritos from './pages/Favoritos';

function App() {
  //const [count, setCount] = useState(0)

  useEffect(() => {
    document.querySelectorAll('svg').forEach(svg => {
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('focusable', 'false');
    });
  }, []);

  return (
    <>
      <Router>
          <Routes>
            <Route path='/' element={<Inicio/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/registro' element={<Registro/>}/>
            <Route path='/buscar' element={<Busqueda/>}/>
            <Route path='/buscar/:category' element={<Busqueda/>}/>
            <Route path='/asset/:id' element={<Asset/>}/>
            <Route path='/perfil' element={<Perfil/>}/>
            <Route path='/mis-datos' element={<MisDatos/>}/>
            <Route path='/mis-datos/cambio-contrasenya' element={<CambioContrasenya/>}/>
            <Route path='/mis-datos/eliminar-cuenta' element={<EliminarCuenta/>}/>
            <Route path='/subir-asset' element={<SubirAsset/>}/>
            <Route path='/modificar-asset/:id' element={<SubirAsset/>}/>
            <Route path='/historial' element={<Historial/>}/>
            <Route path='/favoritos' element={<Favoritos/>}/>
          </Routes>
      </Router>
    </>
  )
}

export default App
