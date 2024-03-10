import React from "react";
import { Chart } from "react-google-charts";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import LogDetailDialog from "./LogDetailDialog";

export const data = [["Country", "Counter Of Attacks"]];

export const options = {
  colorAxis: { colors: ["#151B54", "black", "#4169E1"] },
 //backgroundColor: "#81d4fa",
  datalessRegionColor: "#7e7e7e",
  defaultColor: "#f5f5f5",
};

import PropTypes from "prop-types";

GeoChart.propTypes = {
  attckLogs: PropTypes.array.isRequired,
  logDetails: PropTypes.array.isRequired,
  pais: PropTypes.string.isRequired,
};

export default function GeoChart({ attckLogs, logDetails, pais }) {
  const [country, setCountry] = React.useState([]);
  const [countryDetails, setCountryDetails] = React.useState([]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setCountryDetails([]);
    setOpen(false);
  };

  return (
    <React.Fragment>
      {attckLogs.length > 0 ? (
        <Box>
          <Chart
            chartEvents={[
              {
                eventName: "select",
                callback: ({ chartWrapper }) => {
                  const chart = chartWrapper.getChart();
                  const selection = chart.getSelection();

                  if (selection.length === 0) return;
                  let region = null;
                  if (pais) {
                    const filterAttackLogs = attckLogs.filter(
                      (log) => log[0] === pais
                    );
                    console.log("filterAttackLogs ===", filterAttackLogs, pais);
                    region = filterAttackLogs[selection[0].row + 1];
                  } else {
                    region = attckLogs[selection[0].row + 1];
                  }

                  setCountry(region);

                  const logDetail = logDetails.filter(
                    (log) => log.country === region[0]
                  );
                  setCountryDetails(logDetail);
                  handleClickOpen();
                },
              },
            ]}
            chartType="GeoChart"
            data={attckLogs.length > 0 ? attckLogs : data}
            options={options}
          />
        </Box>
      ) : (
        <div>loading...</div>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {countryDetails.length > 0 && (
          <LogDetailDialog
            handleClose={handleClose}
            country={country}
            countryDetails={countryDetails}
          />
        )}
      </Dialog>
    </React.Fragment>
  );
}
