import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './admin.css'





const Contacttable = () =>{
  return (
     <>
     <div className='table'>
     <h3>Quieres</h3>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">User Name</TableCell>
            {/* <TableCell align="right">edit</TableCell>
            <TableCell align="right">delete</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
         
            <TableRow
            //   key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                1
              </TableCell>
              <TableCell align="right">ghkjnm</TableCell>
              <TableCell align="right">ghkjnm</TableCell>
              <TableCell align="right">ghkjnm</TableCell>
              
            </TableRow>

            <TableRow
            //   key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                2
              </TableCell>
              <TableCell align="right">ghkjnm</TableCell>
              <TableCell align="right">ghkjnm</TableCell>
              <TableCell align="right">ghkjnm</TableCell>
             
            </TableRow>
            <TableRow
            //   key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                3
              </TableCell>
              <TableCell align="right">ghkjnm</TableCell>
              <TableCell align="right">ghkjnm</TableCell>
              <TableCell align="right">ghkjnm</TableCell>
             
            </TableRow>
         
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </>
  );
}
export default Contacttable