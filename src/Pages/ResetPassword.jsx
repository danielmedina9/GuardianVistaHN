import {
    Button,
    Container,
    CssBaseline,
    Typography,
    TextField,
    Grid,
  } from "@mui/material";
  import Link from "@mui/material/Link";
  import { useAuth } from "../Context/AuthContext";
  import { useState } from "react";
  
  export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState([]);
    const { resetPassword } = useAuth();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      resetPassword(email)
        .then(() => {
          alert("Se ha enviado un correo para restablecer la contraseña");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    };
  
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <Typography component="h1" variant="h5">
            Restablecer contraseña
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Enviar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/Login" variant="body2">
                  Iniciar sesión
                </Link>
              </Grid>
              <Grid item>
                <Link href="/Registro" variant="body2">
                  {"¿No tienes una cuenta? Regístrate"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
  