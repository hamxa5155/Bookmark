import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { resetPassword } from "../../store/auth/actions";


const Resetpaswword = (props) => {
  let { token } = useParams();
  console.log("token", token)
  const [resetState, setResetState] = useState({
    resetpasword: "",

  })
  const handleChange = (e) => {
    setResetState({ ...resetState, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await props.resetPassword({
        id: token,
        password: resetState.resetpasword
      });
      Swal.fire("Password updated successfully", "", "success").then(() => {
        // history.push("/dashboard/listings");
      });
    } catch (err) {
      console.log("error", err);
      Swal.fire("Unable to be uploaded  password", "", "error");
    }
  };


  return (
    <>
      <div className="team_main">
        <div className="team_data">
          <h1>Reset password</h1>
          <div className="input_name">
            <input
              name="resetpasword"
              type="text"
              value={resetState.resetpasword}
              onChange={(e) => handleChange(e)}
              placeholder="reset pasword"
              className="team_name"
            />
          </div>

          <div className="input_button">
            <button className="team_button" onClick={(e) => handleSubmit(e)}>reset pasword</button>
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
  resetPassword
};
export default connect(mapStateToProps, mapDispatchToProps)(Resetpaswword);
