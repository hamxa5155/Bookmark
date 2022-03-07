import React, { useState, useEffect } from 'react';

import '../pages/style.css';

import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';

function BookCardLong(props) {

  return (
    <div className="book-card__long">
        <div className="book-card__long-inner">
          <div className="image-container">
              <img className="contain-img" src={props.image}/>
          </div>

        

          <div className="info-container">
              {props.children}

              <div>
                  <div className="book-title">{props.title}</div>
                  <div className={"book-desc"}>Author: {props.author}</div>
                  <div className={"book-desc"}>ISBN: {props.isbn}</div>
                  <div className={"book-desc"}>Publisher: {props.publisher}</div>
              </div>

              <div className="side-by-side">
                  <div className="price">{props.price}</div>
                  <button className="btn-mini" onClick={() => props.setTextbookSelected(!props.textbookSelected)}>Quickview</button>
              </div>
          </div>
        </div>

        {props.review ? 
            <div className="single-review__container">
                <a>{props.user} says:</a>
                <div className="single-review">"{props.review}"</div>
            </div>
        : ''}


    </div>
  );
}

export default BookCardLong;
