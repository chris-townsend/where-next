import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import styles from "../../styles/ContactCreateForm.module.css";

const ContactCreateForm = () => {
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const textFields = (
    <div className="text-center pt-0 pt-lg-4">
      <Form.Group>
        <Form.Label className={appStyles.TextColor}>Add an Enquiry:</Form.Label>
        <Form.Control
          className={appStyles.Input}
          type="text"
          name="subject"
          value={() => {}}
          onChange={() => {}}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="danger" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label className={appStyles.TextColor}>Message</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="message"
          className={appStyles.Input}
          value={() => {}}
          onChange={() => {}}
        />
      </Form.Group>
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
    <Form className="mt-1 mt-md-4" onSubmit={() => {}}>
      <Container
        className={`${styles.Container} d-flex flex-column justify-content-center pb-3 pt-2`}
      >
        <h1 className={styles.ContactHeader}>Get In Touch With Us</h1>
        <hr className={styles.ContactHr} />
        <h2 className={`${styles.ContactText} text-center`}>
          Have an enquiry? We would love to hear from you.. Please use the form
          below
        </h2>

        <div>{textFields}</div>
      </Container>
      <br />
    </Form>
  );
};

export default ContactCreateForm;
