import React, { useEffect, useState } from "react";

import "../pages/style.css";
import "../App.css";

import Footer from "../components/Footer.js";
import NavBar from "../components/NavBarTwo.js";

import BackArrow from "../assets/back-arrow.svg";
import BubbleIcon03 from "../assets/bubble-icon-03.svg";
import ProfilePic from "../assets/temp-profile.png";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import EmptyState from "../assets/notifs-empty-state.svg";

//redux
import { connect } from "react-redux";
import { fetchNotifications } from "../store/notifications/actions";

function YourNotifs(props) {
  const [notifSelected, setNotifSelected] = useState(false);
  const empty = false; // temp variable to switch between empty and non-empty states of this page
  const [spacerDiv, setSpacerDiv] = useState(true);

  const checkForm = () => {
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].checked) {
        return setNotifSelected(true);
      }
    }
    return setNotifSelected(false);
  };
  useEffect(() => {
    props.fetchNotifications();

    const isLoggedIn = localStorage.getItem("isLoggedIn-bookmarkd");
    if (isLoggedIn === "yes") setSpacerDiv(false);
  }, []);

  return (
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
            <h3>Notifications</h3>
            <div>Search Bar</div>
          </div>
          <div className="side-by-side dashboard-selection-bar">
            <div>&nbsp;</div>
            {notifSelected ? (
              <a className="none">
                Delete messages <DeleteOutlineIcon className="center-img" />
              </a>
            ) : (
              ""
            )}
          </div>
          {props.notifications.length > 0 ? (
            <form className="notif-container__outer">
              {props.notifications.map((notification, i) => (
                <div className="notif-container" key={i}>
                  <input
                    type="checkbox"
                    className="notif-item"
                    onChange={() => checkForm()}
                  />
                  <img
                    className="circle-profile-pic__mini notif-item"
                    src={ProfilePic}
                  />
                  <div className="notif-item">{notification.notification}</div>
                </div>
              ))}
              {/* <div className="notif-container">
              <input type="checkbox" className="notif-item" onChange={() => checkForm()}/>
              <img className="circle-profile-pic__mini notif-item" src={ProfilePic}/>
              <div className="notif-item"><a href="/profile/0" className="dark-link">@username</a> send you a message. <a>View message <ArrowRightAltIcon className="center-img"/></a></div>
            </div>

            <div className="notif-container">
              <input type="checkbox" className="notif-item" onChange={() => checkForm()}/>
              <img className="circle-profile-pic__mini notif-item" src={ProfilePic}/>
              <div className="notif-item"><a href="/profile/0" className="dark-link">@username</a> left a review on your listing. <a>Check it out <ArrowRightAltIcon className="center-img"/></a></div>
            </div>

            <div className="notif-container">
              <input type="checkbox" className="notif-item" onChange={() => checkForm()}/>
              <div className="notif-item">You have <a href="/profile/0" className="dark-link">5 unread messages. </a><a>Open inbox <ArrowRightAltIcon className="center-img"/></a></div>
            </div>

            <div className="notif-container">
              <input type="checkbox" className="notif-item" onChange={() => checkForm()}/>
              <div className="notif-item">We have updated our tems & conditions and privacy policy. <a>Take a look  <ArrowRightAltIcon className="center-img"/></a></div>
            </div>

            <div className="notif-container">
              <input type="checkbox" className="notif-item" onChange={() => checkForm()}/>
              <img className="circle-profile-pic__mini notif-item" src={ProfilePic}/>
              <div className="notif-item"><a href="/profile/0" className="dark-link">@username</a> has made an offer on your listing. <a>View offer <ArrowRightAltIcon className="center-img"/></a></div>
            </div>

            <div className="notif-container">
              <input type="checkbox" className="notif-item" onChange={() => checkForm()}/>
              <div className="notif-item">Let us know about your experience! <a>Leave a review  <ArrowRightAltIcon className="center-img"/></a></div>
            </div> */}
            </form>
          ) : (
            <div className="empty-state-div">
              <div className="empty-state-title">No notifications yet</div>
              <img style={{ width: "100%" }} src={EmptyState} />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
const mapStateToProps = (state) => ({
  user: state.auth.user,
  notifications: state.notifications.notifications,
});
const mapDispatchToProps = {
  fetchNotifications,
};
export default connect(mapStateToProps, mapDispatchToProps)(YourNotifs);
