import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { Link } from "react-router-dom";
import "../Admin/About.css";
const About = () => {
  const [uploadfile, setuploadFile] = useState("");
  // console.log(uploadfile)
  const handlechange = (e) => {
    // e.preventDefault()
    if (e.target.files.length) {
      setuploadFile(URL.createObjectURL(e.target.files[0]));
      //    console.log(uploadfile)
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
                height: "800px",
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
                    onChange={handlechange}
                    
                  />
                </div>
              </div>
              {uploadfile ? (
                <div className="img-div">
                  <img src={uploadfile} alt="" className="image-size"  />
                </div>
              ) : (
                ""
              )}

              <div className="mt-5">
                <input
                  className="heading-field"
                  type="text"
                  placeholder="Heading"
                  required
                />
              </div>
              <div className="mt-5">
                <textarea
                  className="textarea-field"
                  type="text"
                  placeholder="Detail"
                />
              </div>
              <div className="mt-5">
                <Link to="/" className="about-publish-button">
                  Publish
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;
