import React from "react";
import AreaBar from "./Areabar";
import BarChart from "./BarChart";
import Tablechart from "./Tablechart";
import { Grid } from "@mui/material";


export default function DataCompany()  {
  return (
    <>
    <Grid container sx={{my:2}}>
    <Grid xs={7} sx={{my:4,mx:-9}}> <AreaBar/></Grid>
    <Grid xs={5} ><BarChart/></Grid>  
    <Grid xs={5}><Tablechart/></Grid>  
    </Grid>
    </>
  );
}
