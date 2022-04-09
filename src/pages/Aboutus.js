import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import About1 from "../assets/A1.svg";
import About2 from "../assets/A2.svg";
import About3 from "../assets/A3.svg";
import About4 from "../assets/A4.svg";
import "../pages/style.css"
import Footer from '../components/Footer';
import { connect } from "react-redux";
import { API_URL_BACKEND2 } from "../config";

const Aboutus = (props) => {
  const [aboutData, setAboutData] = React.useState([]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    setAboutData([
      {
        title: "How Our Tech Supports Your Growth",
        details:
          "BookMark'd is a wide-ranging software solution for your most pressing investing needs. Whether you need a high-quality market research suite, a powerful investment model, or want more support for tracking the status and due dates of your potential investments, Luci can help. We’ve also developed other features that make Luci so beneficial to real estate investors. These include the ability to create teams and assign tasks to manage your business, a real-time calendar app that keeps track of your tasks, an off-market property locator, and deal listing services. Best of all, you can access Luci’s solutions anywhere you are in the US. ",
        image: About1,
        right: true,
      },
      {
        title:
          "We’re On A Mission to Provide Affordable & Powerful Tech for Real Estate Investors",
        details:
          "We have an itch to transform the way real estate investors grow their profits. Our mission is to turn software into profits for the investors we serve. By making good on our promises, we hope to create and maintain incredible relationships with our clients. ",
        image: About2,
        right: false,
      },
      {
        title:
          "We Provide Killer Software Solutions At Affordable Rates So You Can Leverage Every Investment",
        details:
          "When you work with us, we promise that our services will remain available at affordable rates so you can have access to the world’s top-tier data that only institutional investors can use. We also promise to be upfront with you about all of our business dealings, enabling you to put confidently put full trust in the integrity of Luci Technologies. Finally, we promise to continue innovating and to bring the absolute best software solutions to investors like you. ",
        image: About3,
        right: true,
      },
      {
        title: "Why Our Customers Choose Us…",
        details:
          "Our solutions are designed and built to support real estate investors because we’re real estate investors who care about the industry. By creating an ecosystem of tools that support your business, we help clients like you tackle almost every task in a single location all for an affordable price point. ",
        image: About4,
        right: false,
      },
    ]);
  }, []);
  console.log("smkdkl", props.allAboutUs[0].image)
  return (
    <div>
      <Container style={{ paddingTop: "7rem" }}>
        <div className="aboutBoxContainer about-container">
          {props.allAboutUs.map((about, id) => (
            <div key={id} className="aboutContainer">
              {(id === 0 || id === 2) ? (
                <Row>
                  <Col lg={6} sm={6} xs={12}>
                    <div className="aboutImage">
                      <img src={API_URL_BACKEND2 + "/uploads/" + about.image} alt={`about-${id}`} />
                    </div>
                  </Col>
                  <Col lg={6} sm={6} xs={12}>
                    <div className="details">
                      <h4>{about.heading}</h4>
                      <p>{about.detail}</p>
                    </div>
                  </Col>
                </Row>
              ) : about.image ? (
                <Row>
                  <Col lg={6} sm={6} xs={12}>
                    <div className="details">
                      <h4>{about.heading}</h4>
                      <p>{about.detail}</p>
                    </div>
                  </Col>
                  <Col lg={6} sm={6} xs={12}>
                    <div className="aboutImage">
                      <img src={API_URL_BACKEND2 + "/uploads/" + about.image} alt={`about-${id}`} />
                    </div>
                  </Col>
                </Row>
              ) : (
                    <Row>
                      <Col lg={12} sm={12} xs={12}>
                        <div className="details">
                          <h4>{about.heading}</h4>
                          <p>{about.detail}</p>
                        </div>
                      </Col>
                    </Row>
                  )}
            </div>
          ))}
        </div>
      </Container>
      <div className={"footer-position"}>
        <Footer />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  allAboutUs: state.aboutUsReducer.allAboutUs,

});
const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(Aboutus);