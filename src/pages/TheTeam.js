import "../pages/style.css";
import "../App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import one from "../assets/A1.svg";
import two from "../assets/A2.svg";
import three from "../assets/A3.svg";
import four from "../assets/A4.svg";
import t1 from "../assets/A1.svg";
import t2 from "../assets/A2.svg";
import t3 from "../assets/A3.svg";
import t4 from "../assets/A4.svg";

import NavBar from "../components/NavBar.js";
import Footer from "../components/Footer.js";

import PlaceholderProfPic from "../assets/profile-picture-placeholder.png";
import TopBubble from "../assets/bubble-icon-04.svg";
import BottomBubble from "../assets/bubble-icon-05.svg";
import { Divider, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";

function TheTeam() {
  const renderCustomThumbs = () => {
    const thumbList = imgs.map((product, index) => (
      
      <div key={index} className="d-flex flex-column justify-center">
        {index}
        <div className="thumb-img">
          {" "}
          <img src={product.src} height="70"  />
        </div>

        <div className="title-thumb">{product.title}</div>
        <div className="sub-thumb">{product.subti}</div>
      </div>
    ));
    return thumbList;
  };

  const topData = [
    {
      src: one,
      title: "John Steiner",
      subti: "Founder | CEO",
      detail:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    },
    {
        src: two,
        title: "John Steiner",
        subti: "Founder | CEO",
        detail:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      },
      {
        src: three,
        title: "John Steiner",
        subti: "Founder | CEO",
        detail:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      },
      {
        src: four,
        title: "John Steiner",
        subti: "Founder | CEO",
        detail:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      },
  
  ];
  const imgs = [
    { src: three, title: "John Steiner", subti: "CEO" },
    {
      src: four,
      title: "John Steiner",
      subti: "CO-Founder",
    },
    {
      src: one,
      title: "John Steiner",
      subti: "CO-Founder",
    },
    {
      src: two,
      title: "John Steiner",
      subti: "CO-Founder",
    },
  
  ];

  const [spacerDiv, setSpacerDiv] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn-bookmarkd");
    if (isLoggedIn === "yes") setSpacerDiv(false);

    localStorage.setItem("isHomePage", "no");
  }, []);

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        alignItems="stretch"
      >
        <div className="info-page">
          {spacerDiv && <div className="spacer" />}
          <img className="bubble-top-left" src={TopBubble} alt="i2" />

          <div className="inner">
            <h2 className="dropshadow">Meet The Team</h2>
            <div className="info-page-subheader">
              BookMark’d wouldn’t be all it is without this amazing team. Here’s
              a little bit more about who they are and what they do:
            </div>

            {/* <div className="book-card__container-small">
                            <div className="team-card">
                                <div className="semibold">Role</div>
                                <img src={PlaceholderProfPic}/>
                                <div className="semibold">Name</div>
                                <div>Degree</div>
                                <div className="tiny-text">Short bio</div>
                            </div>

                            <div className="team-card">
                                <div className="semibold">Role</div>
                                <img src={PlaceholderProfPic}/>
                                <div className="semibold">Name</div>
                                <div>Degree</div>
                                <div className="tiny-text">Short bio</div>
                            </div>

                            <div className="team-card">
                                <div className="semibold">Role</div>
                                <img src={PlaceholderProfPic}/>
                                <div className="semibold">Name</div>
                                <div>Degree</div>
                                <div className="tiny-text">Short bio</div>
                            </div>
                        </div> */}

            <Carousel
              // autoPlay={true}
              // stopOnHover
              // swipeable
              // showStatus={false}
              // infiniteLoop
              // emulateTouch
              // onSwipeEnd={() => console.log("onSwipeEnd")}
              // onClickItem={(index) => {
              //   console.log("click item", index)
              //   alert(index)
              // }}
              // showArrows={true}
              showThumbs={true}
              renderThumbs={renderCustomThumbs}
            >
              {topData.map((url, index) => {
                 
                return (
                  <div
                    // key={index}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    {" "}
                    <div
                      style={{
                        width: "50%",
                        marginTop: '2%',
                        textAlign: "left",
                      }}
                    >
                      {" "}
                      <div className="caro">{url.title}</div>
                      <div className="carosub">{url.subti}</div>
                      <div className="carodetail">{url.detail}</div>
                    </div>
                    <img alt="" src={url.src} width="50%" />
                    
                  </div>
                );
              })}
            </Carousel>
          </div>

          <img className="bubble-bottom-right" src={BottomBubble} alt="i3" />
          <Footer />
        </div>
      </Grid>
    </>
  );
}

export default TheTeam;
