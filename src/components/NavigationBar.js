// React / router
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// Contexts
import { useCurrentUser } from "../contexts/CurrentUserContext";
// React Bootstrap components
import {
  Nav,
  Navbar,
  Container,
  Modal,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
// Components
import Avatar from "./Avatar";
// Styles
import styles from "../styles/NavigationBar.module.css";
import btnStyles from "../styles/Button.module.css";
// Images
import logo from "../assets/images/where-next-logo.png";

const NavigationBar = (props) => {
  // Get the current user from the CurrentUserContext
  const currentUser = useCurrentUser();
  const { loggedIn } = props;
  // State to handle the visibility of the modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar className={styles.NavigationBar} expand="lg" fixed="top">
      <Container>
        {/* WHERE NEXT logo with redirect to home */}
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="65px" width="180px" />
          </Navbar.Brand>
        </NavLink>
        {/* Info Icon */}
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Information</Tooltip>}
        >
          <Nav.Item
            alt="Click for information about Where Next"
            className={styles.InfoIcon}
          >
            <NavLink to="/" onClick={handleShow}>
              <i className="fa fa-info-circle fa-lg"></i>
            </NavLink>
          </Nav.Item>
        </OverlayTrigger>
        {/* Navbar toggle button */}
        <Navbar.Toggle aria-controls="basic-navbar-nav-toggle" />
        {/* Navbar content */}
        <Navbar.Collapse id="basic-navbar-nav-collapse">
          <Nav className="ml-auto">
            {/* If the user is logged in */}
            {loggedIn ? (
              <Nav.Item>
                <NavLink
                  className={styles.NavLink}
                  to={`/profiles/${currentUser?.profile_id}`}
                >
                  <Avatar
                    className="ml-2"
                    src={currentUser?.profile_image}
                    height={40}
                  />{" "}
                  Profile
                </NavLink>
              </Nav.Item>
            ) : (
              /* If the user is not logged in */
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
      {/* Modal for info icon */}
      <Modal show={show} onHide={handleClose}>
        <div className={styles.ModalBody}>
          {/* Modal close button */}
          <Button
            className={`${styles.ModalButton} ${btnStyles.Bright}`}
            onClick={handleClose}
          >
            <i className="far fa-times-circle fa-lg"></i>
          </Button>
          <h3 className={styles.Title}>Welcome..</h3>
          {/* Modal description */}
          <p className={`${styles.Description} text-center`}>
            Welcome to Where Next, a travel social media platform that connects
            people with their passion for travel. Our website is designed to
            help you explore new places and meet new people, all while sharing
            your travel experiences with the world. Plan your next adventure,
            share your photos and travel tips, and connect with fellow travelers
            from all around the globe. Whether you're looking to discover new
            destinations, make new friends, or simply share your travel
            experiences with others, our platform has got you covered.{" "}
          </p>
          <h4 className={`${styles.DescriptionFooter} text-center p-3`}>
            So why wait? Sign up today and start exploring all that Where Next
            has to offer!
          </h4>
          {/* Modal icons */}
          <ul className={`align-items-center text-center ${styles.Links}`}>
            <li>
              <i className="fas fa-globe"></i>
              <h5>Explore Places</h5>
            </li>
            <li>
              <i className="fas fa-network-wired"></i>
              <h5>Connect</h5>
            </li>
            <li>
              <i className="fas fa-users"></i>
              <h5>Socialize</h5>
            </li>
          </ul>
        </div>
      </Modal>
    </Navbar>
  );
};

export default NavigationBar;
