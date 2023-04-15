// React
import React, { useState } from "react";
// API
import { axiosRes } from "../../api/axiosDefaults";
// React Bootstrap components
import { Form } from "react-bootstrap";
// Notifications
import { NotificationManager } from "react-notifications";
// Styles
import styles from "../../styles/CommentCreateUpdateForm.module.css";

const CommentEditForm = (props) => {
  // Destructure the props object
  const { id, content, setShowEditForm, setComments } = props;
  // Define state variables
  const [formContent, setFormContent] = useState(content);

  // Event handler for input change
  const handleChange = (event) => {
    setFormContent(event.target.value);
  };
  // Event handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make an API call to edit the comment by id
      await axiosRes.put(`/comments/${id}/`, {
        comment: formContent.trim(),
      });
      // Update the comments state with the updated comment
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                comment: formContent.trim(),
                updated_at: "now",
              }
            : comment;
        }),
      }));
      setShowEditForm(false);
      // Show a success notification
      NotificationManager.info("Comment Updated");
    } catch (err) {
      // Show an error notification if there was an issue updating the comment
      NotificationManager.error(
        "There was an issue updating your comment",
        "Error"
      );
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control
          className={styles.Form}
          as="textarea"
          value={formContent}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <div className="text-right">
        <button
          className={styles.Button}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          cancel
        </button>
        <button
          className={styles.Button}
          disabled={!content.trim()}
          type="submit"
        >
          save
        </button>
      </div>
    </Form>
  );
};

export default CommentEditForm;
