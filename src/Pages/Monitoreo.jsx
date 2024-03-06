import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import BajoConstruct from '../img/pagina-de-mantenimiento-html.jpg';
import GeoChart from '../Components/GeoChart';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, TextField } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';


export default function Monitoreo() {

    const pais = [
        "Germany",
        "United States",
        "Brazil",
        "Canada",
        "France",
        "RU",
        "Honduras",
    ];
    const fechas = [
        "1 semana",
        "1 mes",
        "3 meses",
        "1 año",
    ]
    const tipoAtaque = [
        "IPS|IDS",
        "Malware",
        "Phishing",
    ]

    const bpais = "Pais";
    const bfecha = "Fechas";
    const bataque = "Ataques";

    return (
        <>
            <Box>
                <Box sx={{ display: "flex" }}>
                    <Sidebar />
                    <Box component="main" sx={{ flexGrow: 1, p: 12 }}>
                        <Grid main container >
                            <Grid >
                                <Autocomplete
                                    id="combo-box-demo"
                                    value={bpais}
                                    options={pais}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Pais" />}
                                />
                            </Grid>
                            <Grid sx={{mx:2}}>
                                <Autocomplete
                                    id="combo-box-demo"
                                    value={bataque}
                                    options={tipoAtaque}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Pais" />}
                                />
                            </Grid>
                            <Grid sx={{mx:2}}>
                                <Autocomplete
                                    id="combo-box-demo"
                                    value={bfecha}
                                    options={fechas}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Pais" />}
                                />
                            </Grid >
                            <Grid sx={{mx:0.5}}>
                                <IconButton size="large" variant="contained" >
                                    <RefreshIcon fontSize="large" />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Box sx={{ my: 5 }}>
                            <GeoChart />
                        </Box>
                    </Box>
                </Box>
            </Box>


        </>
    )
}