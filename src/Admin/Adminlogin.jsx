import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Admin/Adminlogin.css";
const Adminlogin = () => {

const [email, SetEmail] = useState("");
const [password, setPassword] = useState("");

const onchangeEmail =(e)=>{
    SetEmail([e.target.name]= e.target.value)
}
const onchangePassword =(e)=>{
    setPassword([e.target.name] = e.target.value)
}
const handlesubmit=(e)=>{
    e.preventDefault()
}
  return (
    <div>
      <Container>
        <Row>
          <Col lg={12}>
            <div className="login-box">
              <div className="pt-3">
                <h1>Admin Login</h1>
              </div>
              <div className="pt-4">
                <input
                onChange={(e)=>onchangeEmail(e)}
                  className="login-email-box"
                  type="text"
                  placeholder="Email"
                  value={email}
                  name="email"
                  required
                />
              </div>
              <div className="pt-2">
                <input
                 onChange={(e)=>onchangePassword(e)}
                  className="login-email-box"
                  type="password"
                  placeholder="Password"
                  value={password}
                  name="password"
                  required
                />
              </div>
              <div className="pt-4">
                <Link to="/" className="login-submit-btn" onClick={handlesubmit}>Login</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Adminlogin;
