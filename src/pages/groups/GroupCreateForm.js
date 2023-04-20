// React / router
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// API
import { axiosReq } from "../../api/axiosDefaults";
// React Bootstrap components
import { Form, Button, Col, Alert } from "react-bootstrap";
// Notifications
import { NotificationManager } from "react-notifications";
// Styles
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/GroupCreate.module.css";

const GroupCreateForm = () => {
  // Setting the initial state of the errors object to an empty object
  const [errors, setErrors] = useState({});
  // Using the useHistory hook to handle navigation history
  const history = useHistory();
  // Setting the initial state of the groupData object with empty strings for group_name and description
  const [groupData, setGroupData] = useState({
    group_name: "",
    description: "",
  });
  // Destructuring the values of group_name and description from the groupData object
  const { group_name, description } = groupData;

  // Handling input changes and updating the groupData object
  const handleChange = (e) => {
    setGroupData({
      ...groupData,
      [e.target.name]: e.target.value,
    });
  };
  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const groupData = new FormData();
    groupData.append("group_name", group_name);
    groupData.append("description", description);

    try {
      // Sending a post request to the backend with the groupData object
      const { data } = await axiosReq.post("/groups/", groupData);
      history.push(`/groups/${data.id}`);
      // Show a success notification
      NotificationManager.success("Group Created", "Success!");
    } catch (err) {
      setErrors(err.response?.data);
      // Show an error notification if there was an issue creating the group
      NotificationManager.error(
        "There was an issue creating your group",
        "Error"
      );
    }
  };
  const textFields = (
    <div className="text-center p-4">
      <Form.Group>
        <Form.Label> Group Name</Form.Label>
        <Form.Control
          type="text"
          name="group_name"
          value={group_name}
          onChange={handleChange}
        />
      </Form.Group>
      {/* Displaying group_name errors */}
      {errors.group_name?.map((message, idx) => (
        <Alert key={idx} variant="warning">
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>
      {/* Displaying description errors */}
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
