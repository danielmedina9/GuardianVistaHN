import React from "react";
import Sidebar from "../Components/Sidebar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabla from "../Components/Tabla";
import { Button, Grid } from "@mui/material";
//import Divider from '@mui/material/Divider';

export default function Registro_ataque() {
  return (
    <>
      <Box sx={{ display: "Flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 12 }}>
          <Grid main container>
            <Grid >
              <Typography component="h1" variant="h4">
                REGISTRO DE ATAQUES
              </Typography>
            </Grid>
            <Grid sx={{mx:3}}> {/*Update data*/}
              <Button
                variant="contained"
                color="success">
                Actualizar
              </Button>
            </Grid>
          </Grid>
          <Box>
            <Box sx={{ my: 2 }}> {/*Country with more attacks*/}
              <Typography component="h5" variant="h5"> 
                PAIS CON MAS ATAQUES:
              </Typography>
            </Box>
            <Box sx={{ my: 2 }}> {/*Amount of attacks obtain*/}
              <Typography component="h5" variant="h5">
                CANTIDAD DE ATAQUES:
              </Typography>
            </Box>
            <Box sx={{ mx: 0 }}>
              <Tabla />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
