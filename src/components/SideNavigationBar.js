import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import styles from "../styles/SideNavigationBar.module.css";
import { NavLink } from "react-router-dom";

const SideNavigationBar = () => (
  <Navbar className={styles.SideNavigation}>
    <Container>
      <Nav className="ml-auto flex-column">
        <Nav.Item>
          <NavLink
            exact
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/"
          >
            <i className="fas fa-home"></i> Home
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink
            className={styles.NavLink}
            to="/signin"
          >
            <i className="fas fa-feed"></i> Feed
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/signup"
          >
            <i className="fas fa-user-plus"></i> Sign Up
          </NavLink>
        </Nav.Item>
      </Nav>
    </Container>
  </Navbar>
);

export default SideNavigationBar;
