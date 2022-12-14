import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  HashRouter,
} from "react-router-dom";

import { connect } from "react-redux";

import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar.js";
import NavBar2 from "./components/NavBarTwo.js";

import Home from "./pages/Home.js";
import LogIn from "./pages/LogIn.js";
import Marketplace from "./pages/Marketplace.js";
import YourBackpack from "./pages/YourBackpack.js";
import Checkout from "./pages/Checkout.js";
import Messages from "./pages/Messages.js";
import Profile from "./pages/Profile.js";
import Dashboard from "./pages/Dashboard.js";
import YourBookmarks from "./pages/YourBookmarks.js";
import YourFollowing from "./pages/YourFollowing.js";
import YourFollowers from "./pages/YourFollowers.jsx";
import Users from "./pages/Users.jsx";
import YourListings from "./pages/YourListings.js";
import NewListing from "./pages/NewListing.js";
import YourNotifs from "./pages/YourNotifs.js";
import YourOrders from "./pages/YourOrders.js";
import YourRatings from "./pages/YourRatings.js";
import YourRatingsSingle from "./pages/YourRatingsSingle.js";
import YourRecent from "./pages/YourRecent.js";
import PersonalInfo from "./pages/PersonalInfo.js";
import Security from "./pages/Security.js";
import PaymentInfo from "./pages/PaymentInfo.js";
import TheTeam from "./pages/TheTeam.js";
import Careers from "./pages/Careers.js";
import Partners from "./pages/Partners.js";
import Blog from "./pages/Blog.js";
import FAQ from "./pages/FAQ.js";
import Events from "./pages/Events.js";
import InviteAFriend from "./pages/InviteAFriend.js";
import NotFound from "./pages/NotFound.js";
import Footer from "./components/Footer.js";
import { BASE_URL } from "./config/";
import { MyChatWidget } from "./myChatWidget/myChatWidget";
import Sound from "react-sound";
import ChatBox from "./Admin/chatBox/ChatBox";
import SideBar from "./Admin/SideBar";
import socketIOClient from "socket.io-client";
import Adduser from "./Admin/adduser";
import SupportChat from "./Admin/supportChats/SupportChats";
import Aboutus from "./pages/Aboutus";
import Adminlogin from "./Admin/Adminlogin";
import About from "./Admin/about/About";
import Privacy from "./components/Privacy/Privacy";
import Faq from "./components/Faqe/Faq";
import Condition from "./components/Condition/Condition";
import Team from "./Admin/Team/Team";
import Pagination from "./components/Pagination/Pagination";
import Blogeditior from "../src/pages/newBlog/Blogeditior";
import Adminfaq from "./components/Adminfaq/Adminfaq";
import Forgetpassword from "./Admin/Team/Forgetpassword";
import Resetpaswword from "./Admin/Team/Resetpaswword";
import Contacttable from "./Admin/Contacttable";
import { fetchFaq } from "./store/faq/actions";
import { fetchAboutUs } from "./store/aboutUs/actions";
import { fetchOurTeam } from "./store/ourTeam/actions";
import { fetchBlog } from "./store/blog/actions";
import { fetchContactUs } from "./store/contactUs/actions";

const socket = socketIOClient(BASE_URL);

function App(props) {
  const [newMessage, setNewMessage] = useState("");
  const [play, setPlay] = useState(false);
  const [check, setcheck] = useState({
    loginToken: localStorage.getItem("adminToken")
      ? localStorage.getItem("adminToken")
      : null,
    isShow: true,
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [mode, setMode] = useState("home");
  useEffect(() => {
    if (!localStorage.getItem("USERID"))
      localStorage.setItem("USERID", "USER" + new Date().getTime());
    socket.emit("join", { userid: localStorage.getItem("USERID") });
    socket.on("chats", (data) => {
      console.log(data, "from admin");
      setPlay(true);
      setNewMessage(data);
    });
  }, [newMessage]);

  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem('isLoggedIn-bookmarkd')
  //   if (isLoggedIn === 'yes')
  //     setLoggedIn(true)
  //   else
  //     setLoggedIn(false)
  //
  // }, [localStorage.getItem('isLoggedIn-bookmarkd')])

  useEffect(() => {
    props.fetchFaq();
    props.fetchOurTeam();
    props.fetchAboutUs();
    props.fetchBlog();
    props.fetchContactUs();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {window.location.pathname === "/admin/admin-team" ||
        window.location.pathname === "/admin-login" ||
        window.location.pathname === "/admin/admin-faq" ||
        window.location.pathname === "/admin/blog-editor" ||
        window.location.pathname === "/admin/about-us" ||
        window.location.pathname === "/add-users" ||
        window.location.pathname === "/support-chats" ||
        window.location.pathname ===
          "/admin/admin-quieries" ? null : !loggedIn ? (
          <NavBar setMode={setMode} />
        ) : (
          <NavBar2 />
        )}

        <Switch>
          {/* clear */}
          <Route exact path="/main-home" render={(props) => <Home />} />

          {/* clear */}
          <Route exact path="/about-us" component={Aboutus} />
          <Route
            exact
            path="/log-in"
            render={(props) => (
              <LogIn mode={mode} setMode={setMode} setLoggedIn={setLoggedIn} />
            )}
          />
          {/* clear */}
          <Route
            exact
            path="/marketplace"
            render={(props) => <Marketplace {...props} />}
          />
          {/* clear */}
          <Route
            exact
            path="/your-backpack"
            render={(props) => <YourBackpack {...props} />}
          />
          {/* clear */}
          <Route
            exact
            path="/checkout"
            render={(props) => <Checkout {...props} />}
          />
          {/* clear somethings require responsiveness */}
          <Route
            exact
            path="/messages"
            render={(props) => <Messages {...props} />}
          />
          <Route
            exact
            path="/profile/:id"
            render={(props) => <Profile {...props} />}
          />
          {/* clear */}
          <Route
            exact
            path="/dashboard"
            render={(props) => <Dashboard {...props} />}
          />
          {/* clear */}
          <Route
            exact
            path="/dashboard/bookmarks"
            render={(props) => <YourBookmarks {...props} />}
          />
          {/* clear */}
          <Route
            exact
            path="/dashboard/following"
            render={(props) => <YourFollowing {...props} />}
          />
          <Route
            exact
            path="/dashboard/followers"
            render={(props) => <YourFollowers {...props} />}
          />
          <Route
            exact
            path="/dashboard/Users"
            render={(props) => <Users {...props} />}
          />
          {/* clear */}
          <Route
            exact
            path="/dashboard/listings"
            render={(props) => <YourListings {...props} />}
          />
          {/* clear */}
          <Route
            exact
            path="/dashboard/notifs"
            render={(props) => <YourNotifs {...props} />}
          />
          {/* clear */}
          <Route
            exact
            path="/dashboard/orders"
            render={(props) => <YourOrders {...props} />}
          />
          {/* clear */}
          <Route
            exact
            path="/dashboard/ratings/"
            render={(props) => <YourRatings {...props} />}
          />
          <Route
            exact
            path="/dashboard/ratings/:id"
            render={(props) => <YourRatingsSingle {...props} />}
          />
          <Route
            exact
            path="/dashboard/recently-viewed"
            render={(props) => <YourRecent {...props} />}
          />
          <Route
            exact
            path="/dashboard/personal-info"
            render={(props) => <PersonalInfo {...props} />}
          />
          <Route
            exact
            path="/dashboard/security"
            render={(props) => <Security {...props} />}
          />
          <Route
            exact
            path="/dashboard/payment-info"
            render={(props) => <PaymentInfo {...props} />}
          />
          <Route
            exact
            path="/the-team"
            render={(props) => <TheTeam {...props} />}
          />
          <Route
            exact
            path="/careers"
            render={(props) => <Careers {...props} />}
          />
          <Route
            exact
            path="/partners"
            render={(props) => <Partners {...props} />}
          />
          <Route exact path="/blog" render={(props) => <Blog {...props} />} />
          {/* clear */}
          <Route exact path="/faq" render={(props) => <FAQ {...props} />} />
          <Route
            exact
            path="/events"
            render={(props) => <Events {...props} />}
          />
          <Route exact path="/events" render={(props) => <Blog {...props} />} />
          <Route
            exact
            path="/invite-a-friend"
            render={(props) => <InviteAFriend {...props} />}
          />
          <Route
            exact
            path="/new-listing"
            render={(props) => <NewListing {...props} />}
          />
          <Route path="/privacy">
            <Privacy />
          </Route>
          <Route path="/condition">
            <Condition />
          </Route>
          {/* <Route path="/faq">
            <Faq />
          </Route> */}

          <Route path="/bloge">
            <Pagination />
          </Route>
          {/* <Route path="/editor">
            <Blogeditior />
          </Route> */}

          <Route path="/resetpasword/:token">
            <Resetpaswword />
          </Route>

          <Route path="/forgotpassword">
            <Forgetpassword />
          </Route>

          {/* <Route path="/bloginfo">
            <Bloginfo />
          </Route> */}

          <Route exact path="/">
            <Redirect to="/main-home" />
          </Route>

          <Route exact path="/admin-login" component={Adminlogin} />
          <SideBar>
            {/* <Route exact path="/admin/products" component={Products} />*/}
            {/* <Route path="/">
              <Team />
            </Route> */}

            <Route
              exact
              path="/add-users"
              render={(props) => <Adduser {...props} />}
            />
            <Route
              exact
              path="/support-chats"
              render={(props) => <SupportChat {...props} />}
            />
            <Route exact path="/chat-box/:id" component={ChatBox} />
            <Route exact path="/admin/about-us" component={About} />
            <Route exact path="/admin/admin-faq" component={Adminfaq} />
            <Route exact path="/admin/blog-editor" component={Blogeditior} />
            <Route exact path="/admin/admin-team" component={Team} />

            <Route
              exact
              path="/admin/admin-quieries"
              component={Contacttable}
            />
          </SideBar>

          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>

      {/* <NavBar/>
        <div className="spacer">&nspb;</div>
        <Home/> */}
      {/* <Footer/> */}
      <MyChatWidget newMessage={newMessage} />
      <Sound
        url={
          "https://www.stockringtone.com/download/messages-ringtones/4108/Sms_Tone_Mp3_Ringtone"
        }
        playStatus={play ? Sound.status.PLAYING : Sound.status.STOPPED}
        onFinishedPlaying={() => setPlay(false)}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  // user: state.auth.user,
  // books: state.books.allBooks
});
const mapDispatchToProps = {
  fetchFaq,
  fetchOurTeam,
  fetchAboutUs,
  fetchBlog,
  fetchContactUs,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
