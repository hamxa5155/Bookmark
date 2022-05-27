import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import DatalistInput from "react-datalist-input";
import "../pages/style.css";
import "../App.css";
import "react-datalist-input/dist/styles.css";
import Footer from "../components/Footer.js";
import NavBar from "../components/NavBarTwo.js";
import TagList from "../components/TagList.js";

import BubbleIcon03 from "../assets/bubble-icon-03.svg";
import BackArrow from "../assets/back-arrow.svg";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { fetchProfile, editProfile } from "../store/profile/actions";
import useMediaQuery from "@mui/material/useMediaQuery";

const coursesCatalog = require("../components/courses.json");
const topicsCatalog = require("../components/topics.json");
const servicesCatalog = require("../components/services.json");

function PersonalInfo(props) {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    university: "",
    graduationYear: "",
    major: "",
    schoolEmail: "",
    personalEmail: "",
  });
  const [btnLoading, setBtnLoading] = useState(false);
  const [courses, setCourses] = useState([]); // to be initialized with user's chosen courses
  const [topics, setTopics] = useState([]);
  const [services, setServices] = useState([]);
  const matches = useMediaQuery("(max-width: 750px)");
  const [spacerDiv, setSpacerDiv] = useState(true);
  let [selectCourse, setCourse] = useState("select course");
  let [selectTopics, setTopicss] = useState("select topics");
  let [selectServices, setServicess] = useState("select services");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn-bookmarkd");
    if (isLoggedIn === "yes") setSpacerDiv(false);
  }, [selectCourse]);

  const handleTags = (data, arr, setArr) => {
    const temp = arr;
    setArr((temp) => [...temp, data]);
  };

  const onSelect = useCallback((selectedItem) => {
    if (selectedItem.someAdditionalValue === "course")
      handleTags(selectedItem.code, courses, setCourses);
    else if (selectedItem.someAdditionalValue === "topic")
      handleTags(selectedItem.topic, topics, setTopics);
    else if (selectedItem.someAdditionalValue === "service")
      handleTags(selectedItem.service, services, setServices);
  }, []);
  // let value = "select course";
  const handleSelect = (e) => {
    setCourse(e.target.innerText);
  };
  const handleSelectTopicss = (e) => {
    setTopicss(e.target.innerText);
  };
  const handleSelectServices = (e) => {
    console.log(".working1?", e.target.innerText);
    setServicess(e.target.innerText);
    console.log("setTopicss??", selectServices);
  };
  const courseMemo = useMemo(
    () =>
      coursesCatalog.Courses.map((oneItem) => ({
        label: oneItem.name,
        key: oneItem.code,
        someAdditionalValue: oneItem.type,
        ...oneItem,
      })),
    [coursesCatalog]
  );

  const topicMemo = useMemo(
    () =>
      topicsCatalog.Topics.map((oneItem) => ({
        label: oneItem.topic,
        key: oneItem.id,
        someAdditionalValue: oneItem.type,
        ...oneItem,
      })),
    [topicsCatalog]
  );

  const serviceMemo = useMemo(
    () =>
      servicesCatalog.Services.map((oneItem) => ({
        label: oneItem.service,
        key: oneItem.id,
        someAdditionalValue: oneItem.type,
        ...oneItem,
      })),
    [servicesCatalog]
  );
  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      setBtnLoading(true);
      await props.editProfile({
        ...props.profile,
        firstName: state.firstName,
        lastName: state.lastName,
        university: state.university,
        graduation_year: state.graduationYear,
        major: state.major,
        school_email: state.schoolEmail,
        personal_email: state.personalEmail,
        // courses: courses.join(","),
        // topics: topics.join(","),
        // services: services.join(","),
        courses: selectCourse,
        topics: selectTopics,
        services: selectServices,
      });
      Swal.fire("Profile updated successfully!", "", "success");
    } catch (err) {
      Swal.fire("Something went wrong!", "", "error");
    } finally {
      setBtnLoading(false);
    }
  };
  useEffect(() => {
    if (props.profile?._id) {
      setState({
        ...state,
        firstName: props.profile.firstName,
        lastName: props.profile.lastName,
        university: props.profile.university,
        graduationYear: props.profile.graduation_year,
        major: props.profile.major,
        schoolEmail: props.profile.school_email,
        personalEmail: props.profile.personal_email,
      });
      if (props.profile.courses?.length > 0) {
        let coursesTemp = props.profile.courses.split(",");
        setCourses(coursesTemp);
      }
      if (props.profile.topics?.length > 0) {
        let topicsTemp = props.profile.topics.split(",");
        setTopics(topicsTemp);
      }
      if (props.profile.services?.length > 0) {
        let servicesTemp = props.profile.services.split(",");
        setServices(servicesTemp);
      }
    }
  }, [props.profile]);
  useEffect(() => {
    props.fetchProfile();
  }, []);
  return (
    // <>
    //   <h1>ugjhgjghj</h1>
    //   <h1>ugjhgjghj</h1>
    // </>
    <div className="profile">
      <div className="profile-inner">
        {spacerDiv && <div className="spacer" />}

        <div className="bubble-top-right">
          <img src={BubbleIcon03} />
        </div>

        <div className="my-dashboard__inner inner">
          <div className="inline">
            <Link to="/dashboard">
              <img src={BackArrow} className="backarrow" />
            </Link>
            <h2 className="dropshadow">My Dashboard</h2>
          </div>

          <div className="side-by-side dashboard-secondary-title">
            <h3>Personal Info</h3>
          </div>
        </div>

        <form className="my-dashboard__inner inner" onSubmit={handleSubmitForm}>
          <div className="dashboard-info-form-section">
            <div className="dashboard-info-form-title">Basic Info</div>
            <div className="dashboard-info-form-outer">
              <div className="dashboard-info-form">
                <tr>
                  <td className="dashboard-info-form-label">
                    <label>First Name:</label>
                  </td>
                  <td className="dashboard-info-form-input">
                    <input
                      placeholder="Enter your first name"
                      type="text"
                      className={matches && "w-100"}
                      value={state.firstName}
                      onChange={(e) =>
                        setState({ ...state, firstName: e.target.value })
                      }
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="dashboard-info-form-label">
                    <label>Last Name:</label>
                  </td>
                  <td className="dashboard-info-form-input">
                    <input
                      placeholder="Enter your last name"
                      type="text"
                      className={matches && "w-100"}
                      value={state.lastName}
                      onChange={(e) =>
                        setState({ ...state, lastName: e.target.value })
                      }
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="dashboard-info-form-label">
                    <label>University:</label>
                  </td>
                  <td className="dashboard-info-form-input">
                    <input
                      type="text"
                      className={matches && "w-100"}
                      value={state.university}
                      onChange={(e) =>
                        setState({ ...state, university: e.target.value })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td className="dashboard-info-form-label">
                    <label>Graduation Year:</label>
                  </td>
                  <td className="dashboard-info-form-input">
                    <input
                      type="text"
                      className={matches && "w-100"}
                      value={state.graduationYear}
                      onChange={(e) =>
                        setState({ ...state, graduationYear: e.target.value })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td className="dashboard-info-form-label">
                    <label>Major:</label>
                  </td>
                  <td className="dashboard-info-form-input">
                    <input
                      type="text"
                      value={state.major}
                      className={matches && "w-100"}
                      onChange={(e) =>
                        setState({ ...state, major: e.target.value })
                      }
                    />
                  </td>
                </tr>
              </div>
            </div>
          </div>

          <div className="dashboard-info-form-section">
            <div className="dashboard-info-form-title">Contact</div>
            <div className="dashboard-info-form-outer">
              <div className="dashboard-info-form">
                <tr>
                  <td className="dashboard-info-form-label">
                    <label>School Email:</label>
                  </td>
                  <td className="dashboard-info-form-input">
                    <input
                      type="text"
                      className={matches && "w-100"}
                      value={state.schoolEmail}
                      onChange={(e) =>
                        setState({ ...state, schoolEmail: e.target.value })
                      }
                    />
                  </td>
                </tr>
                <tr className={"mobile-view-margin"}>
                  <td className="dashboard-info-form-label">
                    <label>Personal Email (optional):</label>
                  </td>
                  <td className="dashboard-info-form-input">
                    <input
                      type="text"
                      className={matches && "w-100"}
                      value={state.personalEmail}
                      onChange={(e) =>
                        setState({ ...state, personalEmail: e.target.value })
                      }
                    />
                  </td>
                </tr>
              </div>
            </div>
          </div>

          <div className="dashboard-info-form-section">
            <div className="dashboard-info-form-title">Interests</div>

            <div className="dashboard-info-form-outer">
              <div className="dashboard-info-form">
                <tr>
                  <td className="dashboard-info-form-label">
                    <label>Courses:</label>
                  </td>
                  <td className="dashboard-info-form-input">
                    {/* <DatalistInput
                      placeholder="Search for your courses"
                      items={courseMemo}
                      onSelect={onSelect}
                      requiredInputLength={1}
                      clearInputOnSelect={true}
                      dropDownLength={7}
                    /> */}
                    <input value={selectCourse} />
                  </td>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {/* Dropdown Button */}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleSelect}>
                        Applications in Biological Engineering
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleSelect}>
                        Introduction to Biological Engineering
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleSelect}>
                        Biology for Engineers
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </tr>
                <tr className="tags-container">
                  <td className="dashboard-info-form-label"></td>
                  <td className="dashboard-info-form-input tag-container">
                    <TagList tags={courses} setTags={setCourses} />
                  </td>
                </tr>
              </div>
              <div className="dashboard-info-form">
                <tr>
                  <td className="dashboard-info-form-label">
                    <label>Topics:</label>
                  </td>

                  <td className="dashboard-info-form-input">
                    {/* <DataListInput
                      placeholder="Search for topics (ex: Biology, Art, etc)"
                      items={topicMemo}
                      onSelect={onSelect}
                      requiredInputLength={1}
                      clearInputOnSelect={true}
                      dropDownLength={7}
                    /> */}
                    <input value={selectTopics} />
                  </td>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {/* Dropdown Button */}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleSelectTopicss}>
                        Advertising
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleSelectTopicss}>
                        Graphic Designer
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleSelectTopicss}>
                        Marketing
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleSelectTopicss}>
                        Production
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleSelectTopicss}>
                        Photography
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleSelectTopicss}>
                        Business
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </tr>
                <tr className="tags-container">
                  <td className="dashboard-info-form-label"></td>
                  <td className="dashboard-info-form-input tag-container">
                    <TagList tags={topics} setTags={setTopics} />
                  </td>
                </tr>
              </div>
              <div className="dashboard-info-form">
                <tr>
                  <td className="dashboard-info-form-label">
                    <label>Services:</label>
                  </td>
                  <td className="dashboard-info-form-input">
                    {/* <DataListInput
                      placeholder="Search for services like tutoring"
                      items={serviceMemo}
                      onSelect={onSelect}
                      requiredInputLength={1}
                      clearInputOnSelect={true}
                      dropDownLength={7}
                    /> */}
                    <input value={selectServices} />
                  </td>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {/* Dropdown Button */}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleSelectServices}>
                        Tutoring
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleSelectServices}>
                        Review Sessions
                      </Dropdown.Item>
                      {/* <Dropdown.Item onClick={handleSelectServices}>
                        Marketing
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleSelectServices}>
                        Production
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleSelectServices}>
                        Photography
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleSelectServices}>
                        Business
                      </Dropdown.Item> */}
                    </Dropdown.Menu>
                  </Dropdown>
                </tr>
                <tr className="tags-container">
                  <td className="dashboard-info-form-label"></td>
                  <td className="dashboard-info-form-input tag-container">
                    <TagList tags={services} setTags={setServices} />
                  </td>
                </tr>
              </div>

              <div className="flex-right">
                <button type="submit" disabled={btnLoading}>
                  {btnLoading ? "..." : "Save changes"}
                </button>
              </div>
            </div>
          </div>
        </form>

        <Footer />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  user: state.auth.user,
  profile: state.profile.profile,
});
const mapDispatchToProps = {
  fetchProfile,
  editProfile,
};
export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
