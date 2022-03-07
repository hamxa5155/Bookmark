import React, { useState, useEffect } from 'react';

import '../pages/style.css';
import '../App.css';

import Footer from '../components/Footer.js';
import NavBar from '../components/NavBarTwo.js';
import BookCard from '../components/BookCardLong.js';
import Popup from '../components/Popup.js';

import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BackArrow from '../assets/back-arrow.svg';


import AddListingIcon from '../assets/add-listing-icon.svg';
import BubbleIcon03 from '../assets/bubble-icon-03.svg';
import TextbookImage from '../assets/test-textbook-image.png';
import EmptyState from '../assets/listings-empty-state.svg';
import { Link, useHistory } from 'react-router-dom';
import {API_URL_BACKEND} from "../config/";
import { isValidHttpUrl } from '../utils';
//redux
import { connect } from "react-redux";
import { fetchBooks } from "../store/books/actions";

function YourListings(props) {
	const history = useHistory();
	const [selectedItem, setSelectedItem] = useState("orders");
	const [textbookSelected, setTextbookSelected] = useState(null);
	const [marked, setMarked] = useState(false);
	const [popupType, setPopupType] = useState("quickview");
	const empty = false; // temp variable to switch between empty and non-empty states of this page
	const [spacerDiv, setSpacerDiv] = useState(true)

	useEffect(() => {
		const isLoggedIn = localStorage.getItem('isLoggedIn-bookmarkd')
		if (isLoggedIn === 'yes')
			setSpacerDiv(false)

	}, [])

	const toggleSelectionBar = (target) => {
		document.getElementById("current").classList.remove("dashboard-selection-item__selected");
		document.getElementById("past").classList.remove("dashboard-selection-item__selected");

		document.getElementById(target).classList.add("dashboard-selection-item__selected");
		setSelectedItem(target);
	};
	useEffect(() => {
		if (!props.user?._id) {
			history.push("/log-in")
		} else {
			props.fetchBooks({type: "own"});
		}
	}, [props.user])
	return (
		<div className="profile">

			{(textbookSelected?._id) && (
				<Popup
					isOpen={textbookSelected === null ? false : true}
					setIsOpen={setTextbookSelected}
					listing={textbookSelected}
					type={popupType}
					setPopupType={setPopupType}
				>
				</Popup>
			)}
			<div className="profile-inner">
				{spacerDiv && (<div className="spacer"/>)}
				<div className="bubble-top-right">
					<img src={BubbleIcon03} />
				</div>
				<div className="my-dashboard__inner inner">
					<div className="inline">
						<Link to="/dashboard"><img src={BackArrow} className="backarrow" /></Link>
						<h2 className="dropshadow">My Dashboard</h2>
					</div>
					<div className="side-by-side dashboard-secondary-title">
						<h3>Your Listings</h3>

						<div>Search Bar</div>
					</div>
					<div className="side-by-side dashboard-selection-bar">
						<div className="side-by-side">
							<div className="dashboard-selection-item dashboard-selection-item__selected" id="current" onClick={(e) => toggleSelectionBar(e.target.id)}>Current</div>
							<div className="dashboard-selection-item" id="past" onClick={(e) => toggleSelectionBar(e.target.id)}>Past</div>
						</div>
						<Link to="/new-listing">New listing <img src={AddListingIcon} className="center-img" /></Link>
					</div>
				</div>
			</div>
			<div className="my-dashboard__second-inner">
				{props.books.length > 0 ?
					<div className="my-dashboard__inner inner">
						<div className="order-cluster">
							{props.books.map((book, i) => (
								<BookCard
									key={i}
									image={isValidHttpUrl(book.image) ? book.image : `${API_URL_BACKEND}uploads/${book.image}`}
									title={book.title}
									author={book.author}
									isbn={book.isbn}
									publisher={book.publisher}
									price={`$${book.price}`}
									textbookSelected={textbookSelected}
									setTextbookSelected={()=>setTextbookSelected(book)}
								/>
							))}
						</div>
					</div>
					:
					<div className="empty-state-div">
						<div className="empty-state-title">No listings yet</div>
						<img src={EmptyState} />
						<div>Time to get selling.</div>
						<Link to="/new-listing">
							<button className="btn-mini">Create a Listing</button>
						</Link>
					</div>
				}
				<Footer />
			</div>
		</div>
	);
}
const mapStateToProps = (state) => ({
	user: state.auth.user,
	books: state.books.books
});
const mapDispatchToProps = {
	fetchBooks
};
export default connect(mapStateToProps, mapDispatchToProps)(YourListings);