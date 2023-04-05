import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Form, Button, Row, Col, Container, Alert } from "react-bootstrap";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/GroupCreate.module.css";

const GroupCreateForm = () => {
  const [errors, setErrors] = useState({});
  const [groupData, setGroupData] = useState({
    group_name: "",
    description: "",
  });
  const { group_name, description } = groupData;

  const history = useHistory();

  const handleChange = (e) => {
    setGroupData({
      ...groupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("group_name", group_name);
    formData.append("description", description);

    try {
      const { data } = await axiosReq.post("/groups/", groupData);
      history.push(`/groups/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };
  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label> Group Name:</Form.Label>
        <Form.Control
          type="text"
          name="group_name"
          value={group_name}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.group_name?.map((message, idx) => (
        <Alert key={idx} variant="warning">
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Description:</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
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
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className={styles.GroupHeader}>Create Group</h1>
      {errors && <div>{errors.message}</div>}

      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <div>{textFields}</div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
};

export default GroupCreateForm;
