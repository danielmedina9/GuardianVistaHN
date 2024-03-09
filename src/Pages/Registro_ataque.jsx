import React from "react";
import Sidebar from "../Components/Sidebar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabla from "../Components/Tabla";
//import Divider from '@mui/material/Divider';

export default function Registro_ataque() {
  return (
    <>
      <Box sx={{ display: "Flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 12 }}>
          <Typography component="h1" variant="h4">
            REGISTRO DE ATAQUES IPS|IDS
          </Typography>
          <Box>
            <Box sx={{ mx: 0, p: 4 }}>
              <Tabla />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
