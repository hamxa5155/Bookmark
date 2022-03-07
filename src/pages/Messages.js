import React, { useState, useEffect } from 'react';

import '../pages/style.css';
import '../App.css';

import Footer from '../components/Footer.js';
import NavBar from '../components/NavBarTwo.js';
import BookCard from '../components/BookCard.js';
import { Grid } from "@material-ui/core";


import BubbleIcon03 from '../assets/bubble-icon-03.svg';
import SendIcon from '@material-ui/icons/Send';
import AddIcon from '@material-ui/icons/Add';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import SearchIcon from '@material-ui/icons/Search';



import NoMessages from '../assets/no-messages-icon.svg';
import TextbookImage from '../assets/test-textbook-image.png';


import { connect } from "react-redux";
import { fetchLiveUsers, fetchChats, sendMessage } from "../store/supportChats/actions";
import Pagination from "react-js-pagination";
import socketIOClient from "socket.io-client";
import { BASE_URL, API_URL } from "../config/";
import Sound from 'react-sound';
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";

function Messages(props) {
	const matches = useMediaQuery('(max-width: 750px)');
	const socket = socketIOClient(BASE_URL);
	const [state, setState] = useState({
		activePage: 1,
		limit: 50,
		offset: 0,
		play: false
	});
	const [selectedUser, setSelectedUser] = useState({});
	const [message, setMessage] = React.useState("");

	const loadNewChats = async(id) =>{
		await props.fetchChats(id);
		scrollDownFunc();
	}
	useEffect(() => {
		const { limit, offset } = state;
		props.fetchLiveUsers(limit, offset);
		socket.on("admin_chats", () => {
			setState({ ...state, play: true });
			props.fetchLiveUsers(limit, offset);
			if (selectedUser?._doc?._id) {
				loadNewChats(selectedUser._doc._id)
			}
		});
	}, [selectedUser]);
	const handlePageChange = (pageNumber) => {
		console.log(`active page is ${pageNumber}`);
		const { limit } = state;
		let newOffset = ((pageNumber - 1) * limit);
		props.fetchLiveUsers(limit, newOffset);
		setState({ ...state, activePage: pageNumber, offset: newOffset });
	};
	const [x, setX] = useState(true);
	const [textbookSelected, setTextbookSelected] = useState(false);
	const [marked, setMarked] = useState(false);

	const soldCheckbox = ({ target: { checked } }) => {
		console.log(x, checked);
		setX(checked);
	};
	const scrollDownFunc = () =>{
		var element = document.getElementById("messages");
		if (element)
			element.scrollTop = element.scrollHeight - element.clientHeight;
	}
	useEffect(() => {
		scrollDownFunc();
	}, []);

	const getLastChat = (item) => {
		if (Array.isArray(item.chats)) {
			let message = item.chats[item.chats.length - 1]?.message
			if (message) {
				return `${message.substring(0, 20)}...`;
			}
		}
	}
	const handleMarkAsSeen = (item) => {
		axios
			.post(`${API_URL}chat/mark-as-seen`, { chatIds: JSON.stringify(item.chats.filter(c => c.sender === "user" && c.seen === false).map(d => d._id)) })
			.then(() => {
				const { limit, offset } = state;
				props.fetchLiveUsers(limit, offset);
			})
	}
	const handleOpenChat = async(item) => {
		setSelectedUser(item);
		handleMarkAsSeen(item);
		await props.fetchChats(item._doc._id);
		scrollDownFunc();
	}
	const handleSendMessage = async (e) => {
		e.preventDefault();
		const formData = {
			message,
			session_id: props.chats[0].chat_user_id.session_id,
			user_id: props.chats[0].chat_user_id.user_id,
			chat_user_id: props.chats[0].chat_user_id._id,
		};
		await props.sendMessage(formData);
		setMessage("");
		scrollDownFunc();
	};
	return (
		<div className="messages">
			{state.play && (
				<Sound
					url={"https://www.stockringtone.com/download/messages-ringtones/4108/Sms_Tone_Mp3_Ringtone"}
					playStatus={Sound.status.PLAYING}
					onFinishedPlaying={() => setState({ ...state, play: false })}
				/>
			)}
			<div className="spacer">{' '}</div>

			<div className="bubble-top-right">
				<img src={BubbleIcon03} />
			</div>

			<div className="messages-inner">
				<div className="inbox-column">

					<div className="search-bar__outer">
						<div className="search-bar__container">
							<input
								className="search-input"
								type="text"
								placeholder="Search messages with buyers"
							/>
							<SearchIcon className="search-icon" />
						</div>
					</div>

					<div>
						<h3>Inbox</h3>
						<div className="inbox-message-bar">
							<label className="switch inbox-switch">
								<input id='how-it-works__checkbox' type="checkbox" checked={x} onChange={soldCheckbox} />
								<span className="slider inbox-slider">
									<div className="inbox-slider-title"> With Sellers</div>
									<div className="inbox-slider-title"> With Buyers</div>
								</span>
							</label>
						</div>
						<hr className="message-slider-hr" />
					</div>
					{/* <img src={NoMessages} className="no-messages"/> */}
					<div className="inbox-previews">
						{props.users.map((row, i) => (
							<>
								<div className="profile-banner__container" onClick={() => handleOpenChat(row)}>
									<div className="profile-icon-medium" style={{ position: "relative" }}>
										{row.chats.length > 0 && (
											<span className="chat-count-admin">
												{row.chats.length}
											</span>
										)}
									</div>
									<div>
										<div className="profile-banner__name">Guest User</div>
										<div className="profile-banner__username">@guest</div>
										<div className="profile-banner__message">{getLastChat(row)}</div>
									</div>
								</div>
								<hr />
							</>
						))}
					</div>
					{props.userCount > 0 && (
						<Pagination
							activePage={state.activePage}
							itemsCountPerPage={state.limit}
							totalItemsCount={props.userCount}
							pageRangeDisplayed={5}
							onChange={(count) => handlePageChange(count)}
							itemClass="page-item"
							linkClass="page-link"
						/>
					)}
				</div>
				{Array.isArray(selectedUser.chats) ? (
					<div className="messages-column">
						<div className="recipient__container">
							<div className="recipient-label">To:</div>
							<div className="recipient-name"> @username060</div>
						</div>
						<div className="messages-container" id="messages">
							{props.chats.map((chat, i) => (
								<>
									{chat.sender === "user" ? (
										<>
											<div className="message-bubble__received">
												<div className="pointer"></div>
												<div className="message-bubble">{chat.message}</div>
											</div>
											{chat.image !== "N/A" && (
												<img src={`${BASE_URL}uploads/${chat.image}`} alt="" width="200" height="200" />
											)}
										</>
									) : (
										<div className="message-bubble__sent">
											<div className="message-bubble">{chat.message}</div>
											<div className="pointer"></div>
										</div>
									)}
								</>
							))}
						</div>
						<form onSubmit={handleSendMessage}>
							<div className="message-input__container">
								<AddIcon className="icon-inverted icon-small" />
								<div className="message-input">
									<input
										type="text"
										placeholder="Type your message here"
										value={message}
										onChange={(e) => setMessage(e.target.value)}
										required
									/>
									<button
										id="btn-chat"
										type="submit"
										style={{ padding: 0, background: "none", color: "#333", boxShadow: "none", height: 0, display: "flex", justifyContent: "flex-end", alignItems: "center" }}
									>
										<SendIcon />
									</button>
								</div>
							</div>
						</form>
					</div>
				) : (
					<div className="messages-column">
						<p>Select a user from the list to show chats!</p>
					</div>
				)}
				<div className="details-column">
					<div className="details-section-inner">
						<div className="details-title">Listing Details:</div>

						{!matches ? (
								<>
									<div className="quick-view details-quick-view">

										<div className="image-container quick-view__img">
											<img className="contain-img" src={TextbookImage} />
										</div>

										<div className="quick-view__content-wrapper">
											<div className="">
												<div className="book-title">Algorithms to Live By</div>
												<div className="book-subtitle">The Computer Science of Human Decisions</div>
											</div>
											<div className="listing-details-spacing">
												<div className="book-edition">1st Edition</div>
												<div className="book-author">Authors: Brian Christian, Tom Griffiths</div>
												<div className="book-isbn">ISBN: 2983520357035</div>
											</div>
											<div className="book-condition" style={{ width: "100%" }}>“Book is in good condition, used once. Great for any cognitive psychology classes.”</div>
											<div className="popup-last-element side-by-side">
												<div className="book-title">$50.00</div>
												<div className="location-marker">location</div>
											</div>
										</div>
									</div>
								</>
						) : (
								<>
								<Grid
										container
										direction="column"
										justifyContent="center"
										alignItems="center"
										className="quick-view details-quick-view"
								>
									<Grid item>
										<div className="image-container quick-view__img">
											<img className="contain-img" src={TextbookImage} />
										</div>
									</Grid>

									<Grid item>
										<div className="quick-view__content-wrapper">
											<div className="">
												<div className="book-title">Algorithms to Live By</div>
												<div className="book-subtitle">The Computer Science of Human Decisions</div>
											</div>
											<div className="listing-details-spacing">
												<div className="book-edition">1st Edition</div>
												<div className="book-author">Authors: Brian Christian, Tom Griffiths</div>
												<div className="book-isbn">ISBN: 2983520357035</div>
											</div>
											<div className="book-condition" style={{ width: "100%" }}>“Book is in good condition, used once. Great for any cognitive psychology classes.”</div>
											<div className="popup-last-element side-by-side">
												<div className="book-title">$50.00</div>
												<div className="location-marker">location</div>
											</div>
										</div>
									</Grid>
								</Grid>
								</>
						)}

						{/*<div className="quick-view details-quick-view">*/}

						{/*	<div className="image-container quick-view__img">*/}
						{/*		<img className="contain-img" src={TextbookImage} />*/}
						{/*	</div>*/}

						{/*	<div className="quick-view__content-wrapper">*/}
						{/*		<div className="">*/}
						{/*			<div className="book-title">Algorithms to Live By</div>*/}
						{/*			<div className="book-subtitle">The Computer Science of Human Decisions</div>*/}
						{/*		</div>*/}
						{/*		<div className="listing-details-spacing">*/}
						{/*			<div className="book-edition">1st Edition</div>*/}
						{/*			<div className="book-author">Authors: Brian Christian, Tom Griffiths</div>*/}
						{/*			<div className="book-isbn">ISBN: 2983520357035</div>*/}
						{/*		</div>*/}
						{/*		<div className="book-condition" style={{ width: "100%" }}>“Book is in good condition, used once. Great for any cognitive psychology classes.”</div>*/}
						{/*		<div className="popup-last-element side-by-side">*/}
						{/*			<div className="book-title">$50.00</div>*/}
						{/*			<div className="location-marker">location</div>*/}
						{/*		</div>*/}
						{/*	</div>*/}
						{/*</div>*/}




					</div>

					<div className="details-section-inner">
						<div className="details-title">Seller Details:</div>

						<div className="seller-details__container">
							<div className="profile-banner__container none">
								<div className="profile-icon-large">{' '}</div>
								<div>
									<a href="/profile/0" className="profile-banner__name none">Megan '22</a>
									<div className="profile-banner__username">@megan</div>
									<div className="profile-banner__school">University of Floria</div>
									<div className="profile-banner__major mini">Major: Psychology</div>
								</div>
							</div>
							<div className="seller-rating">
								<div className="mini">Seller Rating:</div>
								<div className="mini">
									<StarBorderIcon />
									<StarBorderIcon />
									<StarBorderIcon />
									<StarBorderIcon />
									<StarBorderIcon />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="footer messages-footer">{' '}</div>
		</div>
	);
}
const mapStateToProps = (state) => ({
	users: state.supportChats.users,
	userCount: state.supportChats.userCount,
	chats: state.supportChats.chats,
});
const mapDispatchToProps = {
	fetchLiveUsers,
	fetchChats,
	sendMessage
};
export default connect(mapStateToProps, mapDispatchToProps)(Messages);