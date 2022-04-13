import "../pages/style.css";
import "../App.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
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
import { connect } from "react-redux";
import { API_URL_BACKEND2 } from "../config";

function TheTeam(props) {
  const renderCustomThumbs = () => {
    const thumbList = props.allOurTeam.map((product, index) => (

      <div key={index} className="d-flex flex-column justify-center">
        <div className="thumb-img">
          <img src={API_URL_BACKEND2 + "/uploads/" + product.image} height="70" />
        </div>

        <div className="title-thumb">{product.name}</div>
        <div className="sub-thumb">{product.designation}</div>
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
    {
      src: three, title: "John Steiner",
      subti: "CEO"
    },
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
  console.log("all allOurTeam", props.allOurTeam)
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
              {props.allOurTeam.map((url, index) => {

                return (
                  <div
                    // key={index}
                    style={{ display: "flex", flexDirection: "row" }}
                  >


                    <div
                      style={{
                        width: "50%",
                        marginTop: '2%',
                        textAlign: "left",
                      }}
                    >

                      <div className="caro">"{url.name}</div>
                      <div className="carosub">{url.designation}</div>
                      <div className="carodetail">{url.detail}</div>
                    </div>
                    <img alt="" src={API_URL_BACKEND2 + "/uploads/" + url.image} width="50%" />

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

const mapStateToProps = (state) => ({
  allOurTeam: state.ourTeamReducer.allOurTeam
});
const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps)(TheTeam);
