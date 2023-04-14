import React from "react";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { PostDropdownBar } from "../../components/PostDropdownBar";
import { useHistory } from "react-router-dom";

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
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleBookmark = async () => {
    try {
      const { data } = await axiosRes.post("/bookmarks/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? {
                ...post,
                bookmark_count: post.bookmark_count + 1,
                bookmark_id: data.id,
              }
            : post;
        }),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnbookmark = async () => {
    try {
      await axiosRes.delete(`/bookmarks/${bookmark_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? {
                ...post,
                bookmark_count: post.bookmark_count - 1,
                bookmark_id: null,
              }
            : post;
        }),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            <span className="ml-1">{owner}</span>
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_date}</span>
            {is_owner && postPage && (
              <PostDropdownBar
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            )}
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
            <span className={styles.Heart} onClick={handleUnlike}>
              <i className="fas fa-heart" />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
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
            <span className={styles.BookmarkIcon} onClick={handleUnbookmark}>
              <i className="fas fa-bookmark" />
            </span>
          ) : currentUser ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>click to save post</Tooltip>}
            >
              <span className={styles.BookmarkIcon} onClick={handleBookmark}>
                <i className="far fa-bookmark" />
              </span>
            </OverlayTrigger>
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
