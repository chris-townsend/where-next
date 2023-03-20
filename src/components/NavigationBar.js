import React, { useContext } from "react";
import { Nav, Navbar, Form, FormControl, Container } from "react-bootstrap";
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
                <NavLink to="/dashboard" className={styles.NavLink}>
                  Dashboard
                </NavLink>
              </Nav.Item>
            ) : (
              <>
                <Nav.Item>
                  <NavLink to="/signin" className={styles.NavLink}>
                    Sign In
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink to="/signup" className={styles.NavLink}>
                    Sign Up
                  </NavLink>
                </Nav.Item>
              </>
            )}
          </Nav>
          <Form className={styles.SearchForm}>
            <FormControl
              className={styles.SearchInput}
              type="text"
              placeholder="Search posts, profiles & more"
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;