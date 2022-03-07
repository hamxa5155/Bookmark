import React, {useEffect, useState} from 'react';
import { BrowserRouter, Switch, Route, Redirect, useParams } from 'react-router-dom';

import '../pages/style.css';
import '../App.css';

import Footer from '../components/Footer.js';
import NavBar from '../components/NavBarTwo.js';
import BookCard from '../components/BookCardLong.js';
import BackArrow from '../assets/back-arrow.svg';

import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

import BubbleIcon03 from '../assets/bubble-icon-03.svg';
import TextbookImage from '../assets/test-textbook-image.png';
import StarBorderIcon from '@material-ui/icons/StarBorder';



function YourRatingsSingle(props) {
  const [textbookSelected, setTextbookSelected] = useState(false);
  const [spacerDiv, setSpacerDiv] = useState(true)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn-bookmarkd')
    if (isLoggedIn === 'yes')
      setSpacerDiv(false)

  }, [])

  const { id } = props.match.params;
  console.log(id);

  return (
    <div className="profile">

      <div className="profile-inner">
        {spacerDiv && (<div className="spacer"/>)}

          <div className="bubble-top-right">
              <img src={BubbleIcon03}/>
          </div>

          <div className="my-dashboard__inner inner">
            <div className="inline">
                <a href="/dashboard/ratings"><img src={BackArrow} className="backarrow"/></a>
                <h2 className="dropshadow">My Dashboard</h2>
            </div>

            <div className="side-by-side dashboard-secondary-title">
                <h3>Your Ratings</h3>
            </div>         
          </div>
      </div>

      <div className="my-dashboard__second-inner">
            <div className="my-dashboard__inner inner">
                <div className="order-cluster">
                    <BookCard
                        image={TextbookImage}
                        title={"Structures or Why Things Don't Fall Down"}
                        author={"Brian Christan"}
                        isbn={"2938528572357"}
                        price={"$50"}
                        textbookSelected={textbookSelected}
                        setTextbookSelected={setTextbookSelected}
                        user="username"
                        review="Michael was a great seller. He always answered my messages on time and was really understanding when trying to arrange a time to meet up. I would definitely buy from him again!">
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
                        </div>
                    </BookCard>
                </div>
            </div>
            <Footer/>

        </div>
      
    </div>
  );
}

export default YourRatingsSingle;
