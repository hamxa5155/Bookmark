import React, { useState, Component, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';

import '../pages/style.css';
import '../App.css';

import Dropdown from '../components/Dropdown.js';

import LogoIcon from '../assets/bookmarkd_logo_03.svg';
import BellIcon from '../assets/bell-dot-icon.svg';
import BackpackIcon from '../assets/backpack-icon.svg';
import ProfileIcon from '../assets/person-circle-icon.svg';
import BookmarkIcon from '../assets/bookmark-icon.svg';

import MenuIcon from '@material-ui/icons/Menu';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

function NavBar() {
  const isHomePage = localStorage.getItem('isHomePage')
  const history = useHistory()

  return (
    <div className="navbar-body two oldNavbar">
      <div className="navbar two inner">
        <div className={"nav-two-mobile-margin"}>
          {/* <MenuIcon/> */}
          <Dropdown title={<MenuIcon/>}>
            <div className="drop-down__container navbar-dropdown">
              <div className="dropdown-header"></div>
              <div>
                {isHomePage === 'yes' ?
                    (<Link className="dark-link" onClick={() => document.getElementById('how-it-works').scrollIntoView({behavior: "smooth"})}>How it Works</Link>) :
                    (<Link className="dark-link" onClick={() => history.push('/main-home')}>How it Works</Link>)}
              </div>

              <div>
                {isHomePage === 'yes' ?
                    (<Link className="dark-link" onClick={() => document.getElementById('our-mission').scrollIntoView({behavior: "smooth"})}>Our Mission</Link>) :
                    (<Link className="dark-link" onClick={() => history.push('/main-home')}>Our Mission</Link>)}

              </div>
              <div>
                {isHomePage === 'yes' ?
                    (<Link className="dark-link" onClick={() => document.getElementById('contact-us').scrollIntoView({behavior: "smooth"})}>Contact Us</Link>) :
                    (<Link className="dark-link" onClick={() => history.push('/main-home')}>Contact Us</Link>)}

              </div>
              <div>
                <Link to='/marketplace'>Marketplace</Link>
              </div>
            </div>
          </Dropdown>

          <Link to="/main-home">
            <div>
              <img src={LogoIcon}/>
              <h3 className="navbar-title">Book<span style={{color: '#0FC662'}}>Mark'd</span></h3>
            </div>
          </Link>
        </div>

        <div>
          <Link to='/dashboard/bookmarks'>
            <img src={BookmarkIcon}/>
          </Link>
          <Link to='/your-backpack'>
            <img src={BackpackIcon}/>
          </Link>
          <Link to='/dashboard/notifs'>
            <img src={BellIcon}/>
          </Link>
          <Link to='/dashboard'>
            <img src={ProfileIcon}/>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
