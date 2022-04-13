import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { TiDelete } from 'react-icons/ti';
import { AiFillEdit } from 'react-icons/ai';
// import { createAboutUs, fetchAboutUs } from "../store/aboutUs/actions";



const Faqtable = (props) => {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);





  const [faqState, setFaqState] = useState({
    question: "",
    anwser: ""
  })
  const handleChange = (e) => {
    setFaqState({ ...faqState, [e.target.name]: e.target.value });
  }

  const handleSubmit = async () => {
    try {
      const res = await props.createFaq(faqState);
      console.log("faq response error", res)
      setFaqState({ ...faqState, question: "", anwser: "" });

      Swal.fire("Successfully uploaded data", "", "success").then(() => {
        // history.push("/dashboard/listings");
      });
    } catch (err) {
      console.log("error", err);
      Swal.fire("Unable to be uploaded data", "", "error");
    }
  };





  console.log("props darta =====", props.allContactUs)
  return (
    <>
      <div className='table'>
        <h3> Faq Table</h3>
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
                    <TableCell align="left"><AiFillEdit className='delete_icon' onClick={handleShow}/></TableCell>
                    <TableCell align="left"><TiDelete className='delete_icon'
                /></TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>


        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <div className="team_data">
          <h1>Add FAQ</h1>
          <div className="input_name">
            <input
              name="question"
              type="text"
              value={faqState.question}
              onChange={(e) => handleChange(e)}
              placeholder="Question"
              className="team_name"
            />
          </div>

          <div className="input_designation">
            <input
              name="anwser"
              type="text"
              value={faqState.anwser}
              onChange={(e) => handleChange(e)}
              placeholder="Answer"
              className="team_designation"
            />
          </div>

          <div className="input_button">
            <button className="team_button" onClick={() => handleSubmit()}>submit</button>
          </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

        
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
export default connect(mapStateToProps, mapDispatchToProps)(Faqtable);