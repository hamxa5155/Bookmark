import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
//import logo from "../../assests/logo.jpg";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { style } from "@mui/system";
// import stylee from "../components/login/login.module.css";
// import Footer from "../components/footer";
import axios from "axios";
import { Table } from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
const Adduser = () => {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const [state, setState] = React.useState({
    fName: "",
    lName: "",
    uName: "",
    password: "",
  });
  const [registeredUsers, setRegisteredUser] = React.useState();
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });

    setState({ ...state, password: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignUp = async () => {
    console.log("handle click");
    let data = {
      name: `${state.fName} ${state.lName}`,
      email: state.uName,
      password: state.password,
    };

    try {
      console.log("ll");
      let signup = await axios.post(
        " https://laureatus.herokuapp.com/admin/register",
        data
      );
    } catch (err) {
      console.log(err);
      // if (err.response && err.response.data.error) {
      //   this.setState({
      //     errorMsg: err.response.data.error,
      //     loader: false,
      //     showErroModal: true
      //   });
      // } else if (err.response && err.response.data.message) {
      //   this.setState({
      //     errorMsg: err.response.data.message,
      //     loader: false,
      //     showErroModal: true
      //   });
      // } else {
      //   this.setState({
      //     errorMsg: err.message,
      //     loader: false,
      //     showErroModal: true
      //   });
      // }
    }
  };
  useEffect(async () => {
    let signup = await axios.get(
      "http://localhost:8000/admin/registered"
      //   " https://laureatus.herokuapp.com/admin/register"
    );
    //alert(signup);
    setRegisteredUser(signup);
  }, []);
  return (
    <div>
      <div>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          {" "}
          <span className={"stylee.mainH"}>ADD USERS</span>
          <div
            style={{ display: "flex", justifyContent: "center" }}
            className={"stylee.mt"}
          >
            <div
              style={{
                background: "#E8ECEE",
                minWidth: "300px",
                maxWidth: "300px",
              }}
            >
              <div style={{ display: "flex", color: "#79919D" }}>
                <PersonOutlinedIcon /> First Name
              </div>
              <TextField
                required
                id="filled-required"
                //   label="username"
                value={state.fName}
                onChange={(e) => {
                  console.log(e.target.value);
                  setState({ ...state, fName: e.target.value });
                }}
                placeholder="Enter First Name"
                variant="filled"
              />
            </div>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center" }}
            className={"stylee.mt"}
          >
            <div
              style={{
                background: "#E8ECEE",
                minWidth: "300px",
                maxWidth: "300px",
              }}
            >
              <div style={{ display: "flex", color: "#79919D" }}>
                <PersonOutlinedIcon /> Last Name
              </div>
              <TextField
                required
                id="filled-required"
                placeholder="Enter Last Name"
                variant="filled"
                onChange={(e) => {
                  console.log(e.target.value);
                  setState({ ...state, lName: e.target.value });
                }}
              />
            </div>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center" }}
            className={"stylee.mt"}
          >
            <div
              style={{
                background: "#E8ECEE",
                minWidth: "300px",
                maxWidth: "300px",
              }}
            >
              <div style={{ display: "flex", color: "#79919D" }}>
                <PersonOutlinedIcon /> Username
              </div>
              <TextField
                required
                id="filled-required"
                //   label="username"
                placeholder="Enter username"
                variant="filled"
                onChange={(e) => {
                  console.log(e.target.value);
                  setState({ ...state, uName: e.target.value });
                }}
              />
            </div>
          </div>
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                background: "#E8ECEE",
                minWidth: "300px",
                maxWidth: "300px",
              }}
            >
              <div style={{ display: "flex", color: "#79919D" }}>
                <LockIcon /> Password
              </div>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
                {/* <InputLabel htmlFor="filled-adornment-password">
                Password
              </InputLabel> */}
                <FilledInput
                  id="filled-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  placeholder="Enter password"
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
          </div>
          <br />
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              onClick={handleSignUp}
              style={{
                background: "rgb(201 158 101)",
                minWidth: "300px",
                maxWidth: "300px",
                padding: " 20px 0px",
                color: "white",
                fontWeight: "800",
                fontSize: "15px",
                cursor: "pointer",
                borderRadius: "12px",
              }}
            >
              ADD
            </div>
          </div>
        </Box>
      </div>
      <div>
        <div className={"stylee.mainH"} style={{ paddingTop: "40px" }}>
          List Of all registered users
        </div>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>UserName</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {registeredUsers?.data?.map((data, key) => {
              let f = data?.name.split(" ");
              console.log(f);
              let fname = f[0];
              let lname = f[1];
              return (
                <>
                  {" "}
                  <tr>
                    <td>{key + 1}</td>
                    <td>{fname}</td>
                    <td>{lname}</td>
                    <td>{data.email}</td>
                    <td>
                      <span>
                        <AiOutlineDelete />
                      </span>
                    </td>{" "}
                    <td>
                      <span>
                        <FiEdit />
                      </span>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Adduser;
