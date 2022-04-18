import React, { useState } from 'react'
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { createFaq } from "../../store/faq/actions";
import Faqtable from '../Adminfaq/Faqtable';


const Adminfaq = (props) => {

  const [faqState, setFaqState] = useState({
    question: "g hf",
    anwser: ""
  })

  const handleChange = (e) => {
    setFaqState({ ...faqState, [e.target.name]: e.target.value });
  }

  const handleSubmit = async () => {
    try {
      const res = await props.createFaq(faqState);
      console.log("faq response error", res)
      setFaqState({ ...faqState, question: "", anwser: "" });

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
      <div className="team_main">
        <div className="team_data">
          <h1>Add FAQ</h1>
          <div className="input_name">
            <input
              name="question"
              type="text"
              // value={faqState.question}
              onChange={(e) => handleChange(e)}
              placeholder="Question"
              className="team_name"
            />
          </div>

          <div className="input_designation">
            <input
              name="anwser"
              type="text"
              // value={faqState.anwser}
              onChange={(e) => handleChange(e)}
              placeholder="Answer"
              className="team_designation"
            />
          </div>

          <div className="input_button">
            <button className="team_button" onClick={() => handleSubmit()}>submit</button>
          </div>
        </div>
      </div>
      <Faqtable />

    </>
  )
}

const mapStateToProps = (state) => ({
  // user: state.auth.user,
  // books: state.books.allBooks
});
const mapDispatchToProps = {
  createFaq
};
export default connect(mapStateToProps, mapDispatchToProps)(Adminfaq);
