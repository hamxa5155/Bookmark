import React from 'react'
import '../Bloginfo/infodata.css'
import { useLocation } from 'react-router-dom'
import { API_URL_BACKEND2 } from "../../config";
import profile from '../../assets/profile.webp'
import facebook from '../../assets/Facebook.png'
import twit from '../../assets/twit.png'
import insta from '../../assets/Instagram.png'
import linkdin from '../../assets/Linkedin.png'
import parse from 'html-react-parser';

const Bloginfo = () => {

    const location = useLocation();

    console.log("Users", location.state.users);
    return (
        <>
            <div className='ifo_main'>
                <div className='info_data'>

                    <div className='data_picture'>
                        <img src={API_URL_BACKEND2 + "/uploads/" + location.state.users.image} alt="" srcset="" className='pic' />
                        <p><span>{location.state.users.home}</span><span>{location.state.users.blog}</span><span>{location.state.users.txt}</span></p>

                    </div>

                    <div className='divider'>
                        <div className='data'>
                            {parse(location.state.users.detail)}
                        </div>
                        <div className='info'>
                            <div>
                                <img src={profile} alt="" srcset="" />
                                <p>{location.state.users.created_by.firstName + location.state.users.created_by.lastName}</p>
                                <p>{location.state.users.created_by.intro}</p>
                            </div>
                            <div>
                                <a href=""><img src={facebook} alt="" srcset="" className="social" /></a>
                                <a href=""><img src={linkdin} alt="" srcset="" className="social" /></a>
                                <a href=""><img src={twit} alt="" srcset="" className="social1" /></a>
                                <a href=""><img src={insta} alt="" srcset="" className="social" /></a>
                            </div>

                        </div>

                    </div>





                </div>
            </div>
        </>
    )
}

export default Bloginfo