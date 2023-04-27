// React / router
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// API
import { axiosReq } from "../../api/axiosDefaults";
// Hooks
import useRedirect from "../../hooks/useRedirect";
// React Bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
// Notifications
import { NotificationManager } from "react-notifications";
// Styles
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import styles from "../../styles/ContactCreateForm.module.css";

const ContactCreateForm = () => {
  // Using the useHistory hook to handle navigation history
  const history = useHistory();
  // Using the useRedirect hook to redirect if the user is logged out
  useRedirect("loggedOut");
  // Setting the initial state of the errors object to an empty object
  const [errors, setErrors] = useState({});
  // Setting the initial state of the contactData object with empty strings for subject and message
  const [contactData, setContactData] = useState({
    subject: "",
    message: "",
  });
  // Destructuring the values of subject and message from the contactData object
  const { subject, message } = contactData;

  // Handling input changes and updating the formData object
  const handleChange = (event) => {
    setContactData({
      ...contactData,
      [event.target.name]: event.target.value,
    });
  };

  // Handling the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("subject", subject);
    formData.append("message", message);

    try {
      // Sending a post request to the backend with the formData object
      await axiosReq.post("/contact/", formData);
      history.push("/");

      // Displaying a success notification to the user
      NotificationManager.success(
        "Thank you, your message has been recieved",
        "Success!"
      );
    } catch (err) {
      setErrors(err.response?.data);
      // Displaying an error notification to the user
      NotificationManager.error(
        "There was an issue sending your message",
        "Error"
      );
    }
  };
  const textFields = (
    <div className="text-center pt-0 pt-lg-4">
      <Form.Group>
        <Form.Label className={appStyles.TextColor} htmlFor="subject">
          Add an Enquiry:
        </Form.Label>
        <Form.Control
          className={appStyles.Input}
          type="text"
          id="subject"
          name="subject"
          value={subject}
          onChange={handleChange}
        />
      </Form.Group>
      {/* Displaying subject errors */}
      {errors?.subject?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label className={appStyles.TextColor} htmlFor="message">
          Message
        </Form.Label>
        <Form.Control
          className={appStyles.Input}
          as="textarea"
          rows={6}
          id="message"
          name="message"
          value={message}
          onChange={handleChange}
        />
      </Form.Group>
      {/* Displaying message errors */}
      {errors?.message?.map((message, idx) => (
        <Alert variant="danger" key={idx}>
          {message}
        </Alert>
      ))}
      <Button
        className={`${btnStyles.Button} ${btnStyles.Green} mt-3 mb-2 ml-2`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Green} mt-3 mb-2 ml-2`}
        type="submit"
      >
        Send
      </Button>
    </div>
  );

  return (
    <Form className="mt-1 mt-md-4" onSubmit={handleSubmit}>
      <Container
        className={`${styles.Container} d-flex flex-column justify-content-center pb-3 pt-2`}
      >
        <Col className="py-2 p-0 p-md-2" md={8} lg={12}>
          <h1 className={styles.ContactHeader}>Get In Touch With Us</h1>
          <hr className={styles.ContactHr} />
          <h2 className={`${styles.ContactText} text-center`}>
            Have an enquiry? We would love to hear from you.. Please use the
            form below
          </h2>
          <div>{textFields}</div>
        </Col>
      </Container>
      <br />
    </Form>
  );
};

export default ContactCreateForm;
