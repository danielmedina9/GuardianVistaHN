import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SecurityIcon from "@mui/icons-material/Security";
import { auth, db } from "../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import "../App.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.kapa7.com/">
        Grupo Kapa 7
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Registro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [empresa, setEmpresa] = useState("");
  // const { signup } = useAuth();
  // const [errorMessage, setErrorMessage] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        const userid = response.user.uid;
        await setDoc(doc(db, "User", userid), {
          name: name,
          surname: surName,
          emai: email,
          photoURL: "",
          uid: userid,
          empresa: empresa,
          subscribe: false,
          createdDateTime: Timestamp.now(),
          updatedDateTime: Timestamp.now(),
          subscribeDateTime: Timestamp.now(),
        });
        localStorage.setItem("userid", userid);
        navigate("/");
      })
      .catch((error) => {
        if (error.code == "auth/email-already-in-use") {
          alert("El correo que ingresaste ya esta en uso");
        } else if (error.code == "auth/missing-password") {
          alert("Falta ingresar contraseña");
        }
      });
  };

  return (
    <Box
      sx={{ display: "Flex" }}
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-photo/ultra-detailed-nebula-abstract-wallpaper-4_1562-749.jpg)",
      }}
    >
      {/*<Sidebar/>*/}
      <Box component="main" sx={{ flexGrow: 1, p: 9 }}>
        <ThemeProvider theme={defaultTheme}>
          <Grid container component="main">
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage:
                  "url(https://thelogisticsworld.com/wp-content/uploads/2023/01/ilustracion-de-seguridad-cibernetica.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 14,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h4">
                  GUARDIAN VISTA HN {<SecurityIcon className="svg_icons" />}{" "}
                </Typography>
                <Avatar sx={{ m: 2, bgcolor: "info.light" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Crear una nueva cuenta
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="Nombre"
                        autoFocus
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Apellido"
                        name="lastName"
                        autoComplete="family-name"
                        onChange={(e) => setSurName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Correo electrónico"
                        name="email"
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="empresa"
                        label="Empresa"
                        name="empresa"
                        autoComplete="user"
                        onChange={(e) => setEmpresa(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Registrarse
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="/Login" variant="body2">
                        Ya tienes una cuenta? Inicia sesión
                      </Link>
                    </Grid>
                  </Grid>
                  <Copyright sx={{ mt: 5 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      </Box>
    </Box>
  );
}
