import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import PanelLayout from './panel/layout/PanelLayout'
import Vehiculos from './panel/pages/Vehiculos'
import VehiculoDetalle from './panel/pages/VehiculoDetalle'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PanelLayout />}>
          <Route path="/panel-nuevo" element={<Vehiculos />} />
          <Route path="/panel-nuevo/vehiculos/:id" element={<VehiculoDetalle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
