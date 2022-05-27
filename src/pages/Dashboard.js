import React, { useState, useEffect } from "react";

import "../pages/style.css";
import "../App.css";

import Footer from "../components/Footer.js";
import ProfileBannerR from "../components/ProfileBannerR.js";

import BubbleIcon03 from "../assets/bubble-icon-03.svg";

import YourOrdersIcon from "../assets/your-orders-icon.svg";
import InboxIcon from "../assets/inbox-icon.svg";
import YourListingsIcon from "../assets/your-listings-icon.svg";
import NotifsIcon from "../assets/notifs-icon.svg";
import YourRatingsIcon from "../assets/your-ratings-icon.svg";
import YourBookmarksIcon from "../assets/your-bookmarks-icon.svg";
import FollowingIcon from "../assets/following-icon.svg";
import RecentlyViewedIcon from "../assets/recently-viewed-icon.svg";

import { Link, useHistory } from "react-router-dom";

import { connect } from "react-redux";
import { fetchProfile } from "../store/profile/actions";
import { loginRemoveToken } from "../store/auth/actions";

import { API_URL_BACKEND } from "../config";
import moment from "moment";
import { Col, Row } from "react-bootstrap";
import { Grid } from "@material-ui/core";
import useMediaQuery from "@mui/material/useMediaQuery";

function Dashboard(props) {
  const history = useHistory();
  const [textbookSelected, setTextbookSelected] = useState(false);
  const [marked, setMarked] = useState(false);
  const matches = useMediaQuery("(max-width: 750px)");
  const [spacerDiv, setSpacerDiv] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn-bookmarkd");
    if (isLoggedIn === "yes") setSpacerDiv(false);
  }, []);

  useEffect(() => {
    console.log("dashboard props.user", props.user);
    if (!props.user?._id) {
      history.push("/log-in");
    } else {
      props.fetchProfile();
    }
  }, [props.user]);

  const handleLogout = async () => {
    const res = await fetch(`${API_URL_BACKEND}logout`, {
      credentials: "include",
    }).then((res) => res.json());
    if (res.isLogoutSuccess) {
      localStorage.setItem("isLoggedIn-bookmarkd", "no");
      props.loginRemoveToken();
      // history.push("/")
      window.location.href = "/";
    }
  };
  return (
    <div className="profile">
      <div className="profile-inner">
        {spacerDiv && <div className="spacer" />}

        <div className="bubble-top-right">
          <img src={BubbleIcon03} />
        </div>

        <div className="profile-top__inner inner">
          <h2 className="dropshadow">My Dashboard</h2>
        </div>

        <ProfileBannerR
          profile={{
            name: `${props.profile?.firstName} ${props.profile?.lastName}`,
            year: moment(props.profile?.dob).format("YYYY"),
            username: props.profile?.email,
          }}
        />

        <div className="profile-bottom">
          <Grid
            container
            direction={!matches ? "row" : "column"}
            justifyContent={!matches ? "flex-start" : "center"}
            alignItems={!matches ? "flex-start" : "center"}
            className="profile-bottom__inner inner">
            <Grid item>
              <div className="user-profile-info">
                <Link className="dark-link" to="/dashboard/personal-info">
                  Personal Info
                </Link>
                <hr />
                <Link className="dark-link" to="/dashboard/security">
                  Security
                </Link>
                <hr />
                <Link className="dark-link" to="/dashboard/payment-info">
                  Payment Info
                </Link>
                <hr />
                <a className="dark-link" onClick={handleLogout}>
                  Logout
                </a>
              </div>
            </Grid>

            <Grid item>
              <div className="user-profile-content">
                <div className="book-card__container">
                  <Link className="dashboard-card none" to="/dashboard/orders">
                    <h6 className={"text-section-height"}>Your Orders</h6>
                    <img src={YourOrdersIcon} />
                  </Link>
                  <Link className="dashboard-card none" to="/messages">
                    <h6 className={"text-section-height"}>Inbox</h6>
                    <img src={InboxIcon} />
                  </Link>
                  <Link
                    className="dashboard-card none"
                    to="/dashboard/listings">
                    <h6 className={"text-section-height"}>Your Listings</h6>
                    <img src={YourListingsIcon} />
                  </Link>
                  <Link className="dashboard-card none" to="/dashboard/notifs">
                    <h6 className={"text-section-height"}>Notifications</h6>
                    <img src={NotifsIcon} />
                  </Link>
                  <Link className="dashboard-card none" to="/dashboard/ratings">
                    <h6 className={"text-section-height"}>Your Ratings</h6>
                    <img src={YourRatingsIcon} />
                  </Link>
                  <Link
                    className="dashboard-card none"
                    to="/dashboard/bookmarks">
                    <h6 className={"text-section-height"}>Your Bookmarks</h6>
                    <img src={YourBookmarksIcon} />
                  </Link>
                  <Link
                    className="dashboard-card none"
                    to="/dashboard/following">
                    <h6 className={"text-section-height"}>Following</h6>
                    <img src={FollowingIcon} />
                  </Link>
                  <Link
                    className="dashboard-card none"
                    to="/dashboard/recently-viewed">
                    <h6 className={"text-section-height"}>Recently Viewed</h6>
                    <img src={RecentlyViewedIcon} />
                  </Link>
                  <Link className="dashboard-card none" to="/dashboard/Users">
                    <h6 className={"text-section-height"}>Users</h6>
                    <img src={FollowingIcon} />
                  </Link>
                </div>
              </div>
            </Grid>
          </Grid>

          {/*<div className="profile-bottom__inner inner">*/}
          {/*	<div className="user-profile-info">*/}
          {/*		<Link className="dark-link" to="/dashboard/personal-info">Personal Info</Link>*/}
          {/*		<hr />*/}
          {/*		<Link className="dark-link" to="/dashboard/security">Security</Link>*/}
          {/*		<hr />*/}
          {/*		<Link className="dark-link" to="/dashboard/payment-info">Payment Info</Link>*/}
          {/*		<hr />*/}
          {/*		<a className="dark-link" onClick={() => handleLogout()}>Logout</a>*/}
          {/*	</div>*/}

          {/*	<div className="user-profile-content">*/}
          {/*		<div className="book-card__container">*/}
          {/*			<Link className="dashboard-card none" to="/dashboard/orders">*/}
          {/*				<h6 className={"text-section-height"}>Your Orders</h6>*/}
          {/*				<img src={YourOrdersIcon} />*/}
          {/*			</Link>*/}
          {/*			<Link className="dashboard-card none" to="/messages">*/}
          {/*				<h6 className={"text-section-height"}>Inbox</h6>*/}
          {/*				<img src={InboxIcon} />*/}
          {/*			</Link>*/}
          {/*			<Link className="dashboard-card none" to="/dashboard/listings">*/}
          {/*				<h6 className={"text-section-height"}>Your Listings</h6>*/}
          {/*				<img src={YourListingsIcon} />*/}
          {/*			</Link>*/}
          {/*			<Link className="dashboard-card none" to="/dashboard/notifs">*/}
          {/*				<h6 className={"text-section-height"}>Notifications</h6>*/}
          {/*				<img src={NotifsIcon} />*/}
          {/*			</Link>*/}
          {/*			<Link className="dashboard-card none" to="/dashboard/ratings">*/}
          {/*				<h6 className={"text-section-height"}>Your Ratings</h6>*/}
          {/*				<img src={YourRatingsIcon} />*/}
          {/*			</Link>*/}
          {/*			<Link className="dashboard-card none" to="/dashboard/bookmarks">*/}
          {/*				<h6 className={"text-section-height"}>Your Bookmarks</h6>*/}
          {/*				<img src={YourBookmarksIcon} />*/}
          {/*			</Link>*/}
          {/*			<Link className="dashboard-card none" to="/dashboard/following">*/}
          {/*				<h6 className={"text-section-height"}>Following</h6>*/}
          {/*				<img src={FollowingIcon} />*/}
          {/*			</Link>*/}
          {/*			<Link className="dashboard-card none" to="/dashboard/recently-viewed">*/}
          {/*				<h6 className={"text-section-height"}>Recently Viewed</h6>*/}
          {/*				<img src={RecentlyViewedIcon} />*/}
          {/*			</Link>*/}
          {/*		</div>*/}
          {/*	</div>*/}
          {/*</div>*/}

          <Footer />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  profile: state.profile.profile,
});
const mapDispatchToProps = {
  loginRemoveToken,
  fetchProfile,
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
