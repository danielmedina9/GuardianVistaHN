import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { prettyDate } from "@based/pretty-date";

export default function Tabla(props) {
  return (
    <TableContainer component={Paper}>
      <Table size="Large" aria-label="simple table">
        <TableHead>
          <TableRow style={{ backgroundColor: "#232b2b" }}>
            <TableCell>
              <Typography sx={{ color: "white" }}>Fecha</Typography>{" "}
              {/*received_at*/}
            </TableCell>
            <TableCell>
              <Typography sx={{ color: "white" }}>Ataque</Typography>{" "}
              {/*attack*/}
            </TableCell>
            <TableCell>
              <Typography sx={{ color: "white" }}>Pais</Typography>{" "}
              {/*srccountry*/}
            </TableCell>
            <TableCell>
              <Typography sx={{ color: "white" }}>Tipo</Typography>{" "}
              {/*subtype*/}
            </TableCell>
            <TableCell>
              <Typography sx={{ color: "white" }}>Gravedad</Typography>{" "}
              {/*Severity*/}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.logDetails.length > 0 &&
            props.logDetails.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{prettyDate(row.received_at,'date-time')}</TableCell>
                <TableCell>{row.ataque}</TableCell>
                <TableCell>{row.pais}</TableCell>
                <TableCell>{row.subtype}</TableCell>
                <TableCell>{row.severity}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
