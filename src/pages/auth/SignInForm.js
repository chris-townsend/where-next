// React / router
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// API
import axios from "axios";
// Contexts
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
// Hooks
import useRedirect from "../../hooks/useRedirect";
// Utils
import { setTokenTimestamp } from "../../utils/utils";
// React Bootstrap components
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
// Styles
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
// Notifications
import { NotificationManager } from "react-notifications";

const SignInForm = () => {
  // Using the useSetCurrentUser hook to set the current user
  const setCurrentUser = useSetCurrentUser();
  // Setting the initial state of the errors object to an empty object
  const [errors, setErrors] = useState({});
  // Using the useHistory hook to handle navigation history
  const history = useHistory();
  // Using the useRedirect hook to redirect if the user is already logged in
  useRedirect("loggedIn");
  // Setting the initial state of the signInData object with empty strings for the username and password
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  // Destructuring the values of username and password from the signInData object
  const { username, password } = signInData;

  // Handling the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Sending a post request to the backend with the signInData object
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      // Setting the current user with the data returned from the backend
      setCurrentUser(data.user);
      // Extract expiry date for the access token & save to users local storage
      setTokenTimestamp(data);
      // Navigating to the previous page in the navigation history
      history.goBack();
      // Displaying a success notification to the user
      NotificationManager.success(
        "Welcome " + username + ". You are now signed in",
        "Success!"
      );
    } catch (error) {
      setErrors(error.response?.data);
      // Displaying an error notification to the user
      NotificationManager.error("There was an issue logging you in", "Error");
    }
  };
  // Handling input changes and updating the signInData object
  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>Sign In</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none" htmlFor="title">
                Username
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                className={styles.Input}
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {/* Displaying username errors */}
            {errors.username?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password">
              <Form.Label className="d-none" htmlFor="password">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                className={styles.Input}
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            {/* Displaying password errors */}
            {errors.password?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              type="submit"
            >
              Sign in
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>
        <Container className={`mt-2 text-center ${appStyles.Content}`}>
          <Link className={styles.SignInLink} to="/signup">
            Don't have an account?{" "}
            <span className={styles.SignUpLink}>Click here to sign up</span>
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
            "https://res.cloudinary.com/diez1cpce/image/upload/v1679133248/login-image_vqabap.jpg"
          }
          alt="Map with pins"
        />
      </Col>
    </Row>
  );
};

export default SignInForm;
