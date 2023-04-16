// React / router
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
// API
import { axiosRes } from "../../api/axiosDefaults";
// Contexts
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
// React Bootstrap components
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
// Notifications
import { NotificationManager } from "react-notifications";
// Styles
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

const UsernameEditForm = () => {
  // State to store the username entered in the form
  const [username, setUsername] = useState("");
  // State to store any validation errors returned by the server
  const [errors, setErrors] = useState({});
  // Using the useHistory hook to handle navigation history
  const history = useHistory();
  // Get id from the URL parameter
  const { id } = useParams();

  // Get the current user from CurrentUserContext.js
  const currentUser = useCurrentUser();
  // Access the function to update the current user in the CurrentUserContext
  const setCurrentUser = useSetCurrentUser();

  // When the component mounts, check if the current user matches the user whose username is being edited
  useEffect(() => {
    if (currentUser?.profile_id?.toString() === id) {
      setUsername(currentUser.username);
    } else {
      // If the current user doesn't match, redirect to the home page
      history.push("/");
    }
  }, [currentUser, history, id]);

  // Function to handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send a PUT request to the server to update the username
      await axiosRes.put("/dj-rest-auth/user/", {
        username,
      });
      // Update the username in the CurrentUserContext
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username,
      }));
      history.goBack();
      // Show a success notification
      NotificationManager.success("Username Updated", "Success!");
    } catch (err) {
      // If there's an error, show an error notification
      NotificationManager.error(
        "There was an issue updating your username",
        "Error"
      );
    }
  };

  return (
    <Row>
      <Col className="py-2 mx-auto text-center mt-5" md={8}>
        <Container className={appStyles.Content}>
          <Form onSubmit={handleSubmit} className="my-2">
            <Form.Group>
              <Form.Label>Change username</Form.Label>
              <Form.Control
                placeholder="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Form.Group>
            {/* Display any username errors returned by the server */}
            {errors?.username?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Button
              className={`${btnStyles.Button} ${btnStyles.Green}`}
              onClick={() => history.goBack()}
            >
              cancel
            </Button>
            <Button
              className={`${btnStyles.Button} ${btnStyles.Green}`}
              type="submit"
            >
              save
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default UsernameEditForm;
