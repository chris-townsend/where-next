// React / router
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
// API
import { axiosRes } from "../../api/axiosDefaults";
// Contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// React Bootstrap components
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
// Components
import { PostDropdownBar } from "../../components/PostDropdownBar";
import Avatar from "../../components/Avatar";
// Notifications
import { NotificationManager } from "react-notifications";
// Styles
import styles from "../../styles/Post.module.css";

const Post = (props) => {
  // Destructure the props object
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
    groups_count,
  } = props;
  // Setting the initial state of the errors object to an empty object
  const [errors, setErrors] = useState({});
  // Get the current user from CurrentUserContext.js
  const currentUser = useCurrentUser();
  // Using the useHistory hook to handle navigation history
  const history = useHistory();
  // Declare is_owner
  const is_owner = currentUser?.username === owner;

  // Handle deleting a post
  const handleDelete = async () => {
    try {
      // Send a request to delete a post by its ID
      await axiosRes.delete(`/posts/${id}/`);
      // Navigating to the previous page in the navigation history
      history.goBack();
      // Display a success notification
      NotificationManager.info("Post Removed");
    } catch (error) {
      setErrors(error.response?.data);
      // Display error notification
      NotificationManager.error(
        "There was an issue deleting your post",
        "Error"
      );
    }
  };

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  // Like a post functionality
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
      // Display success notification
      NotificationManager.success("Post Liked", "Success!");
    } catch (error) {
      setErrors(error.response?.data);
      // Display error notification
      NotificationManager.error("There was an issue liking the post", "Error");
    }
  };

  // Unlike a post functionality
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
      // Display a notification
      NotificationManager.info("Post Unliked");
    } catch (error) {
      setErrors(error.response?.data);
      // Display error notification
      NotificationManager.error(
        "There was an issue unliking the post",
        "Error"
      );
    }
  };

  // Bookmark a post functionality
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
      // Displaying a success notification
      NotificationManager.success("Post Saved", "Success!");
    } catch (error) {
      setErrors(error.response?.data);
      // Displaying a error notification
      NotificationManager.error("There was an issue saving the post", "Error");
    }
  };

  // Unbookmark a post functionality
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
      // Display a notification
      NotificationManager.info("Post Removed from Bookmarks");
    } catch (error) {
      setErrors(error.response?.data);
      // If error display error notification
      NotificationManager.error(
        "There was an issue removing the post",
        "Error"
      );
    }
  };
  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          {/* Link to profile id of post */}
          <Link to={`/profiles/${profile_id}`}>
            {/* Display Avatar component */}
            <Avatar src={profile_image} height={55} />
            <span className="ml-1">{owner}</span>
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_date}</span>
            {/* If the user is the owner of the post display PostDropdownBar component */}
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
          {/* If the user is the owner of the post display message */}
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
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Click to like post</Tooltip>}
            >
              <span onClick={handleLike}>
                <i className={`far fa-heart ${styles.HeartOutline}`} />
              </span>
            </OverlayTrigger>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {likes_count}
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>View comments</Tooltip>}
          >
            <Link to={`/posts/${id}`}>
              <i className="far fa-comments" />
            </Link>
          </OverlayTrigger>
          {comments_count}

          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Add a group from the groups tab</Tooltip>}
            >
              <i className="fas fa-users" />
            </OverlayTrigger>
          ) : currentUser ? (
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  Create & join groups from the{" "}
                  <span className={styles.GroupTooltip}>Groups</span> tab{" "}
                  <i class="fas fa-arrow-left"></i>{" "}
                </Tooltip>
              }
            >
              <i className="fas fa-users" />
            </OverlayTrigger>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to create & join groups</Tooltip>}
            >
              <i className="fas fa-users" />
            </OverlayTrigger>
          )}
          {groups_count}
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
              overlay={<Tooltip>Click to save post</Tooltip>}
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
