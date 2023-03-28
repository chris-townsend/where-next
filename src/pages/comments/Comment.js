import React from "react";
import { Link } from "react-router-dom";
import { Media } from "react-bootstrap";
import Avatar from "../../components/Avatar";

const Comment = (props) => {
  const { profile_id, profile_image, owner, comment } = props;

  return (
    <div>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span>{owner}</span>
          <p>{comment}</p>
        </Media.Body>
      </Media>
    </div>
  );
};

export default Comment;
