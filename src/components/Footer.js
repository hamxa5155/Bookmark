import '../pages/style.css';
import '../App.css';
import {Row, Col} from 'react-bootstrap'

import LogoIcon from '../assets/bookmarkd_logo_03.svg';

import FacebookIcon from '../assets/facebook-icon.svg';
import InstagramIcon from '../assets/instagram-icon.svg';
import LinkedInIcon from '../assets/linkedin-icon.svg';


function Footer() {
  return (
    <footer>
        <Row className="footer">
            <Col xl={5} lg={5} md={5} className={"footer-col"}>
              <h2 className="footer-logo ">Book<span style={{color: '#0FC662'}}>Mark'd</span></h2>
            </Col>
            <Col xl={2} lg={2} md={2}>
              <h5>ABOUT</h5>
              <div>
                <a href="/about-us" className="none">About us</a>
              </div>
              <div>
                <a href="/the-team" className="none">Our Team</a>
              </div>
              <div>
                <a href="/partners" className="none">Partnerships</a>
              </div>
              <div>
                <a href="/Privacy" className="none">Privacy Policy</a>
              </div>
              <div>
                <a href="/Condition" className="none">Terms & Conditions</a>
              </div>
              
            </Col>
            <Col xl={2} lg={2} md={2}>
              <h5>COMMUNITY</h5>
              <div>
                <a href="/events" className="none">Events</a>
              </div>
              <div>
                <a href="/blog" className="none">Blog</a>
              </div>
              <div>
                <a href="" className="none">Forum</a>
              </div>
              <div>
                <a href="/invite-a-friend" className="none">Invite a Friend</a>
              </div>
            </Col>
            <Col xl={2} lg={2} md={2}>
              <h5>CONTACT</h5>

              <div>
                <a href="/careers" className="none">Careers</a>
              </div>

              <div>
                <a href="/Faq" className="none">FAQ</a>
              </div>

            </Col>
            <Col xl={1} lg={1} md={1}>
              <Row>
                <Col>
                  <img className="footer-icons" src={FacebookIcon}/>
                </Col>
              </Row>

              <Row>
                <Col>
                  <img className="footer-icons" src={InstagramIcon}/>
                </Col>
              </Row>

              <Row>
                <Col>
                  <img className="footer-icons" src={LinkedInIcon}/>
                </Col>
              </Row>

            </Col>


        </Row>
        {/*<div className="footer">*/}
        {/*    <h2 className="footer-logo">Book<span style={{color: '#0FC662'}}>Mark'd</span></h2>*/}
        {/*    <div className="footer-inner-container">*/}
        {/*        <div className="footer-links__container">*/}
        {/*            <h5>ABOUT</h5>*/}
        {/*            <div>*/}
        {/*                <a href="/the-team" className="none">Our Team</a>*/}
        {/*            </div>*/}
        {/*            <div>*/}
        {/*                <a href="/partners" className="none">Partnerships</a>*/}
        {/*            </div>*/}
        {/*            <div>*/}
        {/*                <a href="" className="none">Privacy Policy</a>*/}
        {/*            </div>*/}
        {/*            <div>*/}
        {/*                <a href="" className="none">Terms & Conditions</a>*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*        <div className="footer-links__container">*/}
        {/*            <h5>COMMUNITY</h5>*/}
        {/*            <div>*/}
        {/*                <a href="/events" className="none">Events</a>*/}
        {/*            </div>*/}
        {/*            <div>*/}
        {/*                <a href="/blog" className="none">Blog</a>*/}
        {/*            </div>*/}
        {/*            <div>*/}
        {/*                <a href="" className="none">Forum</a>*/}
        {/*            </div>*/}
        {/*            <div>*/}
        {/*                <a href="/invite-a-friend" className="none">Invite a Friend</a>*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*        <div className="footer-links__container">*/}
        {/*            <h5>CONTACT</h5>*/}
        {/*            <div>*/}
        {/*                <a href="/careers" className="none">Careers</a>*/}
        {/*            </div>*/}
        {/*            <div>*/}
        {/*                <a href="/faq" className="none">FAQ</a>*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*        <div className="footer-icons__container">*/}
        {/*            <img className="navbar-logo" src={FacebookIcon}/>*/}
        {/*            <br/>*/}
        {/*            <img className="navbar-logo" src={InstagramIcon}/>*/}
        {/*            <br/>*/}
        {/*            <img className="navbar-logo" src={LinkedInIcon}/>*/}
        {/*        </div>*/}
        {/*    </div>*/}

        {/*</div>*/}
    </footer>
  );
}

export default Footer;
