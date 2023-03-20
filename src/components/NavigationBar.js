import React, { useContext } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import logo from "../assets/images/where-next-logo.png";
import styles from "../styles/NavigationBar.module.css";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../App";

const NavigationBar = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const { loggedIn } = props;

  return (
    <Navbar className={styles.NavigationBar} expand="lg" fixed="top">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="65px" width="180px" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {loggedIn ? (
              <Nav.Item>
                <NavLink to="/profile" className={styles.NavLink}>
                <i className="fas fa-user-circle"></i> Profile
                </NavLink>
              </Nav.Item>
            ) : (
              <>
                <Nav.Item>
                  <NavLink to="/signin" className={styles.NavLink}>
                  <i className="fas fa-sign-in"></i> Sign In
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink to="/signup" className={styles.NavLink}>
                  <i className="fas fa-user-plus"></i>Sign Up
                  </NavLink>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
