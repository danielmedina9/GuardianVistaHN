import React from "react";
import Sidebar from "../Components/Sidebar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Subscripcion from "../Components/Subscripcion";

export default function Siem() {
  return (
    <Box sx={{ display: "Flex" }}>
      <Sidebar />
      <Box component="main" sx={{ p: 12,}}>
        <Typography component="h1" variant="h4">
          GUARDIAN VISTA PANEL | SISTEMA SIEM
        </Typography>
        <Box >
          <Subscripcion />
        </Box>
      </Box>
    </Box>
  );
}
