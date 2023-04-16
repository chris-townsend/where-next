// React / router
import React from "react";
import { Link } from "react-router-dom";
// Contexts
import { useSetProfileData } from "../../contexts/ProfileDataContext";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// React Bootstrap components
import { Button } from "react-bootstrap";
// Components
import Avatar from "../../components/Avatar";
// Styles
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/Profile.module.css";

const Profile = (props) => {
  // Destructure props object
  const { profile, mobile } = props;
  const { id, following_id, owner, image } = profile;
  // Get current user from context
  const currentUser = useCurrentUser();
  // Determine if current user is the owner of this profile
  const is_owner = currentUser?.username === owner;
  // Get follow/unfollow functions from context
  const { handleFollow, handleUnfollow } = useSetProfileData();

  return (
    <div
      className={`my-3 d-flex align-items-center" ${mobile && "flex-column"}`}
    >
      <div>
        {/* Link to the profile page */}
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={40} alt={owner.profile} />
        </Link>
      </div>

      <div className={`mx-2 mt-1 ${styles.WordBreak}`}>
        {/* Owner's username */}
        <strong>{owner}</strong>
      </div>

      {/* Follow/unfollow buttons */}
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {/* Show the button only if the current user is not the owner */}
        {!mobile &&
          currentUser &&
          !is_owner &&
          (following_id ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
              onClick={() => handleUnfollow(profile)}
            >
              unfollow
            </Button>
          ) : (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Black}`}
              onClick={() => handleFollow(profile)}
            >
              follow
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Profile;
