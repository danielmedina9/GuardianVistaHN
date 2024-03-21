import React from "react";
import Sidebar from "../Components/Sidebar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DataCompany  from "../Components/DataCompany";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";



export default function SIEM_platform() {

  const [empresa, setEmpresa] = useState("");

  useEffect(() => {
    getDoc(doc(db, "User", localStorage.getItem("userid"))).then((docSnap) => {
      if (docSnap.exists()) {
        setEmpresa(docSnap.data().empresa);
      } else {
        console.log("No such document!");
      }
    })
  });

  return (
    <>
      <Box sx={{ display: "Flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, my:14 }}>
          <Typography component="h1" variant="h4" sx={{mx:10}}>
            SISTEMA SIEM : {empresa}
          </Typography>
          <DataCompany/>
        </Box>        
      </Box>
    </>
  );
}