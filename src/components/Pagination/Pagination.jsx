import React, { useEffect, useState } from "react";
import Blogdata from "./Blogdata";
import ReactPaginate from "react-paginate";
import "../Pagination/pagination.css";
import { Link } from "react-router-dom";
const Pagination = () => {
  const [users, setUsers] = useState(Blogdata.slice(0, 1000));
  const [pageNumber, setPageNumber] = useState(0);

  const userPerPage = 6;
  const pagesVisited = pageNumber * userPerPage;

  const displayUsers = users
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
                <img src={users.imgsrc} alt="" srcset="" className="img" />
              </a>
            </div>
            <div className="blog_text">
              <span className="by">{users.dateby}</span>
              <span className="name">{users.name}</span>
              <span className="line">{users.line}</span>
              <span className="date">{users.date}</span>
            </div>
            <div className="blog_text">
              <p>{users.txt}</p>
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

export default Pagination;
