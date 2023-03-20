import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import styles from "../styles/SideNavigationBar.module.css";
import { NavLink } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const SideNavigationBar = () => {
  const currentUser = useCurrentUser();
  return (
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
            <NavLink className={styles.NavLink} to="/signin">
              <i className="fas fa-feed"></i> Feed
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/signup"
            >
              <i className="fas fa-bookmark"></i> Bookmarks
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/signup"
            >
              <i className="fas fa-users"></i> Groups
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/signup"
            >
              <i className="fas fa-envelope"></i> Contact
            </NavLink>
          </Nav.Item>
          <br />
          <hr className={styles.Hr} />
          <Nav.Item>
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/signup"
            >
              <i className="fas fa-sign-out"></i> Sign Out
            </NavLink>
          </Nav.Item>
          {currentUser ? (
            <NavigationBar loggedIn={true} />
          ) : (
            <NavigationBar loggedIn={false} />
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default SideNavigationBar;