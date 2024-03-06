import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
//import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Windows Powerpoint XP',
    'Tupelo, MS',
    'Inyección sql',
    '30%',
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Firefox expt',
    'London, UK',
    'XSS',
    '60%',
  ),
  createData(2, '16 Mar, 2019', ' Scholz 74', 'Boston, MA', 'XSS', '25%'),
  createData(
    3,
    '16 Mar, 2019',
    'Nel exploit',
    'Gary, IN',
    'Troyano',
    '5%',
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Verbaden linux',
    'Long Branch, NJ',
    'Inyección sql',
    '30%',
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Tabla() {
  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table size="Large" aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: '#232b2b' }} >
              <TableCell ><Typography sx={{ color: 'white' }} >Fecha</Typography></TableCell>
              <TableCell > <Typography sx={{ color: 'white' }}>Ataque</Typography></TableCell>
              <TableCell><Typography sx={{ color: 'white' }}>Ciudad</Typography></TableCell>
              <TableCell><Typography sx={{ color: 'white' }}>Tipo</Typography></TableCell>
              <TableCell><Typography sx={{ color: 'white' }}>Porcentaje</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.shipTo}</TableCell>
                <TableCell>{row.paymentMethod}</TableCell>
                <TableCell >{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}