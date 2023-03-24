import React from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

import styles from "../../styles/PostCreateUpdate.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

function PostCreateForm() {
  return (
    <Form>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              <Form.Label
                className="d-flex justify-content-center"
                htmlFor="image-upload"
              >
                ASSET
              </Form.Label>
              <div className="d-flex justify-content-center">
                <Button
                  className={`${btnStyles.Button} ${btnStyles.Green}`}
                  onClick={() => {}}
                >
                  cancel
                </Button>
                <Button
                  className={`${btnStyles.Button} ${btnStyles.Green}`}
                  type="submit"
                >
                  create
                </Button>
              </div>
            </Form.Group>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostCreateForm;
