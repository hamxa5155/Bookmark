import React, {useEffect, useState} from 'react';

import '../pages/style.css';
import '../App.css';

import Footer from '../components/Footer.js';
import NavBar from '../components/NavBarTwo.js';
import BookCard from '../components/BookCard.js';
import ProfileBannerR from '../components/ProfileBannerR.js';



import BubbleIcon03 from '../assets/bubble-icon-03.svg';
import SendIcon from '@material-ui/icons/Send';
import AddIcon from '@material-ui/icons/Add';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import SearchIcon from '@material-ui/icons/Search';



import Bubble from '../assets/bubble-icon-06.svg';
import TextbookImage from '../assets/test-textbook-image.png';


const profile = {
    "year": 22,
    "name": "Michael",
    "username": "michaelh224",    
};


function Profile() {
  const [textbookSelected, setTextbookSelected] = useState(false);
  const [marked, setMarked] = useState(false);
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

        <ProfileBannerR 
            profile={profile}
            stars={<div className="profile-rating">
                <StarBorderIcon/>
                <StarBorderIcon/>
                <StarBorderIcon/>
                <StarBorderIcon/>
                <StarBorderIcon/>
            </div>}/>

        <div className="profile-bottom">

            <div className="profile-bottom__inner inner">
                <div className="user-profile-info">
                    <div>University of Florida</div>
                    <div>class of 2022</div>
                    <div>Major: Biology</div>
                    <hr/>
                    <a href="/messages">Send message</a>
                </div>
                <div className="user-profile-content">
                    <div className="user-profile-content-title">Listings</div>
                    <hr/>

                    <div className="book-card__container-small">
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

                    <div className="user-profile-content-title">Reviews</div>
                    <hr/>

                    <div className="book-card__container-small">
                        <div className="review-card">
                            <div className="review-card-title">Amanda '23 says:</div>
                            <div>“Michael was a great seller. He always answered my messages on time and was really understanding when trying to arrange a time to meet up. I would definitely buy from him again!”</div>
                            <img className="review-card-bubble" src={Bubble}/>
                        </div>

                    </div>
                </div>
            </div>
            <Footer/>

        </div>

        
        </div>
    </div>
  );
}

export default Profile;
