import React,{useState} from 'react'

const Resetpaswword = () => {

    const [resetState, setResetState] = useState({
        resetpasword:"",
        
      })
      const handleChange =(e)=>{
        setResetState({...resetState,[e.target.name]:e.target.value});
      }
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
              onChange={(e)=>handleChange(e)}
              placeholder="reset pasword"
              className="team_name"
            />
          </div>

          <div className="input_button">
            <button className="team_button">reset pasword</button>
          </div>
        </div>
      </div>
   </>
  )
}

export default Resetpaswword