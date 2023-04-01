import React, { useState } from "react";
import { Nav, Navbar, Container, Modal, Button } from "react-bootstrap";
import styles from "../styles/SideNavigationBar.module.css";
import { NavLink } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";

const SideNavigationBar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const addPostIcon = (
    <Nav.Item>
      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/posts/create"
      >
        <i className="fas fa-plus-circle"></i> Add Post
      </NavLink>
    </Nav.Item>
  );
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
            <NavLink className={styles.NavLink} to="/feed">
              <i className="fas fa-feed"></i> Feed
            </NavLink>
          </Nav.Item>
          {/* Only show the post icon if the current user exists */}
          {currentUser && addPostIcon}
          <Nav.Item>
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/bookmarks"
            >
              <i className="fas fa-bookmark"></i> Bookmarks
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/groups"
            >
              <i className="fas fa-users"></i> Groups
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/liked"
            >
              <i className="fas fa-heart"></i> Liked
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/contact"
            >
              <i className="fas fa-envelope"></i> Contact
            </NavLink>
          </Nav.Item>
          <br />
          <hr className={styles.Hr} />
          <Nav.Item>
            <NavLink className={styles.NavLink} to="/" onClick={handleShow}>
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
      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to sign out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
};

export default SideNavigationBar;
