import React from "react";
import Sidebar from "../Components/Sidebar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


export default function SIEM_platform() {
  return (
    <>
      <Box sx={{ display: "Flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 12 }}>
          <Typography component="h1" variant="h4">
            SISTEMA SIEM : Empresa
          </Typography>
        </Box>
      </Box>
    </>
  );
}