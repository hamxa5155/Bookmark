import React, { useState } from "react";
import "../Team/team.css";

const Team = () => {
  const [uploadfile, setuploadFile] = useState("");
  const handlechange = (e) => {
    if (e.target.files.length) {
      setuploadFile(URL.createObjectURL(e.target.files[0]));
    }
  };
  return (
    <>
      <div className="team_main">
        <div className="team_data">
          <h1>join our team</h1>
          <div>
            <input type="file" id="file-input" onChange={handlechange} className="input_img" />
          </div>
          {uploadfile ? (
            <div>
              <img src={uploadfile} alt="" height="50px" width="50px" />
            </div>
          ) : (
            ""
          )}
          <div className="input_name">
            <input
              type="text"
              placeholder="Enter  Your Name"
              className="team_name"
            />
          </div>

          <div className="input_designation">
            <input
              type="text"
              placeholder="Designation"
              className="team_designation"
            />
          </div>

          <div className="input_info">
            <textarea
              className="team_info"
              placeholder="Detail"  rows="4" cols="50"
            ></textarea>
          </div>

          <div className="input_button">
            <button className="team_button">Publish</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
