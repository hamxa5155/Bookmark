import React, { useState } from "react";
import "../Team/team.css";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { createOurTeam, fetchOurTeam } from "../../store/ourTeam/actions";

const Team = (props) => {
  const [teamState, setTeamState] = useState({
    uploadfile: "",
    imageName: null,
    name: "",
    designation: "",
    detail: "",
  });

  const handlechange = (e, image) => {
    console.log("comsat lahore");
    if (image) {
      setTeamState({
        ...teamState,
        ["uploadfile"]: URL.createObjectURL(e.target.files[0]),
        ["imageName"]: e.target.files[0],
      });
    } else {
      setTeamState({ ...teamState, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append("image", teamState.imageName);
      formData.append("name", teamState.name);
      formData.append("designation", teamState.designation);
      formData.append("detail", teamState.detail);
      const res = await props.createOurTeam(formData);
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
          <h1>join our team</h1>
          <div>
            <input
              type="file"
              id="file-input"
              onChange={(e) => handlechange(e, "image")}
              className="input_img"
            />
          </div>
          {teamState.uploadfile ? (
            <div className="img-div">
              <img src={teamState.uploadfile} alt="" className="image-size" />
            </div>
          ) : (
            ""
          )}
          <div className="input_name">
            <input
              type="text"
              name="name"
              value={teamState.name}
              placeholder="Enter  Your Name"
              className="team_name"
              onChange={(e) => handlechange(e)}
            />
          </div>

          <div className="input_designation">
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              className="team_designation"
              value={teamState.designation}
              onChange={(e) => handlechange(e)}
            />
          </div>

          <div className="input_info">
            <textarea
              className="team_info"
              placeholder="Detail"
              name="detail"
              rows="4"
              cols="50"
              value={teamState.detail}
              onChange={(e) => handlechange(e)}
            ></textarea>
          </div>

          <div className="input_button">
            <button className="team_button" onClick={() => handleSubmit()}>
              Publish
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  // user: state.auth.user,
  // books: state.books.allBooks
});
const mapDispatchToProps = {
  createOurTeam,
};
export default connect(mapStateToProps, mapDispatchToProps)(Team);
