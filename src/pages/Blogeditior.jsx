import React, { useState, useEffect } from 'react'


import parse from 'html-react-parser';
import Swal from "sweetalert2";
import { connect } from "react-redux"
import { createBlog } from "../store/blog/actions";

import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

const Blogeditior = (props) => {
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
      Swal.fire("Successfully uploaded data", "", "success").then(() => {
      });
    } catch (err) {
      console.log("error", err);
      Swal.fire("Unable to be uploaded data", "", "error");
    }
  };

  return (
    <>
      <div className='editor'>
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

      </div>
      <div className='blog_btn'>
        <button className="team_button" onClick={() => handleSubmit()}>
          Publish
            </button>
      </div>
    </>
  )
}



const mapStateToProps = (state) => ({
  // user: state.auth.user,
});
const mapDispatchToProps = {
  createBlog
};
export default connect(mapStateToProps, mapDispatchToProps)(Blogeditior);


























