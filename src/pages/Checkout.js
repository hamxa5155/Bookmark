import React, {useEffect, useState} from 'react';

import '../pages/style.css';
import '../App.css';

import NavBar from '../components/NavBarTwo.js';

import BubbleIcon03 from '../assets/bubble-icon-03.svg';
import BackArrow from '../assets/back-arrow.svg';



function Checkout() {
  const [textbookSelected, setTextbookSelected] = useState(false);
  const [marked, setMarked] = useState(false);
  const [spacerDiv, setSpacerDiv] = useState(true)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn-bookmarkd')
    if (isLoggedIn === 'yes')
      setSpacerDiv(true)

  }, [])


  return (
    <div className="your-backpack">

      {spacerDiv && (<div className="spacer"/>)}

        <div className="bubble-top-right">
            <img src={BubbleIcon03}/>
        </div>
        
        <div className="marketplace__inner inner">
            <div className="inline">
                <a href="/your-backpack"><img src={BackArrow} className="backarrow"/></a>
                <h2 className="dropshadow">Checkout</h2>
            </div>

            <div className="backpack-item">
                <div className="flex-right" style={{fontSize:"2rem"}}>
                    <div style={{paddingRight:"4rem"}}>Total:</div>
                    <div>$85.99</div>
                </div>
                <hr/>

                <div>Add checkout form with stripe</div>
            </div>
            
        </div>
    </div>
  );
}

export default Checkout;
