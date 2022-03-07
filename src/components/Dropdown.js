import React, { useState } from 'react';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import onClickOutside from 'react-onclickoutside';


function Dropdown(props) {
    const [isOpen, setIsOpen] = useState(false);
    
    // Dropdown.handleClickOutside = () => {
    //     setIsOpen(false);
    // }

    return (
        <div>
            <div className="expand-wrapper" onClick={() => setIsOpen(!isOpen)}>
                {props.title}
            </div>
            <br/>
            {isOpen ? <div>{props.children}</div> : null}
        </div>
    )
};

// const clickOutsideConfig = {
//     handleClickOutside: () => Dropdown.handleClickOutside,
//   };
  
export default Dropdown;
// export default onClickOutside(Dropdown, clickOutsideConfig);