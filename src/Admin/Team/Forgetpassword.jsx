import React,{useState} from 'react'

const Forgetpassword = () => {
    const [emailstate, setEmailState] = useState({
        email:"",
        
      })
      const handleChange =(e)=>{
        setEmailState({...emailstate, [e.target.name]: e.target.value});
      }
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
              onChange={(e)=>handleChange(e)}
              placeholder="Enter Email "
              className="team_name"
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

export default Forgetpassword