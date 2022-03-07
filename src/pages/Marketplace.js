import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import '../pages/style.css';
import '../App.css';

import BookCardMarketPlace from '../components/BookCardMarketPlace';
import Dropdown from '../components/Dropdown.js';
import Popup from '../components/Popup.js';
import Footer from '../components/Footer.js';
import { API_URL_BACKEND } from "../config/";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { isValidHttpUrl } from '../utils';

//redux
import { connect } from "react-redux";
import { fetchBooks } from "../store/books/actions";
import {Grid} from "@material-ui/core";
import {Col, Row} from "react-bootstrap";
const Listings = require('../data/Listings.json');

function Marketplace(props) {
    const [textbookSelected, setTextbookSelected] = useState(null);
    const [popupType, setPopupType] = useState("quickview");
    const [spacerDiv, setSpacerDiv] = useState(true)

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn-bookmarkd')
        if (isLoggedIn === 'yes')
            setSpacerDiv(false)

        localStorage.setItem('isHomePage', 'no')
        props.fetchBooks({ type: "marketplace" })
    }, [])
    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="flex-end"
                alignItems="stretch"
            >
                <div className="marketplace">
                    {textbookSelected && (
                        <Popup
                            isOpen={textbookSelected === null ? false : true}
                            setIsOpen={setTextbookSelected}
                            listing={textbookSelected}
                            type={popupType}
                            setPopupType={setPopupType}
                        />
                    )}
                    {spacerDiv && (<div className="spacer"/>)}
                    <div className="marketplace-title">
                        <h2 className="dropshadow">Marketplace</h2>
                    </div>
                    <div className="marketplace__inner inner">
                        <div className="search-bar__container-outer">
                            <div className="search-bar__container">
                                <input
                                    className="search-input"
                                    type="text"
                                    placeholder="Search by ISBN, Book Title, Author, Class"
                                />
                                <SearchIcon className="search-icon"/>
                            </div>

                        </div>
                        <div className="sort-and-filter__container">
                            <Dropdown title={<div style={{display: "flex"}}>Filter By <ExpandMoreIcon/></div>}>
                                <div className="drop-down__container">
                                    <div className="filter-item">
                                        <input id="price" name="price" type="checkbox"/>
                                        <label htmlFor="price">Price Negotiable</label>
                                    </div>
                                    <div className="filter-item">
                                        <input id="new" name="new" type="checkbox"/>
                                        <label className="filter-item__new" htmlFor="new">New</label>

                                        <input id="used" name="used" type="checkbox"/>
                                        <label htmlFor="used">Used</label>
                                    </div>
                                    <div className="filter-item seller-rating">
                                        Seller Rating:
                                        <StarBorderIcon/>
                                        <StarBorderIcon/>
                                        <StarBorderIcon/>
                                        <StarBorderIcon/>
                                        <StarBorderIcon/>
                                    </div>
                                    <div className="filter-item">
                                        <input id="distance" name="distance" type="checkbox"/>
                                        <label htmlFor="distance">Distance</label>
                                    </div>
                                </div>
                            </Dropdown>
                            <Dropdown title={<div style={{display: "flex"}}>Sort By <ExpandMoreIcon/></div>}>
                                <div className="drop-down__container drop-down-right">
                                    <div>Relevance</div>
                                    <div>Price Low to High</div>
                                    <div>Price High to Low</div>
                                    <div>Ratings High to Low</div>
                                </div>
                            </Dropdown>
                        </div>
                        <div className="book-card__container">
                            {/* {showBookCards()} */}
                            {props.books.map((book, i) => (
                                <BookCardMarketPlace
                                    key={i}
                                    image={isValidHttpUrl(book.image) ? book.image : `${API_URL_BACKEND}uploads/${book.image}`}
                                    title={book.title}
                                    author={book.author}
                                    isbn={book.isbn}
                                    publisher={book.publisher}
                                    price={`$${book.price}`}
                                    textbookSelected={textbookSelected}
                                    setTextbookSelected={() => setTextbookSelected(book)}
                                />
                            ))}
                        </div>
                    </div>
                    <Footer/>
                </div>

            </Grid>

        </>
    );
}
const mapStateToProps = (state) => ({
    user: state.auth.user,
    books: state.books.allBooks
});
const mapDispatchToProps = {
    fetchBooks
};
export default connect(mapStateToProps, mapDispatchToProps)(Marketplace);