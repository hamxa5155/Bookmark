import React, {useEffect, useState} from 'react';

import '../pages/style.css';
import '../App.css';

import NavBar from '../components/NavBar.js';
import Footer from '../components/Footer.js';

import TopBubble from '../assets/bubble-icon-04.svg';
import BottomBubble from '../assets/bubble-icon-05.svg';
import cx from "classnames";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Collapse from "@kunukn/react-collapse";
import {Grid} from "@material-ui/core";


function FAQ() {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);
    const [isOpen5, setIsOpen5] = useState(false);
    const [isOpen6, setIsOpen6] = useState(false);
    const [isOpen7, setIsOpen7] = useState(false);
    const [isOpen8, setIsOpen8] = useState(false);
    const [isOpen9, setIsOpen9] = useState(false);
    const [spacerDiv, setSpacerDiv] = useState(true)

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn-bookmarkd')
        if (isLoggedIn === 'yes')
            setSpacerDiv(false)

        localStorage.setItem('isHomePage', 'no')
    }, [])

    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="flex-end"
                alignItems="stretch"
            >
                <div className="info-page">
                    {spacerDiv && (<div className="spacer"/>)}
                    <img className="bubble-top-left" src={TopBubble}/>

                    <div className="inner">
                        <h2 className="dropshadow">Frequently Asked Questions</h2>

                        <div className="faq-questions">

                            <div className="faq-question-container" onClick={() => setIsOpen1(!isOpen1)}>
                                <div className="faq-question">What is BookMark’d?</div>
                                <div className="rotate90">
                                    <svg className={cx("faq-icon", { "faq-icon--expanded": isOpen1 })} viewBox="6 0 12 24">
                                        <polygon points="8 0 6 1.8 14.4 12 6 22.2 8 24 18 12" />
                                    </svg>
                                </div>
                            </div>
                            <Collapse isOpen={isOpen1} className="collapse"  aria-hidden={isOpen1 ? "false" : "true"}>
                                <div className="faq-answer">
                                    BookMark’d is a transactional marketplace where students can buy and sell their textbooks to other students. On our website, students can sell their new or used textbook at a price they set and have other students buy it on our website. We make the textbook buying process fast and easy!
                                </div>
                            </Collapse>

                            <div className="faq-question-container" onClick={() => setIsOpen2(!isOpen2)}>
                                <div className="faq-question">Why should I use BookMark’d?</div>
                                <div className="rotate90">
                                    <svg className={cx("faq-icon", { "faq-icon--expanded": isOpen2 })} viewBox="6 0 12 24">
                                        <polygon points="8 0 6 1.8 14.4 12 6 22.2 8 24 18 12" />
                                    </svg>
                                </div>
                            </div>
                            <Collapse isOpen={isOpen2} className="collapse">
                                <div className="faq-answer">
                                    Here are three excellent reasons why:

                                    You get your book FAST!

                                    BookMark’d is designed to where students can meet up with other students on their nearby campus to claim their textbook. The nearest student is never more than 15 minutes away. Once a transaction is made, it is up to the students to meet up and get their textbook. Kiss the long bookstore lines and subscription fees goodbye.

                                    You control the price you get back for your textbook!

                                    Have you ever sold a brand new or slightly used textbook back and barely got back the price you originally paid for it? Those days are over. On our website, students can set the price they want for the book they are selling. It’s a win-win for both parties. Students can buy a textbook at an affordable price, and a student can sell their textbook for a better price than what a textbook buyback price quoted their book for.

                                    Build a network to get ahead in your next class!

                                    Since all transactions are made between students, the buyer and seller can use that time to talk about what lies in the class ahead. We recommend that if the buyer wants to get the most out of their transaction, you ask the seller for tips on what to expect during exams, homework assignments, and projects that can come up during their course of study!
                                </div>
                            </Collapse>

                            <div className="faq-question-container" onClick={() => setIsOpen3(!isOpen3)}>
                                <div className="faq-question">Do I have to be a student to use BookMark’d?</div>
                                <div className="rotate90">
                                    <svg className={cx("faq-icon", { "faq-icon--expanded": isOpen3 })} viewBox="6 0 12 24">
                                        <polygon points="8 0 6 1.8 14.4 12 6 22.2 8 24 18 12" />
                                    </svg>
                                </div>
                            </div>
                            <Collapse isOpen={isOpen3} className="collapse">
                                <div className="faq-answer">
                                    Yes. During registration, you will be required to verify your edu email address through a security authorization. This is to ensure that all of our buyers and sellers are students.
                                </div>
                            </Collapse>

                            <div className="faq-question-container" onClick={() => setIsOpen4(!isOpen4)}>
                                <div className="faq-question">How do I pay for my book?</div>
                                <div className="rotate90">
                                    <svg className={cx("faq-icon", { "faq-icon--expanded": isOpen4 })} viewBox="6 0 12 24">
                                        <polygon points="8 0 6 1.8 14.4 12 6 22.2 8 24 18 12" />
                                    </svg>
                                </div>
                            </div>
                            <Collapse isOpen={isOpen4} className="collapse">
                                <div className="faq-answer">
                                    All payments are through the BookMark'd platform via Stripe. You simply use a debit or credit card to pay for your book.
                                </div>
                            </Collapse>

                            <div className="faq-question-container" onClick={() => setIsOpen5(!isOpen5)}>
                                <div className="faq-question">I have a textbook laying around that’s really old. Can I sell it on BookMark’d?</div>
                                <div className="rotate90">
                                    <svg className={cx("faq-icon", { "faq-icon--expanded": isOpen5 })} viewBox="6 0 12 24">
                                        <polygon points="8 0 6 1.8 14.4 12 6 22.2 8 24 18 12" />
                                    </svg>
                                </div>
                            </div>
                            <Collapse isOpen={isOpen5} className="collapse">
                                <div className="faq-answer">
                                    We recommend that sellers do not sell textbook editions older than four years due to the lack of demand that may come from an outdated book. However, sellers are able to post any textbook, no matter how old or used it may be.
                                </div>
                            </Collapse>

                            <div className="faq-question-container" onClick={() => setIsOpen6(!isOpen6)}>
                                <div className="faq-question">How do I get my book once I have purchased it?</div>
                                <div className="rotate90">
                                    <svg className={cx("faq-icon", { "faq-icon--expanded": isOpen6 })} viewBox="6 0 12 24">
                                        <polygon points="8 0 6 1.8 14.4 12 6 22.2 8 24 18 12" />
                                    </svg>
                                </div>
                            </div>
                            <Collapse isOpen={isOpen6} className="collapse">
                                <div className="faq-answer">
                                    We recommend that the buyer and sell meet on campus to facilitate the textbook swap. To ensure the safety of the students, we recommend the students meet during the daytime and in open public places such as a library, police department, on-campus restaurant, etc.
                                </div>
                            </Collapse>

                            <div className="faq-question-container" onClick={() => setIsOpen7(!isOpen7)}>
                                <div className="faq-question">I bought a book but the seller never showed up. How do I get my money back?</div>
                                <div className="rotate90">
                                    <svg className={cx("faq-icon", { "faq-icon--expanded": isOpen7 })} viewBox="6 0 12 24">
                                        <polygon points="8 0 6 1.8 14.4 12 6 22.2 8 24 18 12" />
                                    </svg>
                                </div>
                            </div>
                            <Collapse isOpen={isOpen7} className="collapse">
                                <div className="faq-answer">
                                    Both the seller and the buyer have to confirm the transaction once the meet up occurs. If the seller or the buyer doesn't show up, simply report the transaction to our team and explain the situation so a refund can be processed for you.
                                </div>
                            </Collapse>

                            <div className="faq-question-container" onClick={() => setIsOpen8(!isOpen8)}>
                                <div className="faq-question">Is BookMark’d available on my campus?</div>
                                <div className="rotate90">
                                    <svg className={cx("faq-icon", { "faq-icon--expanded": isOpen8 })} viewBox="6 0 12 24">
                                        <polygon points="8 0 6 1.8 14.4 12 6 22.2 8 24 18 12" />
                                    </svg>
                                </div>
                            </div>
                            <Collapse isOpen={isOpen8} className="collapse">
                                <div className="faq-answer">
                                    Both the seller and the buyer have to confirm the transaction once the meet up occurs. If the seller or the buyer doesn't show up, simply report the transaction to our team and explain the situation so a refund can be processed for you.
                                </div>
                            </Collapse>

                            <div className="faq-question-container" onClick={() => setIsOpen9(!isOpen9)}>
                                <div className="faq-question">Can I cancel or change my order once I’ve placed it?</div>
                                <div className="rotate90">
                                    <svg className={cx("faq-icon", { "faq-icon--expanded": isOpen9 })} viewBox="6 0 12 24">
                                        <polygon points="8 0 6 1.8 14.4 12 6 22.2 8 24 18 12" />
                                    </svg>
                                </div>
                            </div>
                            <Collapse isOpen={isOpen9} className="collapse">
                                <div className="faq-answer">
                                    You can cancel or change an orde anytime before you are scheduled to pick up your books with the seller. You have 48 hours to cancel your order after you have met up with the seller.
                                </div>
                            </Collapse>

                        </div>
                    </div>

                    <img className="bubble-bottom-right" src={BottomBubble}/>
                    <Footer/>
                </div>

            </Grid>
        </>

    );
}

export default FAQ;
