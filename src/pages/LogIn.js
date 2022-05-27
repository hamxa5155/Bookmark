import React, { useState, Component, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "../pages/style.css";
import "../App.css";
import Footer from "../components/Footer.js";
import GraduationImage from "../assets/welcome_image.svg";
import Swal from "sweetalert2";
import { API_URL_BACKEND, API_URL_BACKEND2 } from "../config";
import useMediaQuery from "@mui/material/useMediaQuery";
import { connect } from "react-redux";
import { loginSetUser } from "../store/auth/actions";
import { Grid } from "@material-ui/core";

function LogIn(props) {
  const history = useHistory();
  const matches = useMediaQuery("(max-width: 850px)");
  const [state, setState] = useState({
    email: "",
    password: "",
    error: null,
    isLoaded: false,
    isInfoFilled: false,
    infoMsg: null,
    firstName: "",
    lastName: "",
    start: new Date(),
    dob: null,
    phone: "",
    emailConfirm: "",
    passwordConfirm: "",
    firstNameError: null,
    lastNameError: null,
    dobError: null,
    phoneError: null,
    emailError: null,
    passwordError: null,
    passwordConfirmError: null,
    code: "",
    confirmMsg: null,
  });
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("isHomePage", "no");
  }, []);

  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      setBtnLoading(true);
      const user = await fetch(`${API_URL_BACKEND}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: state.email,
          password: state.password,
        }),
        credentials: "include",
      }).then((res) => res.json());

      if (user) {
        console.log("hamzaUser", user);
        setState({ ...state, error: null });
        localStorage.setItem("isLoggedIn-bookmarkd", "yes");
        props.loginSetUser(user.user, user.token);
        props.setLoggedIn(true);
        history.push("/dashboard");
      } else {
        setState({
          ...state,
          error: "Either the username or password are incorrect",
        });
      }
    } catch (err) {
    } finally {
      setBtnLoading(false);
    }
  };
  const handleInputSignup = (e) => {
    if (e.target.name === "code") {
      e.target.value = e.target.value.toUpperCase();
    }
    if (
      e.target.name === "passwordConfirm" &&
      e.target.value !== state.password
    ) {
      setState({
        ...state,
        passwordConfirmError: "Passwords must match",
        [e.target.name]: e.target.value,
      });
    } else if (
      e.target.name === "password" &&
      state.passwordConfirm !== "" &&
      e.target.value !== state.passwordConfirm
    ) {
      setState({
        ...state,
        passwordConfirmError: "Passwords must match",
        [e.target.name]: e.target.value,
      });
    } else {
      setState({
        ...state,
        passwordConfirmError: null,
        [e.target.name]: e.target.value,
      });
    }
  };
  const validateFirstName = () => {
    let firstNameError = null;
    const letters = /^[A-Za-z]+$/;
    if (state.firstName.length <= 1) {
      firstNameError = "First name is too short";
    } else if (!state.firstName.match(letters)) {
      firstNameError = "First name contains special characters";
    }
    console.log(state.firstName);
    setState({ ...state, firstNameError });
  };

  const validateLastName = () => {
    let lastNameError = null;
    const letters = /^[A-Za-z]+$/;
    if (state.lastName.length <= 1) {
      lastNameError = "Last name is too short";
    } else if (!state.lastName.match(letters)) {
      lastNameError = "Last name contains special characters";
    }
    setState({ ...state, lastNameError });
  };

  const validateDob = () => {
    const selectDate = new Date(state.dob);
    if (selectDate > new Date() || selectDate < new Date(1900, 1, 1)) {
      setState({ ...state, dobError: "Date not possible" });
    } else {
      setState({ ...state, dobError: null, dob: selectDate });
    }
  };

  const validatePhone = () => {
    let phoneError = null;
    if (state.phone.length < 10) {
      phoneError = "Phone number is too short";
    }
    setState({ ...state, phoneError });
  };

  const validateEmail = () => {
    let emailError = null;
    if (state.email.length < 9) {
      emailError = "Invalid Email";
    } else if (!state.email.includes("@ufl.edu")) {
      emailError = "Email is not a valid UF email";
    }

    setState({ ...state, emailError });
  };

  const validatePassword = () => {
    let passwordError = null;
    if (state.password.length < 8) {
      passwordError = "Password must be a minimum of 8 characters";
    }
    setState({ ...state, passwordError });
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    if (
      !(
        state.firstNameError ||
        state.lastNameError ||
        state.confirmMsg ||
        state.phoneError ||
        state.dobError ||
        state.emailError ||
        state.passwordError ||
        state.passwordConfirmError
      )
    ) {
      const res = await fetch(`${API_URL_BACKEND2}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: state.firstName,
          lastName: state.lastName,
          start: state.start,
          dob: state.dob,
          phone: state.phone,
          email: state.email,
          password: state.password,
        }),
        credentials: "include",
      }).then((res) => res.json());

      if (res.isEmailAvailable) {
        Swal.fire(
          "Signup successfull",
          "Please verify your email",
          "success"
        ).then(() => {
          setState({ ...state, isInfoFilled: true });
        });
      } else {
        Swal.fire(
          "Email has already been taken",
          "Please try with another email",
          "warning"
        ).then(() => {
          setState({ ...state, emailError: "Email has already been taken" });
        });
      }
    }
  };
  const checkSignupStatus = async () => {
    const res = await fetch(`${API_URL_BACKEND}signup-status`, {
      credentials: "include",
    }).then((res) => res.json());
    if (res.signupError) {
      setState({
        ...state,
        isLoaded: true,
        infoMsg: res.signupError,
        isInfoFilled: false,
      });
      setTimeout(() => {
        setState({ ...state, infoMsg: null });
      }, 3000);
    } else if (res.isInfoFilled) {
      setState({ ...state, isLoaded: true, isInfoFilled: true });
    } else {
      setState({ ...state, isLoaded: true, isInfoFilled: false });
    }
  };
  const handleSignupConfirm = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL_BACKEND}signup-confirm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: state.code,
      }),
      credentials: "include",
    }).then((res) => res.json());
    if (res.isSignupSuccessful) {
      setState({
        ...state,
        confirmMsg: {
          msg: "User registration was successful",
          class: "success",
        },
      });
      setTimeout(() => {
        history.push("/log-in");
      }, 3000);
    } else if (res.signupError === "Incorrect signup code") {
      setState({
        ...state,
        confirmMsg: {
          msg: res.signupError,
          class: "error",
        },
      });
    } else if (res.signupError === "Signup session has timed out") {
      setState({
        ...state,
        confirmMsg: {
          msg: res.signupError,
          class: "error",
        },
      });
      setTimeout(() => {
        history.push("/signup");
      }, 3000);
    }
  };
  useEffect(() => {
    if (props.user?._id) {
      history.push("/dashboard");
    } else {
      checkSignupStatus();
    }
  }, [props.user]);
  return (
    <div className="home">
      <div className="spacer"> </div>
      <div className="welcome-section">
        <div className="welcome-section__inner inner">
          <div className="welcome-section-image__container">
            <img className="welcome-section-image" src={GraduationImage} />
          </div>
          <div className="welcome-section-text__container">
            <div className="welcome-section-text__inner">
              <h1>
                Peer-to-Peer College{" "}
                <span style={{ fontFamily: "Poppins Bold" }}>
                  Textbook Marketplace
                </span>
              </h1>
              <p>
                Buy and sell your textbook materials right on your college
                campus
              </p>

              <div className={"signup-form-margin"}>
                {props.mode === "signup" ? (
                  <div className="login-container">
                    <div className="login-header">
                      <div className="login-option selected">Sign Up</div>
                      <div
                        className="login-option"
                        onClick={() => props.setMode("login")}>
                        Log In
                      </div>
                    </div>
                    {!state.isInfoFilled ? (
                      <form onSubmit={handleSignup} className="loginform">
                        <div className="login-inputs">
                          <div className="side-by-side">
                            <div style={{ width: "100%" }}>
                              <input
                                type="text"
                                placeholder="First name"
                                className="half-login-input"
                                onChange={handleInputSignup}
                                onBlur={validateFirstName}
                                required
                                style={{ width: "85%" }}
                                name="firstName"
                              />
                              {state.firstNameError && (
                                <div className="error">
                                  {state.firstNameError}
                                </div>
                              )}
                            </div>
                            <div style={{ width: "100%" }}>
                              <input
                                type="text"
                                placeholder="Last name"
                                className="half-login-input"
                                onChange={handleInputSignup}
                                onBlur={validateLastName}
                                required
                                style={{ width: "85%" }}
                                name="lastName"
                              />
                              {state.lastNameError && (
                                <div className="error">
                                  {state.lastNameError}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="side-by-side">
                            <div style={{ width: "100%" }}>
                              <input
                                type="date"
                                placeholder="DOB"
                                className="half-login-input"
                                style={{ width: "85%" }}
                                name="dob"
                                onChange={handleInputSignup}
                                onBlur={validateDob}
                                required
                              />
                              {state.dobError && (
                                <div className="error">{state.dobError}</div>
                              )}
                            </div>
                            <div style={{ width: "100%" }}>
                              <input
                                type="number"
                                placeholder="Phone"
                                className="half-login-input"
                                maxLength={10}
                                onChange={handleInputSignup}
                                onBlur={validatePhone}
                                required
                                style={{ width: "85%" }}
                                name="phone"
                              />
                              {state.phoneError && (
                                <div className="error">{state.phoneError}</div>
                              )}
                            </div>
                          </div>
                          <div style={{ width: "100%" }}>
                            <input
                              type="email"
                              placeholder="@ufl.edu email"
                              className="login-input"
                              name="email"
                              onChange={handleInputSignup}
                              onBlur={validateEmail}
                              required
                            />
                            {state.emailError && (
                              <div className="error">{state.emailError}</div>
                            )}
                          </div>
                          <div style={{ width: "100%" }}>
                            <input
                              type="password"
                              placeholder="Password"
                              className="login-input"
                              name="password"
                              onChange={handleInputSignup}
                              onBlur={validatePassword}
                              required
                            />
                            {state.passwordError && (
                              <div className="error">{state.passwordError}</div>
                            )}
                          </div>
                          <div style={{ width: "100%" }}>
                            <input
                              type="password"
                              placeholder="Confirm password"
                              className="login-input"
                              onChange={handleInputSignup}
                              required
                              name="passwordConfirm"
                            />
                            {state.passwordConfirmError && (
                              <div className="error">
                                {state.passwordConfirmError}
                              </div>
                            )}
                          </div>

                          <div style={{ width: "100%" }}>
                            <input
                              type="checkbox"
                              className="login-checkbox"
                              onChange={handleInputSignup}
                              required
                              name="checkbox"
                            />
                          </div>

                          <div className="button-holder">
                            <button type="submit">Create Account</button>
                            <div>
                              <a>Privacy Policy</a> &{" "}
                              <a>Terms of Service Agreement</a>
                            </div>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <form
                        onSubmit={handleSignupConfirm}
                        className="loginform">
                        <div className="login-inputs">
                          <p className="text-white">Sign Up Confirm</p>
                          <div style={{ width: "100%" }}>
                            <input
                              type="text"
                              placeholder="Code"
                              className="login-input"
                              onChange={handleInputSignup}
                              // value={state.code}
                              maxLength={5}
                              required
                              name="code"
                            />
                            {state.confirmMsg && (
                              <div className={state.confirmMsg.class}>
                                {state.confirmMsg.msg}
                              </div>
                            )}
                          </div>
                          <div className="button-holder">
                            <button type="submit">Complete Sign Up</button>
                            <div>
                              <a>Privacy Policy</a> &{" "}
                              <a>Terms of Service Agreement</a>
                            </div>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                ) : (
                  <div className="login-container">
                    <div className="login-header">
                      <div
                        className="login-option"
                        onClick={() => props.setMode("signup")}>
                        Sign Up
                      </div>
                      <div className="login-option selected">Log In</div>
                    </div>
                    <form className="loginform" onSubmit={handleLogin}>
                      <div className="login-inputs">
                        <input
                          name="email"
                          type="email"
                          placeholder=".edu email"
                          className="login-input"
                          onChange={handleInput}
                          required
                        />
                        <input
                          name="password"
                          type="password"
                          placeholder="Password"
                          className="login-input"
                          onChange={handleInput}
                          required
                        />
                        {state.error && (
                          <div className="error">{state.error}</div>
                        )}
                        <div className="button-holder">
                          <button type="submit" disabled={btnLoading}>
                            {btnLoading ? "..." : "Log In"}
                          </button>
                          <div>I forgot my username/password</div>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
const mapDispatchToProps = {
  loginSetUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
