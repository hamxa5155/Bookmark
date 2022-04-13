import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './admin.css'
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { TiDelete } from 'react-icons/ti';
import { AiFillEdit } from 'react-icons/ai';
// import { createAboutUs, fetchAboutUs } from "../store/aboutUs/actions";



const Contacttable = (props) => {
  console.log("props darta =====", props.allContactUs)
  return (
    <>
      <div className='table'>
        <h3>Quieres</h3>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Subject</TableCell>
                <TableCell align="left">Message</TableCell>
                <TableCell align="left">Edit</TableCell>
                <TableCell align="left">Delete</TableCell>
               
              </TableRow>
            </TableHead>
            <TableBody>
              {props.allContactUs.map((data, index) => {
                return (
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{index + 1}</TableCell>
                    <TableCell align="left">{data.name}</TableCell>
                    <TableCell align="left">{data.email}</TableCell>
                    <TableCell align="left">{data.subject}</TableCell>
                    <TableCell align="left">{data.message}</TableCell>
                    <TableCell align="left"><AiFillEdit className='delete_icon'/></TableCell>
                    <TableCell align="left"><TiDelete className='delete_icon'
                /></TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  allContactUs: state.contactUsReducer.allContactUs,
  // books: state.books.allBooks
});
const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps)(Contacttable);