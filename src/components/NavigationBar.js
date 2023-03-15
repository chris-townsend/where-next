import React from "react";
import { Nav, Navbar, Form, FormControl, Container } from "react-bootstrap";
import logo from "../assets/images/where-next-logo.png";
import styles from "../styles/NavigationBar.module.css";

const NavigationBar = () => (
  <Navbar className={styles.NavigationBar} expand="lg" fixed="top">
    <Container>
      <Navbar.Brand>
        <img src={logo} alt="logo" height="65px" width="180px" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Form className={styles.SearchForm}>
          <FormControl
            className={styles.SearchInput}
            type="text"
            placeholder="Search posts, profiles & more"
          />
          <button className={styles.SearchButton} aria-label="Search button" type="submit">
            <i className="fas fa-search"></i>
          </button>
        </Form>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item>
            <Nav.Link>
              <i className="fas fa-sign-in"></i> Sign In
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <i className="fas fa-user-plus"></i> Sign Up
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavigationBar;
