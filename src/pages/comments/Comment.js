import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Media } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { PostDropdownBar } from "../../components/PostDropdownBar";
import { axiosRes } from "../../api/axiosDefaults";
import CommentEditForm from "./CommentEditForm";
// Notifications
import { NotificationManager } from "react-notifications";

import styles from "../../styles/Comment.module.css";

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    comment,
    updated_date,
    id,
    setPost,
    setComments,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
      NotificationManager.info("Comment Removed");
    } catch (err) {
      NotificationManager.error(
        "There was an issue removing your comment",
        "Error"
      );
    }
  };

  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_date}</span>
          {showEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              content={comment}
              profileImage={profile_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{comment}</p>
          )}
        </Media.Body>
        {is_owner && !showEditForm && (
          <PostDropdownBar
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </>
  );
};

export default Comment;
