import React, { useState } from 'react'
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { forgotPassword } from "../../store/auth/actions";



const Forgetpassword = (props) => {
  const [emailstate, setEmailState] = useState({
    email: "",

  })
  const handleChange = (e) => {
    setEmailState({ ...emailstate, [e.target.name]: e.target.value });
  }

  const handleSubmit = async () => {
    try {

      const res = await props.forgotPassword(emailstate.email);
      Swal.fire("Reset password link has been sent", "", "success").then(() => {
      });
    } catch (err) {
      console.log("error", err);
      Swal.fire("Unable to  sent  password reset link", "", "error");
    }
  };


  return (
    <>
      <div className="team_main">
        <div className="team_data">
          <h1>Enter Your Email</h1>
          <div className="input_name">
            <input
              name="email"
              type="email"
              value={emailstate.email}
              onChange={(e) => handleChange(e)}
              placeholder="Enter Email "
              className="team_name"
            />
          </div>



          <div className="input_button">
            <button className="team_button" onClick={() => handleSubmit()}>submit</button>
          </div>
        </div>
      </div>
    </>
  )
}




const mapStateToProps = (state) => ({
  // user: state.auth.user,
  // books: state.books.allBooks
});
const mapDispatchToProps = {
  forgotPassword
};
export default connect(mapStateToProps, mapDispatchToProps)(Forgetpassword);
