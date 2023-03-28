import React, { useState, useRef, useEffect } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Image,
  Alert,
} from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory, useParams } from "react-router-dom";

import styles from "../../styles/PostCreateUpdate.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

const PostEditForm = () => {
  const [errors, setErrors] = useState({});
  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        const { title, about, image, is_owner } = data;

        is_owner ? setPostData({ title, about, image }) : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [history, id]);

  const [postData, setPostData] = useState({
    title: "",
    about: "",
    image: "",
  });
  const { title, about, image } = postData;

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("about", about);

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/posts/${id}/`, formData);
      history.push(`/posts/${id}`);
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
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
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
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
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
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Container>
        </Col>
        <Col md={8} lg={3} className="d-none d-md-block p-0 p-md-2 ml-5">
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
