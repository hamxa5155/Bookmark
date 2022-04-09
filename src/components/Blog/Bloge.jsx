// import React, { useEffect, useState } from 'react';
// import "../Blog/blog.css";
// import blog1 from "../../assets/blog1.svg";
// import Pagination from 'react-responsive-pagination';
// import Blogdata from "./Blogdata";
// import {Button} from '@material-ui/core'
// import ReactPaginate from 'react-paginate';


// const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

// function Items({ Blogdata }) {
//   return (
//     <>
//       {Blogdata &&
//         Blogdata.map((item) => (
//           <div>
//             <h3>Item #{item}</h3>
//           </div>
//         ))}
//     </>
//   );
// }

// const Bloge = () => {
//   const [currentItems, setCurrentItems] = useState(null);
//   const [pageCount, setPageCount] = useState(0);
//   // Here we use item offsets; we could also use page offsets
//   // following the API or data you're working with.
//   const [itemOffset, setItemOffset] = useState(0);

//   useEffect(() => {
//     // Fetch items from another resources.
//     const endOffset = itemOffset + Blogdata;
//     console.log(`Loading items from ${itemOffset} to ${endOffset}`);
//     setCurrentItems(items.slice(itemOffset, endOffset));
//     setPageCount(Math.ceil(items.length / Blogdata));
//   }, [itemOffset, Blogdata]);

//   // Invoke when user click to request another page.
//   const handlePageClick = (event) => {
//     const newOffset = (event.selected * Blogdata) % items.length;
//     console.log(
//       `User requested page number ${event.selected}, which is offset ${newOffset}`
//     );
//     setItemOffset(newOffset);
//   };
  
// const [paginate, setPaginate] = React.useState(Blogdata)
// const [startpage, setstartpage] = React.useState(0);
// const [endpage, setendpage] = React.useState(6)

// React.useEffect(() => {
//   console.log(paginate)
// }, [])


//   return (
//     <>
   
//       <div className="blog">
//       <div className="blog_data">

     
      
//         <div className="blog_1" key={blog}>
//             <div className="img_div">
//               <a href="">
//                 {" "}
//                 <img src={blog.imgsrc} alt="" srcset="" className="img" />
//               </a>
//             </div>
//             <div className="blog_text">
//             <span className="by">{blog.dateby}</span>
//              <span className="name">{blog.name}</span>
//              <span className="line">{blog.line}</span>
//              <span className="date">{blog.date}</span>
//             </div>
//             <div className="blog_text">
// <p>{blog.txt}</p>
//             </div>
//           </div>
   
        
//       ))

    

//         </div>
       
//          <div className="blog_btn"> <Button className="pre_btn" disabled ={startpage === 0 ? true : false} onClick={() => {setstartpage(startpage - 1);  setendpage(endpage - 1) }}>Prev</Button>
//           <Button className="pre_btn" disabled={endpage >=paginate.length ? true : false} onClick={() => {setstartpage(startpage + 1); setendpage(endpage + 1) }} className="nxt_btn">Next</Button></div>
//       </div>


//       <Items currentItems={currentItems} />
//       <ReactPaginate
//         breakLabel="..."
//         nextLabel="next >"
//         onPageChange={handlePageClick}
//         pageRangeDisplayed={5}
//         pageCount={pageCount}
//         previousLabel="< previous"
//         renderOnZeroPageCount={null}
//       />
// {/*      
//     <Paginate />
//     <Paginate /> */}

//     </>
//   );
// };

// export default Bloge;



































// // function Paginate(){ 
// //   const [currentPage, setCurrentPage] = React.useState(4);
// //   let maxPages = 10;
// //   let items = [];
// //   let leftSide = currentPage - 2;
// //   if(leftSide <= 0 ) leftSide=1;
// //   let rightSide = currentPage + 2;
// //   if(rightSide>maxPages) rightSide = maxPages;
// //   for (let number = leftSide ; number <= rightSide; number++) {
// //     items.push(
// //       <div key={number} className={(number === currentPage ? 'round-effect active' : 'round-effect')} onClick={()=>{ setCurrentPage(number)}}>
// //         {number}
// //       </div>,
// //     );
// //   }
// // const nextPage = () => {
// //   if(currentPage<maxPages){
// //     setCurrentPage(currentPage+1)
// //   }
// // }

// // const prevPage = () => {
// //   if(currentPage>1){
// //     setCurrentPage(currentPage-1)
// //   }
// // }

// //   const paginationRender = (
// //     <div className="flex-container">
// //     <div> currentPage : { currentPage } </div>
      
// //       <div className="paginate-ctn">
// //         <div className="round-effect" onClick={prevPage}> &lsaquo; </div>
// //         {items}
// //         <div className="round-effect" onClick={nextPage}> &rsaquo; </div>
// //       </div>
// //     </div>
// //   );
// //   return (paginationRender);
// // }