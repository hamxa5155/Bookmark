import React, { useState, useEffect } from 'react';

import '../pages/style.css';

import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';

function BookCard(props) {
  const [marked, setMarked] = useState(false);

  return (
    <div className="book-card">
      { marked ? <BookmarkIcon className="bookmark-icon" onClick={() => setMarked(!marked)}/> : <BookmarkBorderIcon className="bookmark-icon" onClick={() => setMarked(!marked)}/> }
      <div onClick={() => props.setTextbookSelected(props.id)}>
      <div className="image-container">
          <img className="contain-img" src={props.image}/>
      </div>

      <div className="book-title">{props.title}</div>
      <div className="author">{props.author}</div>

      <div className="add-info">
          <div className="price">{props.price}</div>
          <button className="btn-mini">Quickview</button>
      </div>
      </div>
    </div>
  );
}

export default BookCard;
