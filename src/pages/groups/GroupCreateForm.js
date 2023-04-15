import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Form, Button, Col, Alert } from "react-bootstrap";
// Notifications
import { NotificationManager } from "react-notifications";
// Styles
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
    const groupData = new FormData();
    groupData.append("group_name", group_name);
    groupData.append("description", description);

    try {
      const { data } = await axiosReq.post("/groups/", groupData);
      history.push(`/groups/${data.id}`);
      NotificationManager.success("Group Created", "Success!");
    } catch (err) {
      NotificationManager.error(
        "There was an issue removing your group",
        "Error"
      );
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
    <div className="text-center">
      <Form
        className={`d-flex flex-column justify-content-center align-items-center text-center ${styles.Form}`}
        onSubmit={handleSubmit}
      >
        <h1 className={`display-4 text-center ${styles.GroupCreateHeader}`}>
          Create Group
        </h1>
        <hr className={`${styles.Hr} w-25 mb-4`} />
        {errors && <div>{errors.message}</div>}

        <Col md={8} lg={10} className={`py-2 p-0 p-md-2 ${appStyles.Content}`}>
          <div>{textFields}</div>
        </Col>
      </Form>
    </div>
  );
};

export default GroupCreateForm;
