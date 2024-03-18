import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Monitoreo from './Pages/Monitoreo'
import Registro_ataque from './Pages/Registro_ataque'
import Registro_malware from './Pages/Registro_malware'
import Registro_phishing from './Pages/Registro_phising'
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
  /*
    const theme = {
      background: '#ffffff',
      fontFamily: 'Arial',
      headerBgColor: '#4169E1',
      headerFontColor: '#fff',
      headerFontSize: '15px',
      botBubbleColor: '#4169E1',
      botFontColor: '#fff',
      userBubbleColor: '#fff',
      userFontColor: '#4a4a4a',
    };
       <ThemeProvider theme={theme}>
                    <React.StrictMode>
                      <ChatBot steps={[
                        {
                          id: '1',
                          message: 'Necesitas informacio acerca Grupo Kapa 7?',
                          trigger: '2',
                        },
                        {
                          id: '2',
                          options: [
                            { value: 1, label: 'Grupo Kapa 7', trigger: '3' },
                          ]
                        },
                        {
                          id: '3',
                          message: 'Esta funcionando trigger 3',
                          end: true,
                        }
                      ]
  
                      } floating={true} headerTitle={"Kapa Bot"} />;
                    </React.StrictMode>
                  </ThemeProvider> */
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
            path='/SIEM'
            element={
              <ProtectAuth>
                <SIEM />
              </ProtectAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  )
}
