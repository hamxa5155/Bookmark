import React from 'react'
import '../Bloginfo/infodata.css'
 import { useLocation } from 'react-router-dom'



const Bloginfo = () => {

    const location = useLocation();

    console.log("Users",location.state.users.date);
  return (
    <>
        <div className='ifo_main'>
    <div className='info_data'>
   
        <div className='data_picture'>
    <img src={location.state.users.imgsrc} alt="" srcset="" className='pic'/>
<p><span>{location.state.users.home}</span><span>{location.state.users.blog}</span><span>{location.state.users.txt}</span></p>

    </div>

    <div className='divider'>
    <div className='data'>
    <p>{location.state.users.para1}</p>
    <p className='bold_para'>{location.state.users.para2}</p>
    <p>{location.state.users.para3}</p>

    </div>
    <div className='info'>
    <div>
        <img src={location.state.users.infopic} alt="" srcset="" />
        <p>{location.state.users.inforname}</p>
        <p>{location.state.users.infodata}</p>
    </div>
<div>
    <a href=""><img src={location.state.users.facebook} alt="" srcset="" className="social"/></a>
    <a href=""><img src={location.state.users.linkdin} alt="" srcset="" className="social"/></a>
    <a href=""><img src={location.state.users.twit} alt="" srcset="" className="social1"/></a>
    <a href=""><img src={location.state.users.linkdin} alt="" srcset="" className="social"/></a>
</div>

    </div>

    </div>
   
      


  
    </div>
    </div>
    </>
  )
}

export default Bloginfo