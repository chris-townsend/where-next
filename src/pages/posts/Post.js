import React from "react";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";

import styles from "../../styles/Post.module.css";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    title,
    about,
    image,
    updated_date,
    postPage,
    like_id,
    bookmark_id,
    bookmark_count,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <Card className={styles.post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_date}</span>
            {is_owner && postPage && "..."}
          </div>
        </Media>
        <hr className={styles.PostHr} />
      </Card.Body>

      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} className={styles.postImage} />
      </Link>
      <Card.Body>
        {title && (
          <Card.Title
            className={`${styles.CardTitle} text-center align-items-center`}
          >
            {title}
          </Card.Title>
        )}
        <hr />
        {about && (
          <Card.Text
            className={`${styles.CardText} text-center align-items-center`}
          >
            {about}
          </Card.Text>
        )}

        <div className={`${styles.PostBar} text-center align-items-center`}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Sorry, you can't like your own post!</Tooltip>}
            >
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </OverlayTrigger>
          ) : like_id ? (
            <span className={styles.Heart} onClick={() => {}}>
              <i className="fas fa-heart" />
            </span>
          ) : currentUser ? (
            <span onClick={() => {}}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {likes_count}
          <Link to={`/posts/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't bookmark your own post</Tooltip>}
            >
              <i className="far fa-bookmark" />
            </OverlayTrigger>
          ) : bookmark_id ? (
            <span>
              <i className="fas fa-bookmark" />
            </span>
          ) : currentUser ? (
            <span>
              <i className="far fa-bookmark" />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Please log in to bookmark posts!</Tooltip>}
            >
              <i className="far fa-bookmark" />
            </OverlayTrigger>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;
