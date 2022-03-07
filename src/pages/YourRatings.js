import React, {useEffect, useState} from 'react';
import { BrowserRouter, Switch, Route, Redirect, useParams } from 'react-router-dom';

import '../pages/style.css';
import '../App.css';

import Footer from '../components/Footer.js';
import NavBar from '../components/NavBarTwo.js';
import BookCard from '../components/BookCardLong.js';

import BubbleIcon03 from '../assets/bubble-icon-03.svg';
import BackArrow from '../assets/back-arrow.svg';
import TextbookImage from '../assets/test-textbook-image.png';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import EmptyState from '../assets/ratings-empty-state.svg';
import {Grid} from "@material-ui/core";


function YourRatings(props) {
  const [textbookSelected, setTextbookSelected] = useState(false);
  const empty = false; // temp variable to switch between empty and non-empty states of this page
  const [spacerDiv, setSpacerDiv] = useState(true)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn-bookmarkd')
    if (isLoggedIn === 'yes')
      setSpacerDiv(false)

  }, [])

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
                  <h3>Your Ratings</h3>
              </div>         
          </div>
      </div>

      <div className="my-dashboard__second-inner">
            <div className="my-dashboard__inner inner">
              {!empty ?
                  // <Grid
                  //     container
                  //     direction="column"
                  //     justifyContent="center"
                  //     alignItems="stretch"
                  //     className="order-cluster"
                  // >
                  //   <Grid item>
                  //     <BookCard
                  //         image={TextbookImage}
                  //         title={"Structures or Why Things Don't Fall Down"}
                  //         author={"Brian Christan"}
                  //         isbn={"2938528572357"}
                  //         price={"$50"}
                  //         textbookSelected={textbookSelected}
                  //         setTextbookSelected={setTextbookSelected}
                  //     >
                  //       <div className="side-by-side">
                  //         <p className="bold">@username rated this:</p>
                  //         <div>
                  //           <StarBorderIcon/>
                  //           <StarBorderIcon/>
                  //           <StarBorderIcon/>
                  //           <StarBorderIcon/>
                  //           <StarBorderIcon/>
                  //         </div>
                  //       </div>
                  //
                  //     </BookCard>
                  //   </Grid>
                  //
                  //   <Grid item>
                  //     <BookCard
                  //         image={TextbookImage}
                  //         title={"Structures or Why Things Don't Fall Down"}
                  //         author={"Brian Christan"}
                  //         isbn={"2938528572357"}
                  //         price={"$50"}
                  //         textbookSelected={textbookSelected}
                  //         setTextbookSelected={setTextbookSelected}
                  //     >
                  //       <div>
                  //         <div className="side-by-side">
                  //           <p className="bold">@username rated this:</p>
                  //           <div>
                  //             <StarBorderIcon/>
                  //             <StarBorderIcon/>
                  //             <StarBorderIcon/>
                  //             <StarBorderIcon/>
                  //             <StarBorderIcon/>
                  //           </div>
                  //         </div>
                  //         <div className="flex-right">
                  //           <a href="/dashboard/ratings/0">View comments <ArrowRightAltIcon className="center-img"/></a>
                  //         </div>
                  //       </div>
                  //
                  //     </BookCard>
                  //
                  //   </Grid>
                  // </Grid>
                <div className="order-cluster">

                    <BookCard
                        image={TextbookImage}
                        title={"Structures or Why Things Don't Fall Down"}
                        author={"Brian Christan"}
                        isbn={"2938528572357"}
                        price={"$50"}
                        textbookSelected={textbookSelected}
                        setTextbookSelected={setTextbookSelected}
                    >
                      <div className="side-by-side">
                        <p className="bold">@username rated this:</p>
                        <div className={"smallSize"}>
                            <StarBorderIcon/>
                            <StarBorderIcon/>
                            <StarBorderIcon/>
                            <StarBorderIcon/>
                            <StarBorderIcon/>
                        </div>
                      </div>

                    </BookCard>

                    <BookCard
                        image={TextbookImage}
                        title={"Structures or Why Things Don't Fall Down"}
                        author={"Brian Christan"}
                        isbn={"2938528572357"}
                        price={"$50"}
                        textbookSelected={textbookSelected}
                        setTextbookSelected={setTextbookSelected}
                    >
                      <div>
                      <div className="side-by-side">
                        <p className="bold">@username rated this:</p>
                        <div className={"smallSize"}>
                            <StarBorderIcon/>
                            <StarBorderIcon/>
                            <StarBorderIcon/>
                            <StarBorderIcon/>
                            <StarBorderIcon/>
                        </div>
                      </div>
                      <div className="flex-right">
                        <a href="/dashboard/ratings/0">
                          View comments <ArrowRightAltIcon className="center-img"/>
                        </a>
                      </div>
                      </div>

                    </BookCard>
                </div>
                : 
                  <div className="empty-state-div">
                    <div className="empty-state-title">No ratings yet</div>
                    <img src={EmptyState}/>
                  </div>
                }
            </div>
            <Footer/>

        </div>
      
    </div>
  );
}

export default YourRatings;
