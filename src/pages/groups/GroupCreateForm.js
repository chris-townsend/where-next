import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import {
    Form,
    Button,
    Row,
    Col,
    Container,
    Image,
    Alert,
  } from "react-bootstrap";

const GroupCreateForm = () => {
  const [group, setGroup] = useState({
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState(null);
  const history = useHistory();

  const handleChange = (e) => {
    setGroup({
      ...group,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("group_name", group.group_name);
    formData.append("description", group.description);

    try {
      const { data } = await axiosReq.post("/groups/", group);
      history.push(`/groups/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <div>
      <h1>Create Group</h1>
      {errors && <div>{errors.message}</div>}
      <Form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="group_name"
            value={group.group_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            value={group.description}
            onChange={handleChange}
          />
        </div>
        <Button type="submit">Create Group</Button>
      </Form>
    </div>
  );
};

export default GroupCreateForm;
