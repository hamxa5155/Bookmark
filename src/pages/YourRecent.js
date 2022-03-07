import React, {useEffect, useState} from 'react';

import '../pages/style.css';
import '../App.css';

import Footer from '../components/Footer.js';
import NavBar from '../components/NavBarTwo.js';
import BookCard from '../components/BookCard.js';
import ProfileBannerR from '../components/ProfileBannerR.js';



import BubbleIcon03 from '../assets/bubble-icon-03.svg';
import BackArrow from '../assets/back-arrow.svg';
import TextbookImage from '../assets/test-textbook-image.png';



function YourRecent() {
  const [textbookSelected, setTextbookSelected] = useState(false);
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
                <h3>Recently Viewed</h3>

                <div>Search Bar</div>
            </div>         
          </div>
      </div>

      <div className="my-dashboard__second-inner">
          <div className="my-dashboard__inner inner">
          <div className="book-card__container">
                <BookCard
                    image={TextbookImage}
                    title={"Structures or Why Things Don't Fall Down"}
                    author={"Brian Christan"}
                    price={"$50"}
                    textbookSelected={textbookSelected}
                    setTextbookSelected={setTextbookSelected}
                />

                <BookCard
                    image={TextbookImage}
                    title={"Structures or Why Things Don't Fall Down"}
                    author={"Brian Christan"}
                    price={"$50"}
                    textbookSelected={textbookSelected}
                    setTextbookSelected={setTextbookSelected}
                />

                <BookCard
                    image={TextbookImage}
                    title={"Structures or Why Things Don't Fall Down"}
                    author={"Brian Christan"}
                    price={"$50"}
                    textbookSelected={textbookSelected}
                    setTextbookSelected={setTextbookSelected}
                />

                <BookCard
                    image={TextbookImage}
                    title={"Structures or Why Things Don't Fall Down"}
                    author={"Brian Christan"}
                    price={"$50"}
                    textbookSelected={textbookSelected}
                    setTextbookSelected={setTextbookSelected}
                />

                <BookCard
                    image={TextbookImage}
                    title={"Structures or Why Things Don't Fall Down"}
                    author={"Brian Christan"}
                    price={"$50"}
                    textbookSelected={textbookSelected}
                    setTextbookSelected={setTextbookSelected}
                />

                <BookCard
                    image={TextbookImage}
                    title={"Structures or Why Things Don't Fall Down"}
                    author={"Brian Christan"}
                    price={"$50"}
                    textbookSelected={textbookSelected}
                    setTextbookSelected={setTextbookSelected}
                />

                <BookCard
                    image={TextbookImage}
                    title={"Structures or Why Things Don't Fall Down"}
                    author={"Brian Christan"}
                    price={"$50"}
                    textbookSelected={textbookSelected}
                    setTextbookSelected={setTextbookSelected}
                />

                <BookCard
                    image={TextbookImage}
                    title={"Structures or Why Things Don't Fall Down"}
                    author={"Brian Christan"}
                    price={"$50"}
                    textbookSelected={textbookSelected}
                    setTextbookSelected={setTextbookSelected}
                />

                <BookCard
                    image={TextbookImage}
                    title={"Structures or Why Things Don't Fall Down"}
                    author={"Brian Christan"}
                    price={"$50"}
                    textbookSelected={textbookSelected}
                    setTextbookSelected={setTextbookSelected}
                />
            </div>
          </div>
          <Footer/>
      </div>
      
    </div>
  );
}

export default YourRecent;
