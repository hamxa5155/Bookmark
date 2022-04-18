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



const Teamtable = (props) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




  const [teamState, setTeamState] = useState({
    uploadfile: "",
    imageName: null,
    name: "",
    designation: "",
    detail: "",
  });
console.log("Team props", props)
  const handlechange = (e, image) => {
    console.log("comsat lahore");
    if (image) {
      setTeamState({
        ...teamState,
        ["uploadfile"]: URL.createObjectURL(e.target.files[0]),
        ["imageName"]: e.target.files[0],
      });
    } else {
      setTeamState({ ...teamState, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append("image", teamState.imageName);
      formData.append("name", teamState.name);
      formData.append("designation", teamState.designation);
      formData.append("detail", teamState.detail);
      const res = await props.createOurTeam(formData);
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
        <h3>Team Table</h3>
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
          <Modal.Title>Team update</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="team_data">

          <div>
            <input
              type="file"
              id="file-input"
              onChange={(e) => handlechange(e, "image")}
              className="input_img"
            />
          </div>
          {teamState.uploadfile ? (
            <div className="img-div">
              <img src={teamState.uploadfile} alt="" className="image-size" />
            </div>
          ) : (
            ""
          )}
          <div className="input_name1">
            <input
              type="text"
              name="name"
              value={teamState.name}
              placeholder="Enter  Your Name"
              className="team_name"
              onChange={(e) => handlechange(e)}

              
            />
          </div>

          <div className="input_designation1">
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              className="team_designation"
              value={teamState.designation}
              onChange={(e) => handlechange(e)}
            />
          </div>

          <div className="input_info1">
            <textarea
              className="team_info"
              placeholder="Detail"
              name="detail"
              rows="4"
              cols="50"
              value={teamState.detail}
              onChange={(e) => handlechange(e)}
            ></textarea>
          </div>

          <div className="input_button1">
            <button className="team_button" onClick={() => handleSubmit()}>
              Publish
            </button>
          </div>
        </div></Modal.Body>
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
export default connect(mapStateToProps, mapDispatchToProps)(Teamtable);