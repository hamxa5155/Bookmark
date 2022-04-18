import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { createAboutUs, fetchAboutUs } from "../../store/aboutUs/actions";

import Abouttable from "./Abouttable";

import { Link } from "react-router-dom";
import "../../Admin/about/About.css"
const About = (props) => {

  

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

  return (
    <>
      <Container>
        <Row>
          <Col lg={12}>
            <div
              style={{
                marginTop: "100px",
                textAlign: "center",
              }}
            >
              <div className="mt-5">
                <h1 className="about-heading">About</h1>
              </div>
              <div className="mt-5 file-maindiv">
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

              <div className="mt-5">
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
              <div className="mt-5">
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
      </Container>
      <Abouttable/>
    </>
  );
};

const mapStateToProps = (state) => ({
  // user: state.auth.user,
  // books: state.books.allBooks,
});
const mapDispatchToProps = {
  fetchAboutUs,
  createAboutUs,
};
export default connect(mapStateToProps, mapDispatchToProps)(About);
