import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Monitoreo from './Pages/Monitoreo'
import Registro_ataque from './Pages/Registro_ataque'
import SIEM from './Pages/SIEM'
import Ajustes from './Pages/Ajustes'
import Login from './Pages/Login'
import Portal from './Pages/Portal'
import Registro from './Pages/Registro'
import Perfil from './Pages/Perfil'
import SIEM_platform from './Pages/SIEM_platform'
import { AuthProvider } from './Context/AuthContext'
import { ProtectAuth } from './Context/ProtectAuth'
import ResetPassword from './Pages/ResetPassword'


export default function App() {
   return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/Resetpw' element={<ResetPassword />} />
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
            path='/SIEM'
            element={
              <ProtectAuth>
                <SIEM />
              </ProtectAuth>
            }
          />
          <Route
            path='/subscribe'
            element={
              <ProtectAuth>
                <SIEM_platform />
              </ProtectAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  )
}
