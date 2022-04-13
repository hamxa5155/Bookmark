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

import { Col, Container, Row } from "react-bootstrap";
// import { createAboutUs, fetchAboutUs } from "../store/aboutUs/actions";



const Abouttable = (props) => {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




  const [aboutUsState, setAboutUsState] = useState({
    uploadfile: "",
    imageName: "",
    heading: "",
    detail: "",
  });

  const handlechange = (e, image) => {
    if (image) {
      setAboutUsState({
        ...aboutUsState,
        ["uploadfile"]: URL.createObjectURL(e.target.files[0]),
        ["imageName"]: e.target.files[0],
      });
    } else {
      console.log("other than data");
      setAboutUsState({
        ...aboutUsState,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleAddAboutUs = async () => {
    try {
      let formData = new FormData();
      formData.append("image", aboutUsState.imageName);
      formData.append("heading", aboutUsState.heading);
      formData.append("detail", aboutUsState.detail);
      const res = await props.createAboutUs(formData);
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
        <h3>About Table</h3>
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
          <Modal.Title>update table</Modal.Title>
        </Modal.Header>
        <Modal.Body>  <Container>
        <Row>
          <Col lg={12}>
            <div
              style={{
                marginTop: "20px",
                textAlign: "center",
              }}
            >
              <div className="mt-3 file-maindiv">
                <div className="file-div">
                  <input
                    // className="file-field"
                    type="file"
                    id="file-input"
                    onChange={(e) => handlechange(e, "image")}
                  />
                </div>
              </div>
              {aboutUsState.uploadfile ? (
                <div className="img-div">
                  <img
                    src={aboutUsState.uploadfile}
                    alt=""
                    className="image-size"
                  />
                </div>
              ) : (
                ""
              )}

              <div className="mt-3">
                <input
                  className="heading-field"
                  type="text"
                  placeholder="Heading"
                  name="heading"
                  value={aboutUsState.heading}
                  onChange={(e) => handlechange(e)}
                  required
                />
              </div>
              <div className="mt-3">
                <textarea
                  className="textarea-field"
                  type="text"
                  name="detail"
                  placeholder="Detail"
                  value={aboutUsState.detail}
                  onChange={(e) => handlechange(e)}
                />
              </div>
              <div className="mt-5" onClick={() => handleAddAboutUs()}>
                <span className="about-publish-button">Publish</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container></Modal.Body>
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
export default connect(mapStateToProps, mapDispatchToProps)(Abouttable);