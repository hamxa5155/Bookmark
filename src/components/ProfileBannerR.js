import React, { useState, useEffect } from 'react';

import '../pages/style.css';

import ProfilePic from '../assets/temp-profile.png';


function ProfileBannerR(props) {
  return (
    <div className="profile-top">
        <div className="profile-top__inner inner">
            <div className="user-profile-icon__container">
                <img className="user-profile-icon" src={"/avatar.png"}/>
            </div>

            <div className="profile-title">
                <div className="profile-name">{props.profile.name} ‘{props.profile.year}</div>
                <div className="profile-username">{props.profile.username}</div>
            </div>

            {props.stars}
        </div>
    </div>
  );
}

export default ProfileBannerR;
