import React, { useState, Component, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';

import '../pages/style.css';
import '../App.css';

import LogoIcon from '../assets/bookmarkd_logo_03.svg';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
//redux
import { connect } from "react-redux";
import { fetchCart } from "../store/cart/actions"
import {Navbar, Nav} from "react-bootstrap";
import {Grid} from "@material-ui/core";
import useMediaQuery from "@mui/material/useMediaQuery";


function NavBar(props) {
  const [isHomePage, setIsHomePage] = useState('')
  const history = useHistory()
  const [toggleClicked, setToggleClicked] = useState(false)
  const matches = useMediaQuery('(max-width: 1200px)');

  useEffect(() => {
    setIsHomePage(localStorage.getItem('isHomePage'))
    console.log('isHomePage: ', isHomePage)
  }, [localStorage.getItem('isHomePage')])

  useEffect(() => {
    props.fetchCart();
  }, [])
  return (
      <Navbar
          collapseOnSelect
          expand="xl"
          bg="light"
          variant="light"
          fixed="top"
          className={"navbar-body"}
      >
        <Navbar.Brand href="/main-home">
          <div style={{display: 'inline-flex', marginTop: '5%'}}>
            <img src={LogoIcon} />
            <h3 className="navbar-title">Book<span style={{ color: '#0FC662' }}>Mark'd</span></h3>
          </div>
        </Navbar.Brand>

        <Nav.Item className={"xl-view"} style={{marginTop: '0.5%'}}>
          {isHomePage === 'yes' ? (
              <div>
                <Link className="dark-link" to="/main-home" onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: "smooth" })}>How it Works</Link>
                <FiberManualRecordIcon />
                <Link className="dark-link" onClick={() => document.getElementById('our-mission').scrollIntoView({ behavior: "smooth" })}>Our Mission</Link>
                <FiberManualRecordIcon />
                <Link className="dark-link" onClick={() => document.getElementById('contact-us').scrollIntoView({ behavior: "smooth" })}>Contact Us</Link>
                <FiberManualRecordIcon />
                <a className="dark-link" href='/marketplace'>Marketplace</a>
              </div>
          ) : (
              <div className={"xl-view"}>
                <Link className="dark-link" to="/main-home" onClick={() => history.push('/main-home')}>How it Works</Link>
                <FiberManualRecordIcon />
                <Link className="dark-link" onClick={() => history.push('/main-home')}>Our Mission</Link>
                <FiberManualRecordIcon />
                <Link className="dark-link" onClick={() => history.push('/main-home')}>Contact Us</Link>
                <FiberManualRecordIcon />
                <a className="dark-link" href='/marketplace'>Marketplace</a>
              </div>
          )}
        </Nav.Item>

        <Nav.Item className={"xl-view"} style={{marginTop: '0.5%'}}>
          <div>
            {props.user?._id ? (
                <div style={{display: 'inline-flex'}}>
                  <Link to="/dashboard"><button className="sign-up-button mini-btn-medium">Profile</button></Link>
                  <Link to="/your-backpack" style={{ padding: 0, marginTop: '14%' }}>
                    <div style={{ position: 'relative' }}>
                      {props.cartItems.length > 0 && (
                          <p style={{ position: "absolute", top: -15, right: -10 }}>{props.cartItems.length}</p>
                      )}
                      <img src="/static/media/backpack-icon.bddc524c.svg"/>
                    </div>
                  </Link>
                </div>
            ) : (
                <>
                  <Link to="/log-in"><button className="sign-up-button mini-btn-medium" onClick={() => props.setMode("signup")}>Sign Up</button></Link>
                  <Link to="/log-in"><button className="log-in-button mini-btn-medium" onClick={() => props.setMode("login")}>Log In</button></Link>
                </>
            )}
          </div>
        </Nav.Item>


        <Nav.Item>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setToggleClicked(!toggleClicked)}/>
          <Navbar.Collapse id="responsive-navbar-nav" className={"navCollapse"}>
            {toggleClicked && matches &&  (
                <Grid
                    container
                    direction="column"
                    justifyContent="space-around"
                    alignItems="center"
                    spacing={3}
                    style={{padding: '5% 0'}}
                >
                  <Grid item>
                    <Link className="dark-link" to="/main-home" onClick={() => history.push('/main-home')}>How it Works</Link>
                  </Grid>

                  <Grid item>
                    <Link className="dark-link" onClick={() => history.push('/main-home')}>Our Mission</Link>
                  </Grid>

                  <Grid item>
                    <Link className="dark-link" onClick={() => history.push('/main-home')}>Contact Us</Link>
                  </Grid>

                  <Grid item>
                    <a className="dark-link" href='/marketplace'>Marketplace</a>
                  </Grid>

                  {props.user?._id ? (
                      <>
                        <Grid item>
                          <Link to="/dashboard"><button className="sign-up-button mini-btn-medium">Profile</button></Link>
                        </Grid>

                        <Grid item>
                          <Link to="/your-backpack" style={{ padding: 0 }}>
                            <div style={{ position: "relative" }}>
                              {props.cartItems.length > 0 && (
                                  <p style={{ position: "absolute", top: -15, right: -10 }}>{props.cartItems.length}</p>
                              )}
                              <img src="/static/media/backpack-icon.bddc524c.svg"/>
                            </div>
                          </Link>
                        </Grid>


                      </>
                  ) : (
                      <>
                        <Grid item>
                          <Link to="/log-in"><button className="sign-up-button mini-btn-medium" onClick={() => props.setMode("signup")}>Sign Up</button></Link>
                        </Grid>

                        <Grid item>
                          <Link to="/log-in"><button className="log-in-button mini-btn-medium" onClick={() => props.setMode("login")}>Log In</button></Link>
                        </Grid>
                      </>
                  )}
                </Grid>
            )}
          </Navbar.Collapse>

        </Nav.Item>

      </Navbar>

    // <div className="navbar-body oldNavbar">
    //   <div className="navbar inner">
    //     <a href="/main-home">
    //       <div>
    //         <img className="navbar-logo" src={LogoIcon} />
    //         <h3 className="navbar-title">Book<span style={{ color: '#0FC662' }}>Mark'd</span></h3>
    //       </div>
    //     </a>
    //     {isHomePage === 'yes' ? (
    //         <div>
    //           <Link className="dark-link" to="/main-home" onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: "smooth" })}>How it Works</Link>
    //           <FiberManualRecordIcon />
    //           <Link className="dark-link" onClick={() => document.getElementById('our-mission').scrollIntoView({ behavior: "smooth" })}>Our Mission</Link>
    //           <FiberManualRecordIcon />
    //           <Link className="dark-link" onClick={() => document.getElementById('contact-us').scrollIntoView({ behavior: "smooth" })}>Contact Us</Link>
    //           <FiberManualRecordIcon />
    //           <a className="dark-link" href='/marketplace'>Marketplace</a>
    //         </div>
    //     ) : (
    //         <div>
    //           <Link className="dark-link" to="/main-home" onClick={() => history.push('/main-home')}>How it Works</Link>
    //           <FiberManualRecordIcon />
    //           <Link className="dark-link" onClick={() => history.push('/main-home')}>Our Mission</Link>
    //           <FiberManualRecordIcon />
    //           <Link className="dark-link" onClick={() => history.push('/main-home')}>Contact Us</Link>
    //           <FiberManualRecordIcon />
    //           <a className="dark-link" href='/marketplace'>Marketplace</a>
    //         </div>
    //     )}
    //
    //
    //     <div>
    //       {props.user?._id ? (
    //         <>
    //           <Link to="/dashboard"><button className="sign-up-button mini-btn-medium">Profile</button></Link>
    //           <Link to="/your-backpack" style={{ padding: 0 }}>
    //             <div style={{ position: "relative" }}>
    //               {props.cartItems.length > 0 && (
    //                 <p style={{ position: "absolute", top: -15, right: -10 }}>{props.cartItems.length}</p>
    //               )}
    //               <img src="/static/media/backpack-icon.bddc524c.svg"></img>
    //             </div>
    //           </Link>
    //         </>
    //       ) : (
    //         <>
    //           <Link to="/log-in"><button className="sign-up-button mini-btn-medium" onClick={() => props.setMode("signup")}>Sign Up</button></Link>
    //           <Link to="/log-in"><button className="log-in-button mini-btn-medium" onClick={() => props.setMode("login")}>Log In</button></Link>
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
}
const mapStateToProps = (state) => ({
  user: state.auth.user,
  cartItems: state.cart.cartItems
});
const mapDispatchToProps = {
  fetchCart
};
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);