import * as React from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

import PropTypes from "prop-types";

LogDetailDialog.propTypes = {
  country: PropTypes.array.isRequired,
  countryDetails: PropTypes.array.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default function LogDetailDialog({
  country,
  countryDetails,
  handleClose,
}) {
  return (
    <>
      <DialogTitle id="alert-dialog-title">
        <strong>{country.length > 0 ? country[0] : "Country"}</strong>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {countryDetails.length > 0 &&
            countryDetails.map((log, index) => (
              <Typography key={index} variant="body2" gutterBottom>
                <strong>ID</strong>: {log.id} <strong>Severity</strong>:{" "}
                {log.severity} <strong>Type</strong>: {log.type}{" "}
                <strong>Subtype</strong>: {log.subtype}
              </Typography>
            ))}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </>
  );
}
