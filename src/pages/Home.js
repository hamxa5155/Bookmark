import React, { useState, useEffect } from 'react';

import './style.css';
import '../App.css';


import NavBar from '../components/NavBar.js';
import HowItWorksIcons from '../components/HowItWorksIcons.js';
import SearchBar from '../components/SearchBar.js';
import Footer from '../components/Footer.js';

import GraduationImage from '../assets/welcome_image.svg';

import CreateAccountIcon from '../assets/create-account-icon.svg';
import CreateListingIcon from '../assets/create-listing-icon.svg';
import PublishListingIcon from '../assets/publish-listing-icon.svg';

import FindBookIcon from '../assets/find-book-icon.svg';
import StripeIcon from '../assets/stripe-icon.svg';
import ArrangePickUpIcon from '../assets/arrange-pick-up-icon.svg';

import CampusConnectionIcon from '../assets/campus-connection-icon.svg';
import EcoFriendlyIcon from '../assets/eco-friendly-icon.svg';
import AffordableIcon from '../assets/affordable-icon.svg';
import ThanksContactImg from '../assets/contact-submit-img.svg';
import BubbleIcon02 from '../assets/bubble-icon-02.svg';

import QuoteIcon from '../assets/quote-icon.svg';
import {Grid} from "@material-ui/core";
import useMediaQuery from "@mui/material/useMediaQuery";



function Home(props) {
    const [x, setX] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const matches = useMediaQuery('(max-width: 750px)')
    const [spacerDiv, setSpacerDiv] = useState(true)

    // console.log(props.mode)
    const soldCheckbox = ({ target: { checked } }) => {
        console.log(x, checked);
        setX(checked);
    };

    useEffect(() => {
        localStorage.setItem('isHomePage', 'yes')
        const isLoggedIn = localStorage.getItem('isLoggedIn-bookmarkd')

        if (isLoggedIn === undefined || isLoggedIn === null)
            localStorage.setItem('isLoggedIn-bookmarkd', 'no')
        else if (isLoggedIn === 'yes')
            setSpacerDiv(false)

        return () => localStorage.setItem('isHomePage', 'no')
    }, [])


    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="stretch"
            >
                <Grid item direction={"row"}>
                    <div>
                        {spacerDiv && (<div className="spacer"/>)}
                        <div className="welcome-section">
                            <div className="welcome-section__inner inner">

                                <div className="welcome-section-image__container">
                                    <img className="welcome-section-image" src={GraduationImage}/>
                                </div>

                                <div className="welcome-section-text__container">
                                    <div className="welcome-section-text__inner">
                                        <h1 className={"mobile-view"}>Peer-to-Peer College <span style={{fontFamily: 'Poppins Bold'}}>Textbook Marketplace</span></h1>
                                        <h1>Peer-to-Peer College</h1>
                                        <h1 style={{fontFamily: 'Poppins Bold'}}>Textbook Marketplace</h1>
                                        <p>Buy and sell your textbook materials right on your college campus</p>
                                        <SearchBar/>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </Grid>

                <Grid item direction={"row"}>
                    <div id="how-it-works" className="how-it-works">
                        <div className="how-it-works__inner inner">
                            <h2>How it <span style={{fontFamily: 'Poppins Bold'}}>Works</span></h2>
                            <p>We’ve made sure our services are secure and simple. We require that all members sign up with .edu emails only and set up two-step verification. We only charge <span style={{fontFamily: 'Poppins Bold'}}>10% per transaction</span> on the platform, so you can be sure to save most of your earnings.</p>

                            <label className="switch">
                                <input id='how-it-works__checkbox' type="checkbox" checked={x} onChange={soldCheckbox}/>
                                <span className="slider round">
                            <div>Buyer</div>
                            <div>Seller</div>
                        </span>
                            </label>

                            { x ?
                                <HowItWorksIcons
                                    icon1={CreateAccountIcon}
                                    description1={<h5>Create an account with<br/> BookMark’d or log in</h5>}
                                    icon2={CreateListingIcon}
                                    description2={<h5>Create a new listing with<br/> your book information</h5>}
                                    icon3={PublishListingIcon}
                                    description3={<h5>Publish your listing to get<br/> selling!</h5>}
                                />
                                :
                                <HowItWorksIcons
                                    icon1={FindBookIcon}
                                    description1={<h5>Find the book you’d like to buy</h5>}
                                    icon2={StripeIcon}
                                    description2={<h5>Pay through Stripe<br/> Payment Processor</h5>}
                                    icon3={ArrangePickUpIcon}
                                    description3={<h5>Arrange pick-up with<br/> seller to get your book</h5>}
                                />
                            }
                            <button className={"mobile-margin"}>Learn More</button>
                        </div>
                    </div>

                </Grid>

                <Grid item direction={"row"}>
                    <div id="our-mission" className="our-mission">
                        <div className="our-mission__inner inner">
                            <h2>Our <span style={{fontFamily: 'Poppins Bold'}}>Mission</span></h2>

                            <div className="our-mission-quote__container">
                                <img className={'quoteIcon'} src={QuoteIcon}/>
                                <div className="our-mission-quote__text">
                                    <h4>Our goal is to give power back to the students.</h4>
                                    <p>In the spring of 2019, Sharod Farmer, an undergraduate at the University of Florida, noticed the barriers, lack of resources, and financial hardships associated with purchasing textbooks. The buying system for purchasing textbooks had remained relatively stagnant in an age of consistent advancement. Farmer saw an opportunity to create a specialized book exchange by keeping the buying transactions personalized. In 2019, he founded BookMark’d, the first-ever textbook exchange created for students by students.</p>
                                </div>


                                {/*<Grid*/}
                                {/*    container*/}
                                {/*    direction={!matches ? "row" : "column"}*/}
                                {/*    justifyContent={!matches ? "flex-start": "center"}*/}
                                {/*    alignItems={!matches ? "center" : "flex-start"}*/}
                                {/*>*/}
                                {/*    <Grid item>*/}
                                {/*        <img className={'quoteIcon'} src={QuoteIcon}/>*/}
                                {/*    </Grid>*/}

                                {/*    <Grid item>*/}
                                {/*        <div className="our-mission-quote__text">*/}
                                {/*            <h4>Our goal is to give power back to the students.</h4>*/}
                                {/*            <p>In the spring of 2019, Sharod Farmer, an undergraduate at the University of Florida, noticed the barriers, lack of resources, and financial hardships associated with purchasing textbooks. The buying system for purchasing textbooks had remained relatively stagnant in an age of consistent advancement. Farmer saw an opportunity to create a specialized book exchange by keeping the buying transactions personalized. In 2019, he founded BookMark’d, the first-ever textbook exchange created for students by students.</p>*/}
                                {/*        </div>*/}
                                {/*    </Grid>*/}

                                {/*</Grid>*/}

                            </div>

                            <h4 className="three-pillars-title">We operate on these three pillars:</h4>

                            <div className="how-it-works__icon-container cards-width">
                                <Grid
                                    container
                                    direction={!matches ? "row" : "column"}
                                    justifyContent="center"
                                    alignItems="center"
                                    spacing={5}
                                >
                                    <Grid item>
                                        <div className="how-it-works__icon-card">
                                            <img className={"cardImage"} src={CampusConnectionIcon}/>
                                            <h5>Campus Connection</h5>
                                            <p>Creating a community<br/> for college students</p>
                                        </div>

                                    </Grid>

                                    <Grid item>
                                        <div className="how-it-works__icon-card">
                                            <img className={"cardImage"} src={EcoFriendlyIcon}/>
                                            <h5>Eco-Friendly</h5>
                                            <p>Promoting a more<br/> sustainable campus</p>
                                        </div>

                                    </Grid>

                                    <Grid item>
                                        <div className="how-it-works__icon-card">
                                            <img className={"cardImage"} src={AffordableIcon}/>
                                            <h5>Affordable</h5>
                                            <p>Helping students save<br/> money on materials</p>
                                        </div>
                                    </Grid>

                                </Grid>

                            </div>
                        </div>
                    </div>

                </Grid>

                <Grid item direction={"row"}>
                    <div id="contact-us" className="contact-us">
                        <div className="welcome-section__inner inner-contact-us">
                            {!submitted ?
                                <div className="contact-us-form__container">
                                    <form className="contact-us-form">
                                        <h4>We want to hear from you!</h4>
                                        <p>Fill out this form to get in touch with us. We will respond as soon as we can!</p>
                                        <div className="side-by-side-input">
                                            <input
                                                type="text"
                                                placeholder="name"
                                                className="search-bar__container"
                                                style={{width: '95%'}}
                                            />
                                            <input
                                                type="text"
                                                placeholder=".edu email"
                                                className="search-bar__container"
                                            />
                                        </div>
                                        <select name="example" className="search-bar__container">
                                            <option selected="selected" value="Subject">Subject</option>
                                            <option value="one">Choice 1</option>
                                            <option value="two">Choice 2</option>
                                        </select>
                                        <input
                                            style={{margin:"1rem .5rem"}}
                                            type="textarea"
                                            placeholder="How can we help you?"
                                            className="search-bar__container"
                                        />
                                        <div className="contact-us__button-container">
                                            <button className="contact-us__button" onClick={() => setSubmitted(true)}>Submit</button>
                                        </div>
                                    </form>
                                </div>
                                :
                                <div className="welcome-section-text__container contact-us-thanks inner">
                                    <div>
                                        <h3>Thank you for contacting us!</h3>
                                        <div className="contact-us-thanks-inner">
                                            <img className={matches && "mt-3"} src={ThanksContactImg}/>
                                            <div className={"after-submit"}>
                                                <p>We will respond to your message as soon as possible. In the meantime, feel free to read through our FAQ page to see if that answers any of your other concerns. </p>
                                                <a href="/faq">View FAQs</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }

                        </div>
                        <div className="bubble-contact-form">
                            <img className="welcome-section-image" src={BubbleIcon02}/>
                        </div>
                    </div>
                </Grid>

            </Grid>
            <div className={"footer-position"}>
                <Footer />
            </div>
        </>

    );
}

export default Home;
