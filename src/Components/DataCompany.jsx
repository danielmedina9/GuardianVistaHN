import React from "react";
import AreaBar from "./Areabar";
import BarChart from "./BarChart";
import { Grid } from "@mui/material";


export default function DataCompany() {
  return (
    <>
    <Grid container sx={{my:2}}>
    <Grid xs={5.5} sx={{my:4}}> <AreaBar/></Grid>
    <Grid xs={6.5} ><BarChart/></Grid>    
    </Grid>
    </>
  );
}
