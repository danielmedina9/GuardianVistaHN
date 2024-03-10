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
import ResetPassword from './Pages/ResetPassword'
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

export default function App() {

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

  const steps = [
    {
      id: '1',
      message: '¿Estas interesado en ciberseguridad?',
      trigger: '2',
    },
    {
      id: '2',
      options: [
        { value: 1, label: 'Si', trigger: '4' },
        { value: 2, label: 'No', trigger:'3' },
      ],
    },
    {
      id: '3',
      message: 'Respuesta incorrecta',
      trigger: '2',
    },
    {
      id:'4',
      message:'https://www.kapa7.com/',
      end: true
    }
  ];

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
            path='/Subscrption'
            element={
              <ProtectAuth>
                <Subscrption />
              </ProtectAuth>
            }
          />
        </Routes>
       {/*<ProtectAuth>
          <ThemeProvider theme={theme}>
            <ChatBot steps={steps} floating={true} headerTitle={"Kapa Bot"}/>;
          </ThemeProvider>
          </ProtectAuth>*/}
      </AuthProvider>

    </div>
  )
}
