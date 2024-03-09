import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Monitoreo from './Pages/Monitoreo'
import Registro_ataque from './Pages/Registro_ataque'
import Registro_malware from './Pages/Registro_malware'
import Registro_phishing from './Pages/Registro_phising'
import Subscrption from './Pages/Subscrption'
import Ajustes from './Pages/Ajustes'
import Login from './Pages/Login'
import Portal from './Pages/Portal'
import Registro from './Pages/Registro'
import Perfil from './Pages/Perfil'
import { AuthProvider } from './Context/AuthContext'
import { ProtectAuth } from './Context/ProtectAuth'

export default function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/Registro' element={<Registro />} />
          <Route
            path='/'
            element={
              <ProtectAuth>
                <Monitoreo />
              </ProtectAuth>
            }
          />
          <Route
            path='/Ciberataques'
            element={
              <ProtectAuth>
                <Registro_ataque />
              </ProtectAuth>
            }
          />
          <Route
            path='/Malware'
            element={
              <ProtectAuth>
                <Registro_malware />
              </ProtectAuth>
            }
          />
          <Route
            path='/Phishing'
            element={
              <ProtectAuth>
                <Registro_phishing />
              </ProtectAuth>
            }
          />
          <Route
            path='/Portal'
            element={
              <ProtectAuth>
                <Portal />
              </ProtectAuth>
            }
          />
          <Route
            path='/Perfil'
            element={
              <ProtectAuth>
                <Perfil />
              </ProtectAuth>
            }
          />
          <Route
            path='/Ajustes'
            element={
              <ProtectAuth>
                <Ajustes />
              </ProtectAuth>
            }
          />
          <Route
            path='/Subscrption'
            element={
              <ProtectAuth>
                <Subscrption />
              </ProtectAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  )
}
