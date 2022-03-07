import React, { useState, useEffect } from 'react';

import '../pages/style.css';
import '../App.css';

import Footer from '../components/Footer.js';
import NavBar from '../components/NavBarTwo.js';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import BubbleIcon03 from '../assets/bubble-icon-03.svg';
import BackArrow from '../assets/back-arrow.svg';


import { connect } from "react-redux";
import { fetchProfile, editProfile } from "../store/profile/actions";
import useMediaQuery from "@mui/material/useMediaQuery";

function PaymentInfo(props) {
	const [textbookSelected, setTextbookSelected] = useState(false);
	const empty = false; // temp variable to switch between empty and non-empty states of this page
	const [state, setState] = useState({
		billingName: "",
		billingAddress: "",
	})
	const [btnLoading, setBtnLoading] = useState(false);
	const matches = useMediaQuery('(max-width: 750px)')
	const [spacerDiv, setSpacerDiv] = useState(true)

	useEffect(() => {
		const isLoggedIn = localStorage.getItem('isLoggedIn-bookmarkd')
		if (isLoggedIn === 'yes')
			setSpacerDiv(false)

	}, [])

	const handleUpdateBillingInfo = async (e) => {
		try {
			e.preventDefault();
			setBtnLoading(true);
			await props.editProfile({
				...props.profile,
				billing_name: state.billingName,
				billing_address: state.billingAddress,
			})
			Swal.fire("Billing information updated successfully!", "", "success")
		} catch (err) {
			Swal.fire("Something went wrong!", "", "error")
		} finally {
			setBtnLoading(false);
		}
	}
	useEffect(() => {
		if (props.profile?._id) {
			setState({
				...state,
				billingName: props.profile.billing_name,
				billingAddress: props.profile.billing_address,
			})
		}
	}, [props.profile])
	useEffect(()=>{
		props.fetchProfile();
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
						<Link to="/dashboard"><img src={BackArrow} className="backarrow" /></Link>
						<h2 className="dropshadow">My Dashboard</h2>
					</div>

					<div className="side-by-side dashboard-secondary-title">
						<h3>Payment Info</h3>
					</div>
				</div>

				<form
					className="my-dashboard__inner inner"
					onSubmit={handleUpdateBillingInfo}
				>
					<div className="dashboard-info-form-section">
						<div className="dashboard-info-form-title">Billing Info</div>
						<div className="dashboard-info-form-outer">
							<div className="dashboard-info-form">
								<tr>
									<td className="dashboard-info-form-label"><label>Name on card:</label></td>
									<td className="dashboard-info-form-input">
										<input
											placeholder="Enter billing name"
											type="text"
											className={matches && "w-100"}
											value={state.billingName}
											onChange={(e) => setState({ ...state, billingName: e.target.value })}
										/>
									</td>
								</tr>
								<tr>
									<td className="dashboard-info-form-label"><label>Address:</label></td>
									<td className="dashboard-info-form-input">
										<input
											type="text"
											className={matches && "w-100"}
											value={state.billingAddress}
											onChange={(e) => setState({ ...state, billingAddress: e.target.value })}
										/>
									</td>
								</tr>
							</div>
							<div className="flex-right">
								<button
									type="submit"
									disabled={btnLoading}
								>
									{btnLoading ? "..." : "Save changes"}
								</button>
							</div>
						</div>
					</div>
				</form>

				<form className="my-dashboard__inner inner">
					<div className="dashboard-info-form-section">
						<div className="dashboard-info-form-title">Cards on File</div>
						<div className="dashboard-info-form-outer">
							<div className="dashboard-info-form">
								<div className="side-by-side card-info-container">
									<div className="">
										<div>Mastercard *1234</div>
										<div className="empty-state-title">Exp. Date: 03/24</div>
									</div>
									<div className="card-info-input">
										<label className="empty-state-title">Use as primary <br />payment card</label>
										<input type="checkbox" className="" />
									</div>
								</div>
								<div className="side-by-side card-info-container">
									<div className="">
										<div>Mastercard *1234</div>
										<div>Exp. Date: 03/24</div>
									</div>
									<div className="card-info-input">
										<label className="empty-state-title">Use as primary <br />payment card</label>
										<input type="checkbox" className="" />
									</div>
								</div>
							</div>
							<div className="flex-right">
								<button type="submit">Save changes</button>
							</div>
						</div>
					</div>
				</form>

				<Footer />
			</div>
		</div>
	);
}
const mapStateToProps = (state) => ({
	user: state.auth.user,
	profile: state.profile.profile,
});
const mapDispatchToProps = {
	fetchProfile,
	editProfile
};
export default connect(mapStateToProps, mapDispatchToProps)(PaymentInfo);