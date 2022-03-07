import '../pages/style.css';
import '../App.css';

import NavBar from '../components/NavBar.js';
import Footer from '../components/Footer.js';

import TopBubble from '../assets/bubble-icon-04.svg';
import BottomBubble from '../assets/bubble-icon-05.svg';
import InviteFriend from '../assets/invite-friend.svg';
import {useEffect, useState} from "react";
import {Grid} from "@material-ui/core";


function InviteAFriend() {
  const [spacerDiv, setSpacerDiv] = useState(true)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn-bookmarkd')
    if (isLoggedIn === 'yes')
      setSpacerDiv(false)

    localStorage.setItem('isHomePage', 'no')
  }, [])

    return (
        <>
          <Grid
              container
              direction="column"
              justifyContent="flex-end"
              alignItems="stretch"
          >
            <div className="info-page">
              {spacerDiv && (<div className="spacer"/>)}
              <img className="bubble-top-left" src={TopBubble}/>

              <div className="inner invite-a-friend">
                <h2 className="dropshadow">Invite a friend</h2>
                <img src={InviteFriend}/>
                <div className="info-page-subheader invite-a-friend-subheader">Do you know someone that would love the BookMark’d community? Send them an invite!</div>

                <div className="invitation-input-container">
                  <input placeholder="Type their .edu email"/>
                </div>

                <button className="btn-mini">Send invite</button>
              </div>

              <img className="bubble-bottom-right" src={BottomBubble}/>
              <Footer/>
            </div>
          </Grid>
        </>

    );
}

export default InviteAFriend;
