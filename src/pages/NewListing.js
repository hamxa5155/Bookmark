import React, { useState, useEffect } from 'react';

import '../pages/style.css';

import Footer from '../components/Footer.js';
import Popup from '../components/Popup.js';

import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BackArrow from '../assets/back-arrow.svg';
import Swal from "sweetalert2";

import AddImage from '../assets/add-image.svg';
import BubbleIcon03 from '../assets/bubble-icon-03.svg';
import TextbookImage from '../assets/test-textbook-image.png';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { API_URL_BACKEND } from '../config';

//redux
import { connect } from "react-redux";
import {createBook} from "../store/books/actions";

function NewListing(props) {
    const history = useHistory();
    const [selectedItem, setSelectedItem] = useState("orders");
    const [state, setState] = useState({
        selectBook: null,
        searchIsbn: '',
        msgObj: null,
        isbnSearchComplete: false,
        imageURI: null,
        price: null,
        condition: null,
        location: "",
        notes: "",
        title: "",
        subTitle: ""
    })
    const [btnLoading, setBtnLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [spacerDiv, setSpacerDiv] = useState(true)

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn-bookmarkd')
        if (isLoggedIn === 'yes')
            setSpacerDiv(false)

    }, [])

    const toggleSelectionBar = (target) => {
        document.getElementById("current").classList.remove("dashboard-selection-item__selected");
        document.getElementById("past").classList.remove("dashboard-selection-item__selected");

        document.getElementById(target).classList.add("dashboard-selection-item__selected");
        setSelectedItem(target);
    };

    const handleIsbnSearch = (e) => {
        e.preventDefault();
        axios.get(`https://api2.isbndb.com/book/${state.searchIsbn}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': '46443_b1a597ccea6bcc63cb39c6393f3f11c5'
            }
        }).then((res) => {
            setImage(null);
            setState({
                ...state,
                selectBook: res.data.book,
                price: res.data.book.msrp,
                imageURI: res.data.book.image,
                msgObj: null,
                title: res.data.book.title,
                subTitle: res.data.book.title_long
            });
        }).catch((err) => {
            setState({
                ...state,
                selectBook: null,
                msgObj: {
                    class: 'error',
                    msg: 'No book with specified ISBN was found'
                }
            });
        });
    }
    const handleInput = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }
    const getImage = (e) => {
        const reader = new FileReader();
        const imageFile = e.target.files[0];
        setImage(e.target.files[0]);
        if (imageFile) {
            reader.readAsDataURL(imageFile);
        }
        reader.addEventListener('load', () => {
            setState({ ...state, imageURI: reader.result });
        });
    }
    const handleSell = async (e) => {
        try {
            e.preventDefault();
            setBtnLoading(true);
            let formData = new FormData();
            formData.append("isbn", state.selectBook.isbn);
            formData.append("location", state.location);
            formData.append("title", state.title);
            formData.append("subTitle", state.subTitle);
            formData.append("authors", state.selectBook.authors);
            formData.append("notes", state.notes);
            formData.append("publisher", state.selectBook.publisher);
            formData.append("price", state.price);

            if (image) {
                formData.append("image", image);
            } else {
                formData.append("image", state.imageURI);
            }
            const res = await props.createBook(formData);
            Swal.fire("Product was successfully uploaded", "", "success").then(()=>{
                history.push("/dashboard/listings");
            })
        } catch (err) {
            Swal.fire("Product was unable to be uploaded", "", "error")
        }finally{
            setBtnLoading(false);
        }
    }
    useEffect(() => {
        if (!props.user?._id) {
            history.push("/log-in")
        }
    }, [props.user])
    return (
        <div className="profile" style={{paddingTop:"108px"}}>

            <div className="profile-inner">
                {spacerDiv && (<div className="spacer"/>)}

                <div className="bubble-top-right">
                    <img src={BubbleIcon03} />
                </div>

                <div className="my-dashboard__inner inner">
                    <div className="inline">
                        <Link to="/dashboard"><img src={BackArrow} className="backarrow" /></Link>
                        <h2 className="dropshadow">My Dashboard</h2>
                    </div>

                    <div className="side-by-side dashboard-secondary-title" style={{cursor:"pointer"}}>
                        <h3>New Listings</h3>

                    </div>

                    <div className="side-by-side dashboard-selection-bar"></div>

                    <form
                        className="add-listing__container add_new_listing"
                        id="add-listing"
                        onSubmit={handleSell}
                    >
                        <div className="add-listing-col-one">
                            <label for="img">
                                <img src={state.imageURI === null ? AddImage : state.imageURI} />
                            </label>
                            <input
                                className="listing-img-input"
                                type="file"
                                id="img"
                                name="img"
                                accept="image/*"
                                onChange={getImage}
                            ></input>
                            <div className="add-listing-form">
                                <label>Your location (city, state)*</label>
                                <input
                                    type="text"
                                    value={state.location}
                                    onChange={handleInput}
                                    name="location"
                                />
                            </div>
                        </div>

                        <table className="add-listing-col-two">
                            <tr className="add-listing-form">
                                <td className="add-listing-label add-listing-mobile"><label>ISBN:*</label></td>
                                <td className="add-listing-input">
                                    <input
                                        type="text"
                                        name='searchIsbn'
                                        value={state.searchIsbn}
                                        onChange={handleInput}
                                        placeholder='ISBN'
                                        required
                                        onBlur={handleIsbnSearch}
                                    />
                                </td>
                            </tr>
                            {state.selectBook && (
                                <>
                                    <tr className="add-listing-form">
                                        <td className="add-listing-label"><label>Book title:*</label></td>
                                        <td className="add-listing-input">
                                            <input
                                                type="text"
                                                value={state.title}
                                                name="title"
                                                onChange={handleInput}
                                            />
                                        </td>
                                    </tr>
                                    <tr className="add-listing-form">
                                        <td className="add-listing-label"><label>Subtitle:*</label></td>
                                        <td className="add-listing-input">
                                            <input
                                                type="text"
                                                value={state.subTitle}
                                                name="subTitle"
                                                onChange={handleInput}
                                            />
                                        </td>
                                    </tr>
                                    <tr className="add-listing-form">
                                        <td className="add-listing-label"><label>Author:*</label></td>
                                        <td className="add-listing-input">
                                            <input type="text" value={state.selectBook.authors[0]} disabled />
                                        </td>
                                    </tr>
                                    <tr className="add-listing-form">
                                        <td className="add-listing-label"><label>Notes:</label></td>
                                        <td className="add-listing-input">
                                            <input
                                                type="text"
                                                name="notes"
                                                value={state.notes}
                                                onChange={handleInput}
                                            />
                                        </td>
                                    </tr>
                                    <tr className="add-listing-form">
                                        <td className="add-listing-label"><label>Publisher:*</label></td>
                                        <td className="add-listing-input">
                                            <input type="text" value={state.selectBook.publisher} disabled />
                                        </td>
                                    </tr>
                                    <tr className="add-listing-form">
                                        <td className="add-listing-label"><label>Price:*</label></td>
                                        <td className="add-listing-input">$
                                            <input
                                                type="number"
                                                placeholder="BookMark’d only charges 10% of every transaction."
                                                value={state.price}
                                                onChange={handleInput}
                                                name="price"
                                            />
                                        </td>
                                    </tr>
                                </>
                            )}
                        </table>
                        <div className="flex-right">
                            {state.selectBook !== null && (
                                <button 
                                    type="submit" 
                                    form="add-listing"
                                    disabled={btnLoading}
                                >
                                    {btnLoading ? "..." : "Publish listing"}
                                </button>
                            )}
                        </div>
                    </form>

                </div>
                <Footer />

            </div>
        </div>
    );
}
const mapStateToProps = (state) => ({
    user: state.auth.user
});
const mapDispatchToProps = {
    createBook
};
export default connect(mapStateToProps, mapDispatchToProps)(NewListing);