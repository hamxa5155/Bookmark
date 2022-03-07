import '../pages/style.css';
import '../App.css';

import NavBar from '../components/NavBar.js';
import Footer from '../components/Footer.js';

import PlaceholderProfPic from '../assets/profile-picture-placeholder.png';
import TopBubble from '../assets/bubble-icon-04.svg';
import BottomBubble from '../assets/bubble-icon-05.svg';
import {Divider, Grid} from '@material-ui/core';
import {useEffect, useState} from "react";


function TheTeam() {
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

                    <div className="inner">
                        <h2 className="dropshadow">Meet The Team</h2>
                        <div className="info-page-subheader">BookMark’d wouldn’t be all it is without this amazing team. Here’s a little bit more about who they are and what they do:</div>

                        <div className="book-card__container-small">
                            <div className="team-card">
                                <div className="semibold">Role</div>
                                <img src={PlaceholderProfPic}/>
                                <div className="semibold">Name</div>
                                <div>Degree</div>
                                <div className="tiny-text">Short bio</div>
                            </div>

                            <div className="team-card">
                                <div className="semibold">Role</div>
                                <img src={PlaceholderProfPic}/>
                                <div className="semibold">Name</div>
                                <div>Degree</div>
                                <div className="tiny-text">Short bio</div>
                            </div>

                            <div className="team-card">
                                <div className="semibold">Role</div>
                                <img src={PlaceholderProfPic}/>
                                <div className="semibold">Name</div>
                                <div>Degree</div>
                                <div className="tiny-text">Short bio</div>
                            </div>
                        </div>
                    </div>

                    <img className="bubble-bottom-right" src={BottomBubble}/>
                    <Footer/>
                </div>
            </Grid>
        </>

    );
}

export default TheTeam;
