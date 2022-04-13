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
import { createBlog } from "../../store/blog/actions";

import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
// import { createAboutUs, fetchAboutUs } from "../store/aboutUs/actions";



const Blogtable = (props) => {


   const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);






  const [blogState, setBlogState] = useState({
    uploadfile: "",
    imageName: null,
    title: "",
    detail: "",
  });
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    return setEditorState(editorState);
  };
  const hrmlText = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  const description = hrmlText.replace(/<[^>]+>/g, "");
  console.log("hrmlText", hrmlText)

  const handleChange = (e, image) => {
    if (image) {
      setBlogState({
        ...blogState,
        ["uploadfile"]: URL.createObjectURL(e.target.files[0]),
        ["imageName"]: e.target.files[0],
      });
    } else {
      setBlogState({ ...blogState, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append("image", blogState.imageName);
      formData.append("title", blogState.title);
      formData.append("detail", hrmlText);
      const res = await props.createBlog(formData);
      console.log("res", res)
      Swal.fire("Successfully uploaded data", "", "success").then(() => {
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
        <h3> Blog Table</h3>
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
        

        <Modal.Body> 
        
        
        
        <h3>upload Blog image </h3>
        <div>
          <input
            type="file"
            id="file-input"
            onChange={(e) => handleChange(e, "image")}
            className="input_img"
          />
          <input
            name="title"
            type="title"
            value={blogState.title}
            onChange={(e) => handleChange(e)}
            placeholder="title"
            className="team_name"
          />
        </div>
        {blogState.uploadfile ? (
          <div className="img-div">
            <img alt="" src={blogState.uploadfile} className="image-size" />
          </div>
        ) : (
            ""
          )}

        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={onEditorStateChange}
          placeholder="Write description here"
        />
      <div className='blog_btn'>
        <button className="team_button" onClick={() => handleSubmit()}>
          Publish
            </button>
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
export default connect(mapStateToProps, mapDispatchToProps)(Blogtable);