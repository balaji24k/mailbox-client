import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { useSelector } from "react-redux";
import classes from "./NavBar.module.css"

const NavbarDetails = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const logout = () => {
    alert("logged out succesfull");
    dispatch(authActions.logout());
  };
  
  return (
    <Navbar bg="white" expand="lg">
      <Navbar.Brand className={classes.head}> MailBox</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {!isAuthenticated && (
            <NavLink to="/login" className={classes.style} style={{color:"red"}}>
              Login
            </NavLink>
          )}
          {!isAuthenticated && (
            <NavLink to="/signup" className={classes.style} style={{color:"green"}}>
              SignUp
            </NavLink>
          )}

          {isAuthenticated && (
            <NavLink to="/composemail" className={classes.style} style={{color:"green"}}>
              Compose Mail
            </NavLink>
          )}
          {isAuthenticated && (
            <NavLink to="/inbox" className={classes.style} style={{color:"black"}} >
              Inbox
            </NavLink>
          )} 

          {isAuthenticated && (
            <NavLink to="/login" className={classes.style} style={{color:"red"}} onClick={logout}>
              Logout
            </NavLink>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarDetails;