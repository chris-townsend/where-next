// React / router
import React, { useState, useRef, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
// API
import { axiosReq } from "../../api/axiosDefaults";
// React Bootstrap components
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Image,
  Alert,
} from "react-bootstrap";
// Notifications
import { NotificationManager } from "react-notifications";
// Styles
import styles from "../../styles/PostCreateUpdate.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

const PostEditForm = () => {
  // Setting the initial state of the errors object to an empty object
  const [errors, setErrors] = useState({});
  const imageInput = useRef(null);
  // Using the useHistory hook to handle navigation history
  const history = useHistory();
  // get id from the URL parameter
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        const { title, about, image, is_owner } = data;
        // If the user is not the owner of the post, redirect to the home page
        is_owner ? setPostData({ title, about, image }) : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [history, id]);

  // Setting the initial state of the post data object
  const [postData, setPostData] = useState({
    title: "",
    about: "",
    image: "",
  });
  const { title, about, image } = postData;

  // Handle input changes
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle image changes
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("about", about);

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      // Submit updated formdata to the API
      await axiosReq.put(`/posts/${id}/`, formData);
      // Redirect to the updated post page
      history.push(`/posts/${id}`);
      // Show success notification
      NotificationManager.success("Post Updated", "Success!");
    } catch (error) {
      setErrors(error.response?.data);
      // Show error notification
      NotificationManager.error(
        "There was an issue updating your post",
        "Error"
      );
    }
  };
  // Text input fields for the post title and content
  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {/* Display any title errors */}
      {errors.title?.map((message, idx) => (
        <Alert key={idx} variant="warning">
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="about"
          value={about}
          onChange={handleChange}
        />
      </Form.Group>
      {/* Display any about errors */}
      {errors?.about?.map((message, idx) => (
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
        update
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={10}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              <figure>
                <Image className={appStyles.Image} src={image} rounded />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Green} btn`}
                  htmlFor="image-upload"
                >
                  Change Image
                </Form.Label>
              </div>
              <Form.File
                id="image-upload"
                accept="image/*"
                className="d-none"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {/* Display any image errors */}
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Container>
        </Col>
        <Col md={7} lg={10} className=" d-md-block p-0 p-md-2 ml-5 mb-2">
          <Container
            className={`${appStyles.Content} ${styles.InputContainer}`}
          >
            <div>{textFields}</div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
};

export default PostEditForm;
