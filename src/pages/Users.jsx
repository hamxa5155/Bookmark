import React, { useEffect, useState } from "react";

import "../pages/style.css";
import "../App.css";
import axios from "axios";
import Swal from "sweetalert2";
import Footer from "../components/Footer.js";

import BackArrow from "../assets/back-arrow.svg";
import { useSelector } from "react-redux";

import BubbleIcon03 from "../assets/bubble-icon-03.svg";
import ProfilePic from "../assets/temp-profile.png";
import { editProfile } from "../store/profile/actions";

function Users() {
  const [selectedItem, setSelectedItem] = useState("following");
  const [textbookSelected, setTextbookSelected] = useState(false);
  const empty = false; // temp variable to switch between empty and non-empty states of this page
  const [spacerDiv, setSpacerDiv] = useState(true);
  const [users, setAllusers] = useState();
  const currentUser = useSelector((state) => state.auth.user._id);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn-bookmarkd");
    if (isLoggedIn === "yes") setSpacerDiv(false);
    axios
      .get("http://localhost:8080/get-users")
      .then(async (response) => {
        var filtered = response.data.filter((d) => d._id !== currentUser);
        setAllusers(filtered);
        console.log("get all users", filtered);
      })
      .catch((err) => {
        console.log("Users error", err);
      });
  }, []);

  const toggleSelectionBar = (target) => {
    document
      .getElementById("following")
      .classList.remove("dashboard-selection-item__selected");
    document
      .getElementById("followers")
      .classList.remove("dashboard-selection-item__selected");

    document
      .getElementById(target)
      .classList.add("dashboard-selection-item__selected");
    setSelectedItem(target);
  };
  const handleFollow = (id) => {
    // e.preventDefault();
    console.log("follow", id, currentUser);
    let data = {
      follower_id: currentUser,
      following_id: id,
    };

    axios
      .patch("http://localhost:8080/Follo-wing", data)
      .then(async (response) => {
        console.log("helooo? Data==?", response.data);

        if (response.data.success) {
          Swal.fire({
            title: "Success!",
            text: "You are now following this user!",
            icon: "success",
            confirmButtonText: "Cool",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: response.data.error.message,
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
        console.log("Follower Data==?", response.data);
      })
      .catch((err) => {
        console.log("Followers error", err);
      });
  };

  return (
    <>
      <div className="profile">
        {console.log("rrrrrrrrrrrrrr users", users)}
        <div className="profile-inner">
          {spacerDiv && <div className="spacer" />}

          <div className="bubble-top-right">
            <img src={BubbleIcon03} />
          </div>

          <div className="my-dashboard__inner inner">
            <div className="inline">
              <a href="/dashboard">
                <img src={BackArrow} className="backarrow" />
              </a>
              <h2 className="dropshadow">My Dashboard</h2>
            </div>

            <div className="side-by-side dashboard-secondary-title">
              <h3>All Users</h3>

              <div>Search Bar</div>
            </div>

            <div className="dashboard-selection-bar">
              <div
                className="dashboard-selection-item dashboard-selection-item__selected"
                id="following"
                onClick={(e) => toggleSelectionBar(e.target.id)}>
                Users
              </div>
            </div>

            <div className="my-dashboard__inner inner">
              <div className="book-card__container">
                {users?.map((user) => {
                  console.log("map user", user);
                  return (
                    <>
                      <div className="profile-card">
                        <a href="/profile/0">
                          <img
                            src={ProfilePic}
                            className="circle-profile-pic"
                          />
                        </a>
                        <div>
                          <a href="/profile/0" className="dark-link">
                            {user?.firstName}
                          </a>
                        </div>
                        <a href="/profile/0" className="none">
                          {user?.personal_email}
                        </a>
                        <br />
                        <button
                          onClick={(e) => handleFollow(user?._id)}
                          className="sign-up-button btn-mini">
                          Follow
                        </button>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Users;
