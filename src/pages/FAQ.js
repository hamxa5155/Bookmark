import React, { useEffect, useState } from "react";

import "../pages/style.css";
import "../App.css";

import NavBar from "../components/NavBar.js";
import Footer from "../components/Footer.js";

import TopBubble from "../assets/bubble-icon-04.svg";
import BottomBubble from "../assets/bubble-icon-05.svg";
import cx from "classnames";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Collapse from "@kunukn/react-collapse";
import { Grid } from "@material-ui/core";
import { Accordion } from "react-bootstrap";
import "../components/Faqe/faq.css";

import { connect } from "react-redux";

function FAQ(props) {
  // const [isOpen1, setIsOpen1] = useState(false);
  // const [isOpen2, setIsOpen2] = useState(false);
  // const [isOpen3, setIsOpen3] = useState(false);
  // const [isOpen4, setIsOpen4] = useState(false);
  // const [isOpen5, setIsOpen5] = useState(false);
  // const [isOpen6, setIsOpen6] = useState(false);
  // const [isOpen7, setIsOpen7] = useState(false);
  // const [isOpen8, setIsOpen8] = useState(false);
  // const [isOpen9, setIsOpen9] = useState(false);
  // const [spacerDiv, setSpacerDiv] = useState(true)

  // useEffect(() => {
  //     const isLoggedIn = localStorage.getItem('isLoggedIn-bookmarkd')
  //     if (isLoggedIn === 'yes')
  //         setSpacerDiv(false)

  //     localStorage.setItem('isHomePage', 'no')
  // }, [])

  return (
    <>
      <div className="accordian_div">
        <Accordion defaultActiveKey={["0"]}>
          {props?.allfaq?.map((data, index) => {
            return (
              <Accordion.Item eventKey={index}>
                <Accordion.Header>{data?.question}</Accordion.Header>
                <Accordion.Body>{data?.anwser}</Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  allfaq: state.faqReducer.allfaq,
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(FAQ);
