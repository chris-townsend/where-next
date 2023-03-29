import React from "react";
import { Link } from "react-router-dom";
import { Media } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { PostDropdownBar } from "../../components/PostDropdownBar";

import styles from "../../styles/Comment.module.css";

const Comment = (props) => {
  const { profile_id, profile_image, owner, comment, updated_date } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <div>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.User}>{owner}</span>
          <span className={styles.Date}>{updated_date}</span>
          <p>{comment}</p>
        </Media.Body>
        {is_owner && (
          <PostDropdownBar handleEdit={() => {}} handleDelete={() => {}} />
        )}
      </Media>
    </div>
  );
};

export default Comment;
