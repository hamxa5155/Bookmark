import React, { useState, useEffect } from 'react';

import '../pages/style.css';
import '../App.css';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.js';
import NavBar from '../components/NavBarTwo.js';
import Swal from "sweetalert2"
import BubbleIcon03 from '../assets/bubble-icon-03.svg';
import BackArrow from '../assets/back-arrow.svg';

import { connect } from "react-redux";
import {changePassword, fetchProfile} from "../store/profile/actions";
import useMediaQuery from "@mui/material/useMediaQuery";
function Security(props) {
  const [textbookSelected, setTextbookSelected] = useState(false);
  const empty = false; // temp variable to switch between empty and non-empty states of this page
  const [state, setState] = useState({
      newPassword: "",
      confirmPassword: ""
  })
  const [btnLoading, setBtnLoading] = useState(false);
  const matches = useMediaQuery('(max-width: 750px)')
  const [spacerDiv, setSpacerDiv] = useState(true)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn-bookmarkd')
    if (isLoggedIn === 'yes')
      setSpacerDiv(false)

  }, [])

  const handleChangePassword = async(e) =>{
    try{
        e.preventDefault();
        setBtnLoading(true);
        if(state.newPassword !== state.confirmPassword){
            Swal.fire("Confirm password not matched with the new password", "", "warning")
        }else{
            await props.changePassword({newPassword: state.newPassword});
            setState({
                ...state,
                newPassword: "",
                confirmPassword: ""
            })
            Swal.fire("Password changed successfully", "", "success")
        }
    }catch(err){

    }finally{
        setBtnLoading(false);
    }
  }
  useEffect(()=>{
    props.fetchProfile();
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
                    <Link to="/dashboard"><img src={BackArrow} className="backarrow"/></Link>
                    <h2 className="dropshadow">My Dashboard</h2>
                </div>

                <div className="side-by-side dashboard-secondary-title">
                    <h3>Security</h3>
                </div>         
            </div>

            <form 
                className="my-dashboard__inner inner"
                onSubmit={handleChangePassword}
            >
                <div className="dashboard-info-form-section">
                    <div className="dashboard-info-form-title">Account Password</div>
                    <div className="dashboard-info-form-outer">
                        <div className="dashboard-info-form">
                            <tr>
                                <td className="dashboard-info-form-label"><label>Username</label></td>
                                <td className="dashboard-info-form-input">
                                    <input
                                        value={props.profile?.email}
                                        type="text"
                                        className={matches && "w-100"}
                                        disabled/>
                                </td>
                            </tr>
                            <tr>
                                <td className="dashboard-info-form-label"><label>New password:</label></td>
                                <td className="dashboard-info-form-input">
                                    <input 
                                        type="password"
                                        className={matches && "w-100"}
                                        value={state.newPassword}
                                        onChange={(e)=>setState({...state, newPassword: e.target.value})}
                                        required
                                    />
                                </td>
                            </tr>  
                            <tr className={"confirm-password-margin"}>
                                <td className="dashboard-info-form-label"><label>Confirm new password:</label></td>
                                <td className="dashboard-info-form-input">
                                    <input 
                                        type="password"
                                        className={matches && "w-100"}
                                        value={state.confirmPassword}
                                        onChange={(e)=>setState({...state, confirmPassword: e.target.value})}
                                        required
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
                          <div className="display-info-label">Please de-select any information you do not want displayed publicly on your profile.</div>
                            <div className="display-info-container">
                                <div className="card-info-input">
                                    <label className="empty-state-title">Profile picture</label>
                                    <input type="checkbox" className=""/>
                                </div>
                                <div className="card-info-input">
                                    <label className="empty-state-title">Major</label>
                                    <input type="checkbox" className=""/>
                                </div>
                                <div className="card-info-input">
                                    <label className="empty-state-title">Last name</label>
                                    <input type="checkbox" className=""/>
                                </div>
                                <div className="card-info-input">
                                    <label className="empty-state-title">Location</label>
                                    <input type="checkbox" className=""/>
                                </div>
                                <div className="card-info-input">
                                    <label className="empty-state-title">Graduation year</label>
                                    <input type="checkbox" className=""/>
                                </div>
                                <div className="card-info-input">
                                    <label className="empty-state-title">Interests</label>
                                    <input type="checkbox" className=""/>
                                </div>
                                <div className="card-info-input">
                                    <label className="empty-state-title">University</label>
                                    <input type="checkbox" className=""/>
                                </div>
                            </div>
                        </div>
                        <div className="flex-right">
                            <button type="submit">Save changes</button>
                        </div>
                    </div>
                </div>
            </form>
            <Footer/>
        </div>      
        </div>
  );
}
const mapStateToProps = (state) => ({
	user: state.auth.user,
	profile: state.profile.profile,
});
const mapDispatchToProps = {
	changePassword,
    fetchProfile
};
export default connect(mapStateToProps, mapDispatchToProps)(Security);