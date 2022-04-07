import React, { useState } from 'react'

const Adminfaq = () => {

  const [faqState, setFaqState] = useState({
    question:"",
    answer:""
  })
  const handleChange =(e)=>{
    setFaqState({...faqState,[e.target.name]:e.target.value});
  }


  return (
   <>
        <div className="team_main">
        <div className="team_data">
          <h1>Add FAQ</h1>
          <div className="input_name">
            <input
            name="question"
              type="text"
              value={faqState.question}
              onChange={(e)=>handleChange(e)}
              placeholder="Question"
              className="team_name"
            />
          </div>

          <div className="input_designation">
            <input
            name="answer"
              type="text"
              value={faqState.answer}
          onChange={(e)=>handleChange(e)}
              placeholder="Answer"
              className="team_designation"
            />
          </div>

          <div className="input_button">
            <button className="team_button">submit</button>
          </div>
        </div>
      </div>
   </>
  )
}

export default Adminfaq