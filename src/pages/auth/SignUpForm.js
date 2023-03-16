import React from "react";
import { Link } from "react-router-dom";
import { Image, Col, Row, Container, Form, Button } from "react-bootstrap";
import appStyles from "../../App.module.css";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";

const SignUpForm = () => {
  return (
    <Row>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>Sign Up</h1>
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="username"
                placeholder="Username"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password1"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm Password"
                name="password2"
              />
              <Form.Text className="text-muted text-center">
                We'll never share your information with anyone else.
              </Form.Text>
            </Form.Group>
            <Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`} variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </Container>
        <Container className={`mt-3 text-center ${appStyles.Content}`}>
          <Link to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col md={6} className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}>
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
