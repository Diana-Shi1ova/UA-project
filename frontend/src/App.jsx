//import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <Router>
          <Routes>
            <Route path='/' element={<Inicio/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/registro' element={<Registro/>}/>
            <Route path='/buscar' element={<Busqueda/>}/>
            <Route path='/asset' element={<Asset/>}/>
            <Route path='/perfil' element={<Perfil/>}/>
            <Route path='/mis-datos' element={<MisDatos/>}/>
            <Route path='/cambio-contrasenya' element={<CambioContrasenya/>}/>
          </Routes>
      </Router>
    </>
  )
}

export default App
