import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
import "../Admin/Adminlogin.css";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { adminLogin } from "../store/adminLogin/actions";


const Adminlogin = (props) => {
  const history = useHistory();
  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");

  const onchangeEmail = (e) => {
    SetEmail([e.target.name] = e.target.value)
  }
  const onchangePassword = (e) => {
    setPassword([e.target.name] = e.target.value)
  }
  const handlesubmit = async (e) => {
    e.preventDefault()
    try {
      let obj = {
        email: email,
        password: password,
      }
      const res = await props.adminLogin(obj);
      Swal.fire("Successfully uploaded data", "", "success").then(() => {
        history.push("/add-users");
      });
    } catch (err) {
      console.log("error", err);
      Swal.fire("Unable to be uploaded data", "", "error");
    }
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
                  onChange={(e) => onchangeEmail(e)}
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
                  onChange={(e) => onchangePassword(e)}
                  className="login-email-box"
                  type="password"
                  placeholder="Password"
                  value={password}
                  name="password"
                  required
                />
              </div>
              <div className="pt-4 pb-5">
                <span className="login-submit-btn" onClick={(e) => handlesubmit(e)}>Login</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};



const mapStateToProps = (state) => ({

});
const mapDispatchToProps = {
  adminLogin
};
export default connect(mapStateToProps, mapDispatchToProps)(Adminlogin);
