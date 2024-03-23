import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DataCompany from "../Components/DataCompany";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { Button, Grid } from "@mui/material";

export default function SiemPlatform() {
  const [empresa, setEmpresa] = useState("");

  useEffect(() => {
    getDoc(doc(db, "User", localStorage.getItem("userid"))).then((docSnap) => {
      if (docSnap.exists()) {
        setEmpresa(docSnap.data().empresa);
      } else {
        console.log("No such document!");
      }
    });
  }, []);

  return (
    <Box sx={{ display: "Flex" }}>
      <Sidebar />
      <Box component="main" sx={{ my: 4 }}>
        <Grid main container sx={{mx:30}}>
          <Grid>
            <Typography component="h1" variant="h4">
              SISTEMA SIEM : {empresa}
            </Typography>
          </Grid>
          <Grid sx={{mx:4}}>
            <Button
              variant="contained"
              color="success"
            >Actualizar</Button>
          </Grid>
        </Grid>
        <DataCompany />
      </Box>
    </Box>
  );
}
