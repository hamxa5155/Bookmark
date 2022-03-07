import React, {useEffect, useState} from 'react';

import '../pages/style.css';
import '../App.css';

import Footer from '../components/Footer.js';
import NavBar from '../components/NavBarTwo.js';
import BookCard from '../components/BookCard.js';
import Popup from '../components/Popup.js';

import BackArrow from '../assets/back-arrow.svg';
import BubbleIcon03 from '../assets/bubble-icon-03.svg';
import TextbookImage from '../assets/test-textbook-image.png';
import EmptyState from '../assets/bookmarks-empty-state.svg';

const Listings = require('../data/Listings.json');



function YourBookmarks() {
  const empty = false; // temp variable to switch between empty and non-empty states of this page
  const [textbookSelected, setTextbookSelected] = useState(false);
  const [popupType, setPopupType] = useState("quickview");
  const [spacerDiv, setSpacerDiv] = useState(true)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn-bookmarkd')
    if (isLoggedIn === 'yes')
      setSpacerDiv(false)

  }, [])


    const showBookCards = () => {
        return (
        Listings.Listings.map((item) => (
            <BookCard
                id={item.id}
                image={TextbookImage}
                title={item.title}
                author={item.author}
                price={"$" + `${item.price}`}
                textbookSelected={textbookSelected}
                setTextbookSelected={setTextbookSelected}
            />   
        ))
        );
    }

  return (
    <div className="profile">
        {textbookSelected && (
            <Popup
                isOpen={textbookSelected}
                setIsOpen={setTextbookSelected}
                type={popupType}
                setPopupType={setPopupType}
                listing={Listings.Listings[textbookSelected-1]}
            />  
        )}

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
                <h3>Your Bookmarks</h3>

                <div>Search Bar</div>
            </div>         
          </div>
      </div>

      
      <div className="my-dashboard__second-inner">
        {!empty ?
            <div className="my-dashboard__inner inner">
                <div className="book-card__container">
                    {showBookCards()}
                </div>
            </div>
          :
            <div className="empty-state-div">
                <div className="empty-state-title">No bookmarks yet</div>
                <img src={EmptyState}/>
                <div>Explore the selection</div>
                <button className="btn-mini">Check out the marketplace</button>
            </div>
            }
          <Footer/>
      </div>
      
      
    </div>
  );
}

export default YourBookmarks;
