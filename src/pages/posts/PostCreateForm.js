// React / router
import React, { useState, useRef } from "react";
import { useHistory } from "react-router";
// API
import { axiosReq } from "../../api/axiosDefaults";
// Hooks
import useRedirect from "../../hooks/UseRedirect";
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
// Components
import Asset from "../../components/Asset";
// Images
import Upload from "../../assets/images/upload.png";
// Notifications
import { NotificationManager } from "react-notifications";
// Styles
import styles from "../../styles/PostCreateUpdate.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

const PostCreateForm = () => {
  // Using the useRedirect hook to redirect if the user is logged out
  useRedirect("loggedOut");
  // Setting the initial state of the errors object to an empty object
  const [errors, setErrors] = useState({});
  // Setting the initial state of the postData object with empty strings for the title, about & image
  const [postData, setPostData] = useState({
    title: "",
    about: "",
    image: "",
  });
  // Destructuring the values of title, about and image from the postData object
  const { title, about, image } = postData;

  const imageInput = useRef(null);
  // Using the useHistory hook to handle navigation history
  const history = useHistory();

  // Handling input changes and updating the postData object
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };
  // Functionality to change the image
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };
  // Handling the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("about", about);
    formData.append("image", imageInput.current.files[0]);
    // Append the data and request the post request from the API
    try {
      const { data } = await axiosReq.post("/posts/", formData);
      history.push(`/posts/${data.id}`);
      // Display success notification
      NotificationManager.success("Post Created", "Success!");
    } catch (error) {
      setErrors(error.response?.data);
      // Display error notification
      NotificationManager.error("There was an issue adding your post", "Error");
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label htmlFor="title">Title</Form.Label>
        <Form.Control
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {/* Displaying any title errors */}
      {errors.title?.map((message, idx) => (
        <Alert key={idx} variant="warning">
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label htmlFor="content">Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          id="content"
          name="about"
          value={about}
          onChange={handleChange}
        />
      </Form.Group>
      {/* Displaying any about errors */}
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
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={10} lg={11}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
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
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset src={Upload} message="Click to upload an image" />
                </Form.Label>
              )}
              <Form.File
                id="image-upload"
                accept="image/*"
                className="d-none"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {/* Displaying any errors with the image */}
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <div>{textFields}</div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
};

export default PostCreateForm;
