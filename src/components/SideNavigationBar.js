// React / router
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// API
import axios from "axios";
// Contexts
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
// Utils
import { removeTokenTimestamp } from "../utils/utils";
// React Bootstrap components
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
// Components
import NavigationBar from "./NavigationBar";
// Notifications
import { NotificationManager } from "react-notifications";
// Styles
import styles from "../styles/SideNavigationBar.module.css";
import btnStyles from "../styles/Button.module.css";

const SideNavigationBar = () => {
  // State for controlling the sign out confirmation modal
  const [show, setShow] = useState(false);
  // Handler for closing the sign out confirmation modal
  const handleClose = () => setShow(false);
  // Handler for opening the sign out confirmation modal
  const handleShow = () => setShow(true);
  // Get the current user from the CurrentUserContext
  const currentUser = useCurrentUser();
  // Getting the setCurrentUser function from the CurrentUserContext
  const setCurrentUser = useSetCurrentUser();

  // Function to handle sign out
  const handleSignOut = async () => {
    try {
      // Sending a POST request to log the user out
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null); // Setting the current user to null to log them out
      removeTokenTimestamp(); // Remove local storage timestamp
      NotificationManager.info("You are now signed out"); // Show a success notification
    } catch (err) {
      // Show an error notification if there was an issue with sign out
      NotificationManager.error("There was an issue signing you out", "Error");
    }
  };
  // Add post icon
  const addPostIcon = (
    <Nav.Item>
      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/posts/create"
      >
        <i className="fas fa-plus-circle"></i>{" "}
        <span className="d-none d-md-inline">Add Post</span>
      </NavLink>
    </Nav.Item>
  );
  return (
    <Navbar className={styles.SideNavigation}>
      {/* Navigation items */}
      <Container>
        <Nav className="ml-auto flex-column">
          {/* Home Icon */}
          <Nav.Item>
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              <i className="fas fa-home"></i>
              <span className="d-none d-md-inline">Home</span>
            </NavLink>
          </Nav.Item>
          {/* Feed Icon */}
          <Nav.Item>
            <NavLink className={styles.NavLink} to="/feed">
              <i className="fas fa-feed"></i>
              <span className="d-none d-md-inline">Feed</span>
            </NavLink>
          </Nav.Item>
          {/* Only show the post icon if the current user is logged in*/}
          {currentUser && addPostIcon}
          {/* Bookmark Icon */}
          <Nav.Item>
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/bookmarks"
            >
              <i className="fas fa-bookmark"></i>{" "}
              <span className="d-none d-md-inline">Bookmarks</span>
            </NavLink>
          </Nav.Item>
          {/* Groups Icon */}
          <Nav.Item>
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/groups"
            >
              <i className="fas fa-users"></i>{" "}
              <span className="d-none d-md-inline">Groups</span>
            </NavLink>
          </Nav.Item>
          {/* Liked posts (heart) Icon */}
          <Nav.Item>
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/liked"
            >
              <i className="fas fa-heart"></i>{" "}
              <span className="d-none d-md-inline">Liked</span>
            </NavLink>
          </Nav.Item>
          {/* Contact Icon */}
          <Nav.Item>
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/contact/create"
            >
              <i className="fas fa-envelope"></i>{" "}
              <span className="d-none d-md-inline">Contact</span>
            </NavLink>
          </Nav.Item>
          <br />
          <hr className={styles.Hr} />
          {/* Sign out Icon */}
          <Nav.Item>
            <NavLink className={styles.NavLink} to="/" onClick={handleShow}>
              <i className="fas fa-sign-out"></i>{" "}
              <span className="d-none d-md-inline">Sign Out</span>
            </NavLink>
          </Nav.Item>
          {/* Import NavigationBar component for logged in/out users */}
          {currentUser ? (
            <NavigationBar loggedIn={true} />
          ) : (
            <NavigationBar loggedIn={false} />
          )}
        </Nav>
      </Container>
      {/* Modal for sign out confirmation */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={`${styles.Title} text-center`}>
            Sign Out
          </Modal.Title>
        </Modal.Header>
        <div className={styles.Description}>
          Are you sure you want to sign out?
        </div>
        <Modal.Footer className="text-center align-items-center">
          <Button
            className={`${btnStyles.Button} ${btnStyles.Bright}`}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            className={`${btnStyles.Button} ${btnStyles.Green}`}
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
};

export default SideNavigationBar;
