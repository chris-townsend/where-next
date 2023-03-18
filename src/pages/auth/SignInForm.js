import React from "react";
import { Link } from "react-router-dom";

import {
    Image,
    Col,
    Row,
    Container,
    Form,
    Button,
    Alert,
  } from "react-bootstrap";

import appStyles from "../../App.module.css";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";


function SignInForm() {

  return (
    <Row className={styles.Row}>
      <Col className="my-auto p py-2-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>Sign In</h1>

        </Container>
        <Container className={`mt-2 text-center ${appStyles.Content}`}>
          <Link className={styles.SignInLink} to="/signup">
            Don't have an account? <span>Sign up now!</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
      >
        <Image
          className={`${appStyles.SignUpImage}`}
          src={"https://res.cloudinary.com/diez1cpce/image/upload/v1679133248/login-image_vqabap.jpg"}
        />
      </Col>
    </Row>
  );
}

export default SignInForm;