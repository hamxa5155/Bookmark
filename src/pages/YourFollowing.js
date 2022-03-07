import React, {useEffect, useState} from 'react';

import '../pages/style.css';
import '../App.css';

import Footer from '../components/Footer.js';
import NavBar from '../components/NavBarTwo.js';
import BookCard from '../components/BookCard.js';

import BackArrow from '../assets/back-arrow.svg';
import EmptyState from '../assets/following-empty-state.png';
import BubbleIcon03 from '../assets/bubble-icon-03.svg';
import ProfilePic from '../assets/temp-profile.png';



function YourFollowing() {
  const [selectedItem, setSelectedItem] = useState("following");
  const [textbookSelected, setTextbookSelected] = useState(false);
  const empty = false; // temp variable to switch between empty and non-empty states of this page
  const [spacerDiv, setSpacerDiv] = useState(true)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn-bookmarkd')
    if (isLoggedIn === 'yes')
      setSpacerDiv(false)

  }, [])


  const toggleSelectionBar = (target) => {
      document.getElementById("following").classList.remove("dashboard-selection-item__selected");
      document.getElementById("followers").classList.remove("dashboard-selection-item__selected");

      document.getElementById(target).classList.add("dashboard-selection-item__selected");
      setSelectedItem(target);
  };

  return (
    <div className="profile">

            <div className="profile-inner">
              {spacerDiv && (<div className="spacer"/>)}

              <div className="bubble-top-right">
                  <img src={BubbleIcon03}/>
              </div>

              <div className="my-dashboard__inner inner">
                <div className="inline">
                  <a href="/dashboard"><img src={BackArrow} className="backarrow"/></a>
                  <h2 className="dropshadow">My Dashboard</h2>
                </div>

                <div className="side-by-side dashboard-secondary-title">
                    <h3>Following</h3>

                    <div>Search Bar</div>
                </div>

                <div className="dashboard-selection-bar">
                    <div className="dashboard-selection-item dashboard-selection-item__selected" id="following" onClick={(e) => toggleSelectionBar(e.target.id)}>Following</div>
                    <div className="dashboard-selection-item" id="followers" onClick={(e) => toggleSelectionBar(e.target.id)}>Followers</div>
                </div>

                <div className="my-dashboard__inner inner">
                {!empty ? 

                  <div className="book-card__container">
                    <div className="profile-card">
                      <a href="/profile/0" ><img src={ProfilePic} className="circle-profile-pic"/></a>
                      <div><a href="/profile/0" className="dark-link">Amira '22</a></div>
                      <a href="/profile/0" className="none">@amira0908</a>
                    </div>

                    <div className="profile-card">
                      <a href="/profile/0" ><img src={ProfilePic} className="circle-profile-pic"/></a>
                      <div><a href="/profile/0" className="dark-link">Amira '22</a></div>
                      <a href="/profile/0" className="none">@amira0908</a>
                    </div>

                    <div className="profile-card">
                      <a href="/profile/0" ><img src={ProfilePic} className="circle-profile-pic"/></a>
                      <div><a href="/profile/0" className="dark-link">Amira '22</a></div>
                      <a href="/profile/0" className="none">@amira0908</a>
                    </div>

                    <div className="profile-card">
                      <a href="/profile/0" ><img src={ProfilePic} className="circle-profile-pic"/></a>
                      <div><a href="/profile/0" className="dark-link">Amira '22</a></div>
                      <a href="/profile/0" className="none">@amira0908</a>
                    </div>

                    <div className="profile-card">
                      <a href="/profile/0" ><img src={ProfilePic} className="circle-profile-pic"/></a>
                      <div><a href="/profile/0" className="dark-link">Amira '22</a></div>
                      <a href="/profile/0" className="none">@amira0908</a>
                    </div>

                    <div className="profile-card">
                      <a href="/profile/0" ><img src={ProfilePic} className="circle-profile-pic"/></a>
                      <div><a href="/profile/0" className="dark-link">Amira '22</a></div>
                      <a href="/profile/0" className="none">@amira0908</a>
                    </div>

                    <div className="profile-card">
                      <a href="/profile/0" ><img src={ProfilePic} className="circle-profile-pic"/></a>
                      <div><a href="/profile/0" className="dark-link">Amira '22</a></div>
                      <a href="/profile/0" className="none">@amira0908</a>
                    </div>

                    <div className="profile-card">
                      <a href="/profile/0" ><img src={ProfilePic} className="circle-profile-pic"/></a>
                      <div><a href="/profile/0" className="dark-link">Amira '22</a></div>
                      <a href="/profile/0" className="none">@amira0908</a>
                    </div>

                    <div className="profile-card">
                      <a href="/profile/0" ><img src={ProfilePic} className="circle-profile-pic"/></a>
                      <div><a href="/profile/0" className="dark-link">Amira '22</a></div>
                      <a href="/profile/0" className="none">@amira0908</a>
                    </div>
                  </div>
                    : 
                    <div className="empty-state-div">
                      <div className="empty-state-title">Not following anyone yet</div>
                      <img src={EmptyState}/>
                    </div>
                  }
                </div>    
              </div>
            </div>
            <Footer/>
        </div>
  );
}

export default YourFollowing;
