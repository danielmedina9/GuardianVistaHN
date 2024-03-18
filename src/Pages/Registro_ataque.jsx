import React, { useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabla from "../Components/Tabla";
import { Button, Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function Registro_ataque() {
  let myHeaders = new Headers();
  myHeaders.append(
    "X-Papertrail-Token",
    process.env.REACT_APP_PAPERTRAIL_API_TOKEN
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const [loading, setLoading] = React.useState(false);
  const [logDetails, setLogDetails] = React.useState([]);
  const [countryWithMoreAttacks, setCountryWithMoreAttacks] = React.useState(
    ""
  );

  const parseAttackLogs = (events, update) => {
    const regex = /dstcountry="([^"]+)"|srccountry="([^"]+)"|severity="([^"]+)"|subtype="([^"]+)"|attack="([^"]+)"/g;
    let newLogDetails = [];
    let countries = {};

    events.forEach((attack) => {
      let matches;
      let fields = {};

      while ((matches = regex.exec(attack.message)) !== null) {
        if (matches[1]) fields.dstCountry = matches[1];
        if (matches[2]) fields.srcCountry = matches[2];
        if (matches[3]) fields.severity = matches[3];
        if (matches[4]) fields.subtype = matches[4];
        if (matches[5]) fields.attack = matches[5];
      }

      let countryName = fields.srcCountry;
      if (fields.srcCountry === "Reserved") {
        countryName = fields.dstCountry;
      }

      if (countryName) {
        if (countryName !== "Reserved") {
          if (countries[countryName]) {
            countries[countryName] += 1;
          } else {
            countries[countryName] = 1;
          }
        }
        newLogDetails.push({
          id: attack.id,
          received_at: attack.received_at,
          ataque: fields.attack || "",
          pais: countryName,
          subtype: fields.subtype || "",
          severity: fields.severity || "",
        });
      }
    });

    let maxAttacks = 0;
    let countryStr = countryWithMoreAttacks;
    for (const [key, value] of Object.entries(countries)) {
      if (value > maxAttacks) {
        maxAttacks = value;
        countryStr = key;
      }
    }
    setCountryWithMoreAttacks(countryStr);

    const existingIds = new Set(logDetails.map((log) => log.id));

    const uniqueNewLogDetails = newLogDetails.filter(
      (log) => !existingIds.has(log.id)
    );

    update
      ? setLogDetails([...logDetails, ...uniqueNewLogDetails])
      : setLogDetails(uniqueNewLogDetails);

    console.log("logDetails ===", logDetails);
  };

  const fetchAttckLogs = async (url, update) => {
    setLoading(true);

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.events?.length > 0) {
          console.log("event len ===", result.events?.length);
          setLoading(false);
          parseAttackLogs(result.events, update);
        } else {
          setLoading(false);
          setLogDetails([]);
          console.log("No event log data");
        }
      })
      .catch((error) => {
        console.log("get event log data error ===", error);
        setLogDetails([]);
        setLoading(false);
      });
  };

  const handleUpdate = () => {
    const url = `${process.env.REACT_APP_PAPERTRAIL_API}`;
    fetchAttckLogs(url, true);
  };

  useEffect(() => {
    const oneWeekAgo = Math.floor(Date.now() / 1000) - 604800;
    const url = `${process.env.REACT_APP_PAPERTRAIL_API}?min_time=${oneWeekAgo}`;
    fetchAttckLogs(url, false);
  }, []);

  return (
    <Box sx={{ display: "Flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 12 }}>
        <Grid main container>
          <Grid>
            <Typography component="h1" variant="h4">
              REGISTRO DE ATAQUES
            </Typography>
          </Grid>
          <Grid sx={{ mx: 3 }}>
            {" "}
            <Button
              variant="contained"
              color="success"
              onClick={() => handleUpdate()}
            >
              Actualizar
            </Button>
          </Grid>
        </Grid>
        <Box>
          <Box sx={{ my: 2 }}>
            {" "}
            {/*Country with more attacks*/}
            <Typography component="h5" variant="h5">
              PAIS CON MAS ATAQUES: {countryWithMoreAttacks}
            </Typography>
          </Box>
          <Box sx={{ my: 2 }}>
            {" "}
            {/*Amount of attacks obtain*/}
            <Typography component="h5" variant="h5">
              CANTIDAD DE ATAQUES: {logDetails.length}
            </Typography>
          </Box>
          <Box sx={{ mx: 0 }}>
            {loading && <CircularProgress style={{ marginLeft: "50%" }} />}
            <Tabla logDetails={logDetails} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}