import React, { useEffect, useState } from "react";
import Blogdata from "./Blogdata";
import ReactPaginate from "react-paginate";
import "../Pagination/pagination.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { API_URL_BACKEND2 } from "../../config";
// import { createAboutUs, fetchAboutUs } from "../store/aboutUs/actions";

const Pagination = (props) => {
  const [users, setUsers] = useState(Blogdata.slice(0, 1000));
  const [pageNumber, setPageNumber] = useState(0);
  function returnDate(date) {
    let commingDate = new Date(date);
    let commingMonth = commingDate.getMonth();
    let months = [
      "Jun",
      "Feb",
      "March",
      "April",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return ` ${months[commingMonth]} ${commingDate.getDate()} 
          ${commingDate.getFullYear()}`;
  }

  const userPerPage = 6;
  const pagesVisited = pageNumber * userPerPage;
  const displayUsers = props.allBlogs
    .slice(pagesVisited, pagesVisited + userPerPage)
    .map((users, index) => {
      return (
        <Link
          to={{
            pathname: "/bloginfo",
            state: {
              users,
            },
          }}
          key={index}
          className="blog_data1" >
          <div className="blog_1">
            <div className="img_div">
              <a href="">
                <img src={API_URL_BACKEND2 + "/uploads/" + users.image} alt="" srcset="" className="img" />
              </a>
            </div>
            <div className="blog_text">
              <span className="by">{"by"}</span>
              <span className="name">{users.created_by.firstName + "" + users.created_by.lastName}</span>
              <span className="line">{"-"}</span>
              <span className="date">{returnDate(users.createdAt)}</span>
            </div>
            <div className="blog_text">
              <p>{users.title}</p>
            </div>
          </div>
        </Link>
      );
    });

  const pageCount = Math.ceil(users.length / userPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <>
      <div className="blog">
        <div className="blog_data">{displayUsers}</div>
      </div>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousbttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </>
  );
};


const mapStateToProps = (state) => ({
  allBlogs: state.blogReducer.allBlogs,
});
const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
