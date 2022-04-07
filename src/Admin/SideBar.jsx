import React, { useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Team from "./Team/Team";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";

import "./admin.css";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";

// import { makeStyles, useTheme } from '@material-ui/core/styles'

import { Link, useHistory } from "react-router-dom";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { FiLogOut } from "react-icons/fi";

import { TiThMenu } from "react-icons/ti";
import { FiStar } from "react-icons/fi";
import { GrCircleInformation } from "react-icons/gr";
import { AiOutlineShop } from "react-icons/ai";
import { BiFoodMenu } from "react-icons/bi";
import { BiSupport } from "react-icons/bi";
import { FaJediOrder } from "react-icons/fa";
import pic from "../assets/bookmarkd_logo_03.svg";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,

      backgroundColor: "white",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,

  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "white",
  },
  content: {
    flexGrow: 1,

    backgroundColor: "white",
    overflow: "hidden",
  },
  rootMenu: {
    width: 373,
    padding: "15px",
  },
}));

function SideBar(props) {
  const history = useHistory();
  console.log(props);

  const classes = useStyles();
  // const theme = useTheme()
  const theme = createMuiTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currentpath, setcurrentpath] = React.useState("/");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [values, setvalues] = React.useState({
    googleData: [],
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handlelogout = () => {
    localStorage.removeItem("admintoken");
    window.location.href = "/";
  };
  const drawer = (
    <div className="space">
      <div
        className={classes.toolbar}
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          marginTop: "40px",
        }}
      >
        <img src={pic} alt="" className="admin-cafename" width="150px" />
      </div>

      <List>
        <ListItem
          button
          key="/Username"
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "50px",
          }}
        >
          <ListItemText className="text-center"></ListItemText>
        </ListItem>
        {/* 
        <Link className="link_style" to="/admin/products">
          <ListItem
            onClick={() => setcurrentpath("/admin/products")}
            button
            key="/user"
            className="Center"
            style={{
              display: "flex",
              justifyContent: "center",
              borderRight:
                currentpath === "/admin/products"
                  ? "6px solid #000"
                  : "6px solid transparent",
            }}
          >
            <ListItemIcon
              style={{
                fontSize: "25px",
                color: currentpath === "/admin/products" ? "#000" : "#828282",
              }}
            >
              <FiStar size={24} color="black" />{" "}
            </ListItemIcon>
            <ListItemText
              style={{
                width: "76px",
                color: currentpath === "/admin/products" ? "#000" : "#828282",
              }}
            >
              <span className="content">Products</span>
            </ListItemText>
          </ListItem>
        </Link>

        <Link className="link_style" to="/admin/coupons">
          <ListItem
            onClick={() => setcurrentpath("/admin/coupons")}
            button
            key="/user"
            className="Center"
            style={{
              display: "flex",
              justifyContent: "center",
              borderRight:
                currentpath === "/admin/coupons"
                  ? "6px solid #000"
                  : "6px solid transparent",
            }}
          >
            <ListItemIcon
              style={{
                fontSize: "25px",
                color: currentpath === "/admin/coupons" ? "#000" : "#828282",
              }}
            >
              <AiOutlineShop size={24} color="black" />{" "}
            </ListItemIcon>
            <ListItemText
              style={{
                width: "76px",
                color: currentpath === "/admin/coupons" ? "#000" : "#828282",
              }}
            >
              <span className="content">Coupons</span>
            </ListItemText>
          </ListItem>
        </Link>

        <Link className="link_style" to="/adminmenuorder">
          <ListItem
            onClick={() => setcurrentpath("/adminmenuorder")}
            button
            key="/user"
            className="Center"
            style={{
              display: "flex",
              justifyContent: "center",
              borderRight:
                currentpath === "/adminmenuorder"
                  ? "6px solid #000"
                  : "6px solid transparent",
            }}
          >
            <ListItemIcon
              style={{
                fontSize: "25px",
                color: currentpath === "/adminmenuorder" ? "#000" : "#828282",
              }}
            >
              <BiFoodMenu size={24} color="black" />{" "}
            </ListItemIcon>
            <ListItemText
              style={{
                width: "76px",
                color: currentpath === "/adminmenuorder" ? "#000" : "#828282",
              }}
            >
              <span className="content">Menu Order</span>
            </ListItemText>
          </ListItem>
        </Link>*/}
        <Link className="link_style" to="/add-users">
          <ListItem
            onClick={() => setcurrentpath("/add-users")}
            button
            key="/user"
            className="Center"
            style={{
              display: "flex",
              justifyContent: "center",
              borderRight:
                currentpath === "/add-users"
                  ? "6px solid #000"
                  : "6px solid transparent",
            }}
          >
            <ListItemIcon
              style={{
                fontSize: "25px",
                color: currentpath === "/add-users" ? "#000" : "#828282",
              }}
            >
              <FaJediOrder size={24} color="black" />{" "}
            </ListItemIcon>
            <ListItemText
              style={{
                width: "76px",
                color: currentpath === "/add-users" ? "#000" : "#828282",
              }}
            >
              <span className="content">Add user</span>
            </ListItemText>
          </ListItem>
        </Link>

        <Link className="link_style" to="/team">
          <ListItem
            onClick={() => setcurrentpath("/team")}
            button
            key="/user"
            className="Center"
            style={{
              display: "flex",
              justifyContent: "center",
              borderRight:
                currentpath === "/team"
                  ? "6px solid #000"
                  : "6px solid transparent",
            }}
          >
            <ListItemIcon
              style={{
                fontSize: "25px",
                color: currentpath === "/team" ? "#000" : "#828282",
              }}
            >
              <FaJediOrder size={24} color="black" />{" "}
            </ListItemIcon>
            <ListItemText
              style={{
                width: "76px",
                color: currentpath === "/team" ? "#000" : "#828282",
              }}
            >
              <span className="content">Add Team</span>
            </ListItemText>
          </ListItem>
        </Link>

        <Link className="link_style" to="/support-chats">
          <ListItem
            onClick={() => setcurrentpath("/admin/support-chats")}
            button
            key="/user"
            className="Center"
            style={{
              display: "flex",
              justifyContent: "center",
              borderRight:
                currentpath === "/admin/support-chats"
                  ? "6px solid #000"
                  : "6px solid transparent",
            }}
          >
            <ListItemIcon
              style={{
                fontSize: "25px",
                color:
                  currentpath === "/admin/support-chats" ? "#000" : "#828282",
              }}
            >
              <BiSupport size={24} color="black" />{" "}
            </ListItemIcon>
            <ListItemText
              style={{
                width: "76px",
                color:
                  currentpath === "/admin/support-chats" ? "#000" : "#828282",
              }}
            >
              <span className="content">Support Chats</span>
            </ListItemText>
          </ListItem>
        </Link>
        <Link className="link_style" to="/admin/about-us">
          <ListItem
            onClick={() => setcurrentpath("/admin/about-us")}
            button
            key="/user"
            className="Center"
            style={{
              display: "flex",
              justifyContent: "center",
              borderRight:
                currentpath === "/admin/support-chats"
                  ? "6px solid #000"
                  : "6px solid transparent",
            }}
          >
            <ListItemIcon
              style={{
                fontSize: "25px",
                color: currentpath === "/admin/about-us" ? "#000" : "#828282",
              }}
            >
              <GrCircleInformation size={24} color="black" />
            </ListItemIcon>
            <ListItemText
              style={{
                width: "76px",
                color: currentpath === "/admin/about-us" ? "#000" : "#828282",
              }}
            >
              <span className="content">About us</span>
            </ListItemText>
          </ListItem>
        </Link>
      </List>
      <List>
        <ListItem
          className="menutextcolor"
          button
          key="/user"
          onClick={(e) => {
            handlelogout(e);
          }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <ListItemIcon>
            {" "}
            <FiLogOut size={24} color="black" />
          </ListItemIcon>
          <ListItemText>
            <span className="content">Log out</span>
          </ListItemText>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
        style={{ backgroundColor: "white" }}
      >
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "flex-end",
            backgroundColor: "#000",
          }}
        >
          <IconButton
            style={{ color: "black" }}
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <TiThMenu color="white" />
          </IconButton>
          <Typography variant="h6" noWrap>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              className={classes.rootMenu}
            >
              <div className="row">
                <h2 className="message">2 New Message</h2>
              </div>
              <MenuItem className="menu-item">
                <Typography variant="inherit">
                  <div className="row">
                    <h5 className="notification-heading">
                      {" "}
                      New Data Alert: Block 3B
                    </h5>
                    <h5 className="notification-para">
                      Click to view & approve
                    </h5>
                  </div>
                </Typography>
              </MenuItem>
              <MenuItem className="menu-item">
                <Typography variant="inherit">
                  <div className="row">
                    <h5 className="notification-heading">
                      {" "}
                      New Data Alert: Block 3B
                    </h5>
                    <h5 className="notification-para">
                      Click to view & approve
                    </h5>
                  </div>
                </Typography>
              </MenuItem>
              <MenuItem className="menu-item-disable">
                <Typography variant="inherit">
                  <div className="row">
                    <h5 className="notification-heading">
                      {" "}
                      New Data Alert: Date of Harvest Block 2A
                    </h5>
                    <h5 className="notification-para">
                      Click to view & approve
                    </h5>
                  </div>
                </Typography>
              </MenuItem>
              <MenuItem className="menu-item-disable">
                <Typography variant="inherit">
                  <div className="row">
                    <h5 className="notification-heading">
                      {" "}
                      New Data Alert: Block 3B
                    </h5>
                    <h5 className="notification-para">
                      Click to view & approve
                    </h5>
                  </div>
                </Typography>
              </MenuItem>
            </Menu>
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

SideBar.propTypes = {
  window: PropTypes.func,
};

export default SideBar;
