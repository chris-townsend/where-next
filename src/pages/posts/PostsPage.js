import React from "react";
import { Col, Row } from "react-bootstrap";

import styles from "../../styles/PostsPage.module.css";

function PostsPage() {
  return (
    <Row className={`${styles.RowWidth}`}>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles mobile</p>
        <p>List of posts here</p>
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Popular profiles for desktop</p>
      </Col>
    </Row>
  );
};

export default PostsPage;
