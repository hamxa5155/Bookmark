import React, { useEffect, useState } from 'react';

import '../pages/style.css';
import '../App.css';

import NavBar from '../components/NavBarTwo.js';

import BubbleIcon03 from '../assets/bubble-icon-03.svg';
import StripeCheckout from 'react-stripe-checkout';
import Swal from "sweetalert2";
import EmptyState from '../assets/listings-empty-state.svg';
import { Link, useHistory } from 'react-router-dom';
//redux
import { connect } from "react-redux";
import {removeItem} from "../store/cart/actions";
import {placeOrder} from "../store/orders/actions";
import Footer from "../components/Footer";

function YourBackpack(props) {
	const history = useHistory();
	const [textbookSelected, setTextbookSelected] = useState(false);
	const [marked, setMarked] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);
	const [spacerDiv, setSpacerDiv] = useState(true)

	useEffect(() => {
		const isLoggedIn = localStorage.getItem('isLoggedIn-bookmarkd')
		if (isLoggedIn === 'yes')
			setSpacerDiv(false)

	}, [])

	const onToken = async(token) => {
		console.log(token)
		await props.placeOrder({
			book_ids: JSON.stringify(props.cartItems.map(item => item.book_id._id))
		})
		Swal.fire("Purchase Successfull", "", "success").then(()=>{
			history.push("/dashboard/orders");
		})
		// fetch('/save-stripe-token', {
		//   method: 'POST',
		//   body: JSON.stringify(token),
		// }).then(response => {
		//   response.json().then(data => {
		//     alert(`We are in business, ${data.email}`);
		//   });
		// });
	}
	useEffect(()=>{
		let totalTemp = 0;
		props.cartItems.map(item =>{
			totalTemp += item.book_id.price
		})
		setTotalPrice(totalTemp);
	}, [props.cartItems])
	useEffect(() => {
		if (!props.user?._id) {
			history.push("/log-in")
		}
	}, [props.user])
	return (
		<div className="your-backpack">
			{spacerDiv && (<div className="spacer"/>)}
			<div className="bubble-top-right">
				<img src={BubbleIcon03} />
			</div>
			<div className="marketplace__inner inner">
				<div className="marketplace-title your-backpack">
					<h2 className="dropshadow">Your Backpack</h2>
				</div>
				{props.cartItems.length > 0 ? (
					<>
						{props.cartItems.map((cart, i) => (
							<div className="backpack-item">
								<hr />
								<div className="two-column__container">
									<div className="left-column">
										<div className="backpack-item__title">“{cart.book_id.title}”</div>
										<div className="backpack-item__isbn">ISBN: {cart.book_id.isbn}</div>
										<div className="profile-banner__container">
											<div className="profile-icon-mini">{' '}</div>
											<div>
												<div className="profile-banner__name">Megan '22</div>
												<div className="profile-banner__location">
													<div>Gainesville, FL</div>
												</div>
											</div>
										</div>
									</div>
									<div className="right-column">
										<div className="backpack-item__price">${cart.book_id.price}</div>
										<button className="btn-mini quickview-button">Quickview</button>
										<button 
											className="btn-mini remove-button" 
											style={{ backgroundColor: "#55896B" }}
											onClick={()=>props.removeItem({id: cart._id})}
										>
											Remove
										</button>
									</div>
								</div>
							</div>
						))}
						<div>
							<hr />
							<div className="backpack-item">
								<div className="side-by-side">
									<div className="side-by-side" style={{ fontSize: "2rem" }}>
										<div style={{ paddingRight: "4rem" }}>Total:</div>
										<div>${totalPrice}</div>
									</div>
									{/* <a href="/checkout"><button className="btn-confined">Checkout with STRIPE</button></a> */}
									<StripeCheckout
										name="BookMark'd"
										description="Peer-to-Peer College Textbook Marketplace"
										image="https://winmagictoys.com/wp-content/uploads/2018/09/dummy-logo.png" // the pop-in header image (default none)
										ComponentClass="div"
										panelLabel="Checkout with STRIPE"
										amount={totalPrice * 100} // cents
										currency="USD"
										stripeKey="pk_test_Hlzw0hXgwFKj02u3TTsBpyDb00PwLh40nb"
										email="info@bookmarkd.com"
										billingAddress={false}
										// Note: enabling both zipCode checks and billing or shipping address will
										// cause zipCheck to be pulled from billing address (set to shipping if none provided).
										zipCode={false}
										allowRememberMe={true} // "Remember Me" option (default true)
										token={onToken} // submit callback
									// Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
									// useful if you're using React-Tap-Event-Plugin
									// triggerEvent="onTouchTap"
									>
										<button className="btn-confined">Checkout with STRIPE</button>
									</StripeCheckout>
								</div>

								<div className="side-by-side">
									<a>Purchasing Policy</a>
									<a>Terms & Privacy</a>
								</div>
							</div>
						</div>
					</>
				) : (
					<div className="empty-state-div">
						<div className="empty-state-title">No items in backpack!</div>
						<img src={EmptyState} />
						<Link to="/marketplace">
							<button className="btn-mini">Explore Marketplace</button>
						</Link>
					</div>
				)}
			</div>
			<Footer/>
		</div>
	);
}
const mapStateToProps = (state) => ({
	user: state.auth.user,
	cartItems: state.cart.cartItems
});
const mapDispatchToProps = {
	removeItem,
	placeOrder
};
export default connect(mapStateToProps, mapDispatchToProps)(YourBackpack);