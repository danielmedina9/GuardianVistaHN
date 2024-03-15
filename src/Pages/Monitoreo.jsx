import React, { useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Box from "@mui/material/Box";
import GeoChart from "../Components/GeoChart";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import { Button, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function Monitoreo() {
  const fechas = ["1 semana", "1 mes", "3 meses", "1 año"];
  const tipoAtaques = ["IPS|IDS", "Malware", "Phishing"];

  const [paises, setPaises] = React.useState([]);
  const [pais, setPais] = React.useState("");
  const [tipoAtaque, setTipoAtaque] = React.useState("");
  const [fecha, setFecha] = React.useState("");

  const [refresh, setRefresh] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [attckLogs, setAttckLogs] = React.useState([]);
  const [filterAttckLogs, setFilterAttckLogs] = React.useState([]);
  const [logDetails, setLogDetails] = React.useState([]);

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

  const parseAttackLogs = (events) => {
    let newLogDetails = [...logDetails];
    const groupedData = events.reduce((acc, attack) => {
      let countryName = "";
      let severity = "";

      const dstCountry = attack.message.match(/dstcountry="([^"]+)"/);
      const srcCountry = attack.message.match(/srccountry="([^"]+)"/);
      const severityStr = attack.message.match(/severity="([^"]+)"/) || "";

      if (srcCountry) {
        countryName = srcCountry[1];
        if (srcCountry[1] === "Reserved") {
          countryName = dstCountry[1];
        }
      }

      if (severityStr) {
        severity = severityStr[1];
      }

      if (countryName) {
        const typeData = attack.message.match(/type="([^"]+)"/);
        const typeStr = typeData ? typeData[1] : "";
        const subtypeData = attack.message.match(/subtype="([^"]+)"/);
        const subtypeStr = subtypeData ? subtypeData[1] : "";

        if (acc[countryName]) {
          acc[countryName] += 1;
        } else {
          acc[countryName] = 1;
          // set unique country name
          setPaises((prev) => [...new Set([...prev, countryName])]);
        }

        newLogDetails.push({
          id: attack.id,
          severity: severity,
          type: typeStr,
          subtype: subtypeStr,
          country: countryName,
        });
      }
      return acc;
    }, {});

    setLogDetails([...newLogDetails]);

    console.log("groupedData ===", groupedData);

    // convert it to array for geo map data
    const dataArray = Object.entries(groupedData).map(([country, count]) => [
      country,
      count,
    ]);

    // add header array at the beginning of the array
    dataArray.unshift(["Pais", "Counter Of Attacks"]);
    console.log("attackData ===", dataArray);
    setAttckLogs(dataArray);
    setFilterAttckLogs(dataArray);
  };

  const fetchAttckLogs = async () => {
    setLoading(true);
    let url = `${process.env.REACT_APP_PAPERTRAIL_API}`;

    switch (fecha) {
      case "1 semana": {
        // get 1 week ago
        const oneWeekAgo = Math.floor(Date.now() / 1000) - 604800;
        url = `${process.env.REACT_APP_PAPERTRAIL_API}?min_time=${oneWeekAgo}`;
        break;
      }
      case "1 mes": {
        // 1 month ago
        const oneMonthAgo = Math.floor(Date.now() / 1000) - 2592000;
        url = `${process.env.REACT_APP_PAPERTRAIL_API}?min_time=${oneMonthAgo}`;
        break;
      }
      case "3 meses": {
        // 3 months ago
        const threeMonthsAgo = Math.floor(Date.now() / 1000) - 7776000;
        url = `${process.env.REACT_APP_PAPERTRAIL_API}?min_time=${threeMonthsAgo}`;
        break;
      }
      case "1 año": {
        // 1 year ago
        const oneYearAgo = Math.floor(Date.now() / 1000) - 31536000;
        url = `${process.env.REACT_APP_PAPERTRAIL_API}?min_time=${oneYearAgo}`;
        break;
      }
      default:
        break;
    }

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.events?.length > 0) {
          console.log("event len ===", result.events?.length);
          setLoading(false);
          parseAttackLogs(result.events);
        } else {
          setLoading(false);
          console.log("No event log data");
        }
      })
      .catch((error) => {
        console.log("get event log data error ===", error);
        setLoading(false);
        setAttckLogs([]);
        setLogDetails([]);
      });
  };

  const filterAttackLogsByCountry = (val) => {
    setFilterAttckLogs([]);
    if (val) {
      const filtered = attckLogs.filter((log) => log[0] === val);
      filtered.unshift(["Country", "Counter Of Attacks"]);
      setFilterAttckLogs(filtered);
    } else {
      setFilterAttckLogs(attckLogs);
    }
  };

  useEffect(() => {
    setAttckLogs([]);
    setFilterAttckLogs([]);
    setLogDetails([]);
    setPaises([]);

    fetchAttckLogs();
  }, [refresh, fecha]);

  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 12 }}>
          <Grid main container>
            <Grid>
              <Autocomplete
                id="combo-box-demo"
                options={paises}
                value={pais}
                onChange={(event, newValue) => {
                  setPais(newValue);
                  filterAttackLogsByCountry(newValue);
                }}
                onInputChange={(event, newInputValue) => {
                  setPais(newInputValue);
                }}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Pais" />}
              />
            </Grid>
            <Grid sx={{ mx: 2 }}>
              <Autocomplete
                id="combo-box-demo"
                options={tipoAtaques}
                value={tipoAtaque}
                onChange={(event, newValue) => {
                  setTipoAtaque(newValue);
                }}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Ataques" />
                )}
              />
            </Grid>
            <Grid sx={{ mx: 2 }}>
              <Autocomplete
                id="combo-box-demo"
                options={fechas}
                value={fecha}
                onChange={(event, newValue) => {
                  setFecha(newValue);
                }}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Fechas" />
                )}
              />
            </Grid>
            <Grid sx={{ mx: 0.5, my: 1 }}>
              {/*<IconButton
                size="large"
                variant="contained"
                onClick={() => setRefresh(!refresh)}
              >
                <RefreshIcon fontSize="large" />
                </IconButton>*/}
              <Button
                variant="contained"
                color="success"
                onClick={() => setRefresh(!refresh)}
              >
                Actualizar
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ my: 5 }}>
            {loading && <CircularProgress style={{ marginLeft: "50%" }} />}
            <GeoChart
              attckLogs={filterAttckLogs}
              logDetails={logDetails}
              pais={pais}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
