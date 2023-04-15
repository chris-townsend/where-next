// React / router
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// API
import axios from "axios";
// Hooks
import useRedirect from "../../hooks/UseRedirect";
// React Bootstrap components
import {
  Image,
  Col,
  Row,
  Container,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
// Styles
import appStyles from "../../App.module.css";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
// Notifications
import { NotificationManager } from "react-notifications";

const SignUpForm = () => {
  // Setting the initial state of the errors object to an empty object
  const [errors, setErrors] = useState({});
  // Using the useHistory hook to handle navigation history
  const history = useHistory();
  // Using the useRedirect hook to redirect if the user is already logged in
  useRedirect("loggedIn");
  // Setting the initial state of the signUpData object with empty strings for the username and passwords
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  // Destructuring the values of username and password from the signUpData object
  const { username, password1, password2 } = signUpData;

  // Handling input changes and updating the signUpData object
  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  // Handling the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
      NotificationManager.success("Account created successfully", "Success!");
    } catch (error) {
      setErrors(error.response?.data);
      NotificationManager.error("There was an issue with sign up", "Error");
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>Sign Up</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {/* Displaying username errors */}
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group className="mb-3" controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {/* Displaying password errors */}
            {errors.password1?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Form.Group className="mb-3" controlId="password2">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
              <Form.Text className="text-muted text-center">
                We'll never share your information with anyone else.
              </Form.Text>
            </Form.Group>
            {/* Displaying password errors */}
            {errors.password2?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              variant="primary"
              type="submit"
            >
              Sign Up
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>
        <Container className={`mt-2 text-center ${appStyles.Content}`}>
          <Link className={styles.SignInLink} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.SignUpImage}`}
          src={
            "https://res.cloudinary.com/diez1cpce/image/upload/v1678965518/sign-in-image_g1wwgu.jpg"
          }
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;
