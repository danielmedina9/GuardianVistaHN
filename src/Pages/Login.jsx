import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SecurityIcon from '@mui/icons-material/Security';
import { signInWithEmailAndPassword } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Security Context/AuthContext";
import Modal from '@mui/material/Modal';
import '../App.css';
import { Alert, CardContent } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.kapa7.com/">
        Grupo Kapa 7
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState([]);
  const { loginWithGoogle, resetPassword } = useAuth(); 


  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCrdential) => {
        console.log(userCrdential)
        localStorage.setItem("userid", userCrdential.user.uid);
        navigate('/')
      }).catch((error) => {
        console.log(error);        
        if (error.code == "auth/invalid-email"){
           alert("Correo electrónico invalido")
        }else if (error.code == "auth/operation-not-allowed"){
          alert("Operacion no es valida.");
        }else if (error.code == "auth/missing-password"){
          alert("Falta ingresar contraseña")
        }else if (error.code == "auth/invalid-credential"){
          alert("Correo/contraseña incorrecta")
        }
      })
  };

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
 /*
  const handleResetpassword = async () => {
    await resetPassword(email);
    console.log("Password reset email sent");
  }*/

  return (

    <>     

      <Box className="background_LogReg" >
        {/*<Sidebar/>*/}
        <Box component="main" sx={{ p: 7 }}  >
          <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" >
              <CssBaseline />
              <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                  backgroundImage: 'url(https://img.computing.es/wp-content/uploads/2024/01/02103407/NTT-Data-ciberseguridad-1.jpg)',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <Grid item sm={5} md={5} component={Paper} elevation={6} >
                <Box
                  sx={{
                    my: 22,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography component="h1" variant="h4"> GUARDIAN VISTA HN {<SecurityIcon className="svg_icons" />} </Typography>
                  <Avatar sx={{ m: 2, bgcolor: '#232b2b' }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Iniciar sesión
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit} noValidate >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Correo electrónico"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Contraseña"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href="" variant="body2" >
                          Olvidaste tu contraseña?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href="/Registro" variant="body2">
                          {"No tienes cuenta? Regístrate"}
                        </Link>
                      </Grid>
                    </Grid>
                    <Grid sx={{ my: 3 }}>
                      <Button startIcon={<GoogleIcon/>}variant="contained" onClick={handleGoogleSignin}>continuar con Google</Button>
                    </Grid>
                    <Copyright sx={{}}/>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </ThemeProvider>
        </Box>
      </Box>
    </>
  )
}