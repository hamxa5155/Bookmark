import React, { useState, useEffect } from 'react';

import '../pages/style.css';
import '../App.css';

import Footer from '../components/Footer.js';
import NavBar from '../components/NavBarTwo.js';

import BackArrow from '../assets/back-arrow.svg';
import TextbookImage from '../assets/test-textbook-image.png';
import BubbleIcon03 from '../assets/bubble-icon-03.svg';
import EmptyState from '../assets/orders-empty-state.svg';
import moment from "moment";
import { Link } from 'react-router-dom';
import {API_URL_BACKEND} from "../config/";
import { isValidHttpUrl } from '../utils';

//redux
import { connect } from "react-redux";
import { fetchOrders } from "../store/orders/actions";

function YourOrders(props) {
	const [selectedItem, setSelectedItem] = useState("orders");
	const empty = false; // temp variable to switch between empty and non-empty states of this page
	const [spacerDiv, setSpacerDiv] = useState(true)

	useEffect(() => {
		const isLoggedIn = localStorage.getItem('isLoggedIn-bookmarkd')
		if (isLoggedIn === 'yes')
			setSpacerDiv(false)

	}, [])

	const toggleSelectionBar = (target) => {
		document.getElementById("orders").classList.remove("dashboard-selection-item__selected");
		document.getElementById("open-orders").classList.remove("dashboard-selection-item__selected");
		document.getElementById("cancelled-orders").classList.remove("dashboard-selection-item__selected");

		document.getElementById(target).classList.add("dashboard-selection-item__selected");
		setSelectedItem(target);
	};
	useEffect(() => {
		props.fetchOrders()
	}, [])
	return (
		<div className="profile">
			<div className="profile-inner">
				{spacerDiv && (<div className="spacer"/>)}
				<div className="bubble-top-right">
					<img src={BubbleIcon03} />
				</div>
				<div className="my-dashboard__inner inner">
					<div className="inline">
						<a href="/dashboard"><img src={BackArrow} className="backarrow" /></a>
						<h2 className="dropshadow">My Dashboard</h2>
					</div>
					<div className="side-by-side dashboard-secondary-title">
						<h3>Your orders</h3>
						<div>Search Bar</div>
					</div>
					<div className="dashboard-selection-bar">
						<div className="dashboard-selection-item dashboard-selection-item__selected" id="orders" onClick={(e) => toggleSelectionBar(e.target.id)}>Orders</div>
						<div className="dashboard-selection-item" id="open-orders" onClick={(e) => toggleSelectionBar(e.target.id)}>Open Orders</div>
						<div className="dashboard-selection-item" id="cancelled-orders" onClick={(e) => toggleSelectionBar(e.target.id)}>Cancelled Orders</div>
					</div>
					{props.orders.length > 0 ?
						<div>
							{props.orders.map((order, i) => (
								<div className="order-cluster" key={`order-cluster-${i}`}>
									<div className="bold">Order placed on {moment(order.created_on).format("ddd, Do MMM yyyy")}</div>
									{order.book_ids.map((book, j) => (
										<div className="order-container" key={`order-container-${j}`}>
											<div className="image-container">
												<img className="contain-img" src={isValidHttpUrl(book.image) ? book.image : `${API_URL_BACKEND}uploads/${book.image}`} />
											</div>
											<div className="side-by-side order-info ext">
												<div>
													<h5 className="semibold">{book.title}</h5>
													<div>Authors: {book.author}</div>
													<div>ISBN: {book.isbn}</div>
												</div>
												<div>
													<p className="right">${book.price}</p>
													<div>
														<button className="sign-up-button btn-mini">View item</button>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							))}
						</div>
						:
						<div className="empty-state-div">
							<div className="empty-state-title">No orders yet</div>
							<img src={EmptyState} />
							<div>Let's change that!</div>
							<Link to="/marketplace">
								<button className="btn-mini">Check out listings</button>
							</Link>
						</div>
					}
				</div>
			</div>
			<Footer />
		</div>
	);
}
const mapStateToProps = (state) => ({
	user: state.auth.user,
	orders: state.orders.orders
});
const mapDispatchToProps = {
	fetchOrders
};
export default connect(mapStateToProps, mapDispatchToProps)(YourOrders);