import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import logo from "../assets/images/where-next-logo.png";
import styles from "../styles/NavigationBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";

const NavigationBar = (props) => {
  const currentUser = useCurrentUser();
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
                <NavLink
                  className={styles.NavLink}
                  to={`/profiles/${currentUser?.profile_id}`}
                >
                  <Avatar src={currentUser?.profile_image} text='Profile' height={40} />

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
