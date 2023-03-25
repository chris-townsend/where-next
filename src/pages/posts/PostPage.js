import React from "react";
import { Col, Row, Container } from "react-bootstrap";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostCreateUpdate.module.css";

function PostPage() {
  return (
    <Row className={`${styles.RowWidth}`}>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        <p>Post component</p>
        <Container
          className={`${appStyles.Content} ${styles.CommentContainer}`}
        >
          Comments
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default PostPage;
