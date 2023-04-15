// React / router
import React, { useState } from "react";
import { Link } from "react-router-dom";
// API
import { axiosRes } from "../../api/axiosDefaults";
// React Bootstrap components
import { Form, InputGroup } from "react-bootstrap";
// Components
import Avatar from "../../components/Avatar";
// Notifications
import { NotificationManager } from "react-notifications";
// Styles
import styles from "../../styles/CommentCreateUpdateForm.module.css";

const CommentCreateForm = (props) => {
  // Destructure the props object
  const { post, setPost, setComments, profileImage, profile_id } = props;
  // Define state variables
  const [content, setContent] = useState("");

  // Event handler for input change
  const handleChange = (event) => {
    setContent(event.target.value);
  };
  // Event handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        comment: content,
        post,
      });
      // Update the comments state by adding the comment to the array
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      setContent("");
      // Show a success notification
      NotificationManager.success("Comment Added", "Success!");
    } catch (err) {
      // Show an error notification if there was an issue creating the comment
      NotificationManager.error(
        "There was an issue adding your comment",
        "Error"
      );
    }
  };
  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          {/* Link to the user's profile */}
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <Form.Control
            className={styles.Form}
            placeholder="comment on a post.."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        post
      </button>
    </Form>
  );
};

export default CommentCreateForm;
