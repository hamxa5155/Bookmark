import React, { useEffect, useState } from "react";

import "../pages/style.css";
import "../App.css";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { useSelector } from "react-redux";
import ProfilePic from "../assets/temp-profile.png";
import Footer from "../components/Footer.js";
import BubbleIcon03 from "../assets/bubble-icon-03.svg";
import BackArrow from "../assets/back-arrow.svg";
import YourFollowers from "./YourFollowers";
function YourFollowing() {
  const [selectedItem, setSelectedItem] = useState("following");
  const [textbookSelected, setTextbookSelected] = useState(false);
  const empty = false; // temp variable to switch between empty and non-empty states of this page
  const [spacerDiv, setSpacerDiv] = useState(true);
  const [users, setAllusers] = useState();
  const [Followings, setAllFollowings] = useState();
  // const [showpage, setPage] = useState("following");
  const currentUser = useSelector((state) => state.auth.user._id);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn-bookmarkd");
    if (isLoggedIn === "yes") setSpacerDiv(false);
    axios
      .get("http://localhost:8080/get-users")
      .then(async (response) => {
        var filtered = response.data.filter((d) => d._id === currentUser);

        var newfiltered = response.data.filter((d) => d._id !== currentUser);
        // console.log("newfiltered", newfiltered);
        setAllusers(newfiltered);

        setAllFollowings(filtered[0].following);
        // console.log("get all users", filtered, response.data);
        // console.log("gg all users", filtered[0].following);
      })
      .catch((err) => {
        console.log("Users error", err);
      });
  }, [selectedItem]);

  const history = useHistory();
  const handleUnfollow = (id) => {
    // e.preventDefault();
    console.log("follow", id, currentUser);
    let data = {
      follower_id: currentUser,
      following_id: id,
    };

    axios
      .patch("http://localhost:8080/unFollow", data)
      .then(async (response) => {
        console.log("helooo? Data==?", response.data);
        setSelectedItem(response.data);
      })
      .catch((err) => {
        console.log("Followers error", err);
      });
  };
  // console.log("user test ========== ", users, Followings);
  return (
    <>
      <div>
        <div className="profile">
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
                <h3>Following</h3>

                <div>Search Bar</div>
              </div>

              <div className="dashboard-selection-bar">
                <div
                  className="dashboard-selection-item dashboard-selection-item__selected"
                  id="following"
                  // onClick={(e) => showPage(e.target.id)}
                >
                  Following
                </div>
                <div
                  className="dashboard-selection-item"
                  id="followers"
                  onClick={() => history.push("/dashboard/followers")}>
                  Followers
                </div>
              </div>

              <div className="my-dashboard__inner inner">
                <div className="book-card__container">
                  {users?.map((user, index) => {
                    // console.log("userkkkkk", user.followers);
                    return (
                      <>
                        {user?.followers &&
                        Followings?.includes(user?._id) === true ? (
                          // Followings?.includes(user?.followers) === false ? (
                          <div>
                            {/* {console.log(
                              "iffff?? working test ",
                              user.firstName
                            )} */}
                            <div className="profile-card">
                              <a href="/profile/0">
                                <img
                                  src={ProfilePic}
                                  className="circle-profile-pic"
                                />
                              </a>
                              <div>
                                <a href="/profile/0" className="dark-link">
                                  {user.firstName}
                                </a>
                              </div>
                              <a href="/profile/0" className="none">
                                {user.email}
                              </a>
                              <br />
                              <button
                                onClick={(e) => handleUnfollow(user?._id)}
                                className="sign-up-button btn-mini">
                                unfollow
                              </button>
                            </div>
                            {/* {user._id} */}
                          </div>
                        ) : (
                          <>
                            {" "}
                            <div className="empty-state-div">
                              <div className="empty-state-title">
                                Not following anyone yet
                              </div>
                              {/* <img src={EmptyState} /> */}
                            </div>
                          </>
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default YourFollowing;
