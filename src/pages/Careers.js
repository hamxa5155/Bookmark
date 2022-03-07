import '../pages/style.css';
import '../App.css';

import NavBar from '../components/NavBar.js';
import Footer from '../components/Footer.js';

import TopBubble from '../assets/bubble-icon-04.svg';
import BottomBubble from '../assets/bubble-icon-05.svg';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import {useEffect, useState} from "react";
import {Grid} from "@material-ui/core";
import {Row, Col} from "react-bootstrap";


function Careers() {
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
                        <h2 className="dropshadow">Careers</h2>
                        <div className="info-page-subheader">BookMark’d is always looking for extra help to grow this community. Below are some positions we are currently looking for:</div>

                        <div className="careers-list__container">
                            <div className="career-item">
                                <div className="side-by-side">
                                    <div>Position</div>
                                    <div className="mini">Weekly Hours/Pay Rate</div>
                                </div>
                                <div className="side-by-side">
                                    <div className="mini">Description of role...</div>
                                    <a className="">See more <ArrowRightAltIcon className="center-img"/></a>
                                </div>
                            </div>

                            <div className="career-item">
                                <div className="side-by-side">

                                    <div>Position</div>
                                    <div className="mini">Weekly Hours/Pay Rate</div>
                                </div>
                                <div className="side-by-side">
                                    <div className="mini">Description of role...</div>
                                    <a className="">See more <ArrowRightAltIcon className="center-img"/></a>
                                </div>
                            </div>

                            <div className="career-item">
                                <div className="side-by-side">
                                    <div>Position</div>
                                    <div className="mini">Weekly Hours/Pay Rate</div>
                                </div>
                                <div className="side-by-side">
                                    <div className="mini">Description of role...</div>
                                    <a className="">See more <ArrowRightAltIcon className="center-img"/></a>
                                </div>
                            </div>

                            <div className="career-item">
                                <div className="side-by-side">
                                    <div>Position</div>
                                    <div className="mini">Weekly Hours/Pay Rate</div>
                                </div>
                                <div className="side-by-side">
                                    <div className="mini">Description of role...</div>
                                    <a className="">See more <ArrowRightAltIcon className="center-img"/></a>
                                </div>
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

export default Careers;
