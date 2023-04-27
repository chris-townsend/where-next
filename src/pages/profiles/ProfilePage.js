// React / router
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
// API
import { axiosReq } from "../../api/axiosDefaults";
// Contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
// Utils
import { fetchMoreData } from "../../utils/utils";
// React Bootstrap components
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// React components
import InfiniteScroll from "react-infinite-scroll-component";
// Components
import { ProfileEditDropdown } from "../../components/ProfileDropdownBar";
import Asset from "../../components/Asset";
// Other pages
import MostFollowed from "./MostFollowed";
import Post from "../posts/Post";
// Images
import NoResults from "../../assets/images/no-results.png";
// Styles
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/ProfilePage.module.css";

function ProfilePage() {
  // Set state variables
  const [hasLoaded, setHasLoaded] = useState(false);
  // Get the current user from CurrentUserContext.js
  const currentUser = useCurrentUser();
  // get id from the URL parameter
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  // Determine if the current user is the owner of the profile
  const is_owner = currentUser?.username === profile?.owner;
  const [profilePosts, setProfilePosts] = useState({ results: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profilePosts }] =
          await Promise.all([
            // Retrieve the profile id & posts created by the user from the API
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/posts/?owner__profile=${id}`),
          ]);
        // Update state
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfilePosts(profilePosts);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      {/* If the user is the owner of the profile display ProfileEditDropdown component */}
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      <Row className="px-3 text-center">
        <Col lg={12}>
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
            alt="profile image"
          />
        </Col>

        <Col lg={12}>
          <h3 className="m-2 mt-4">{profile?.owner}</h3>
          <Row className="justify-content-center no-gutters mt-3">
            <Col xs={3} className="my-2">
              {/* Owner's post count */}
              <div>{profile?.posts_count}</div>
              <div>posts</div>
            </Col>
            <Col xs={3} className="my-2">
              {/* Owner's followers count */}
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={3} className="my-2">
              {/* Owner's following count */}
              <div>{profile?.following_count}</div>
              <div>following</div>
            </Col>
          </Row>
        </Col>
        <br />
        {/* Follow/unfollow buttons */}
        <Col lg={12} className="text-lg-center align-items-center mt-2">
          {/* Show the button only if the current user is not the owner */}
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
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
        </Col>
        {/* Display Profile, if no information has been added, display icon */}
        {profile && (
          <Col lg={12} className="p-3 mt-1">
            <Col className="text-center">
              <hr />
              <h3 className="mb-2">Personal Information</h3>
              <hr />
            </Col>
            <div className={styles.ProfileTextContent}>
              <span>Name:</span>
              {profile.hasOwnProperty("name") && profile.name ? (
                profile.name
              ) : (
                <i className="fa-solid fa-ban" />
              )}
            </div>
            <div className={styles.ProfileTextContent}>
              <span>Date of Birth:</span>
              {profile.date_of_birth === "" ? (
                <i className="fa-solid fa-ban" />
              ) : (
                profile.date_of_birth
              )}
            </div>
            <div className={styles.ProfileTextContent}>
              <span>Location:</span>
              {profile.location === "" ? (
                <i className="fa-solid fa-ban" />
              ) : (
                profile?.location
              )}
            </div>
            <div className={styles.ProfileTextContent}>
              <span>Favourite Location:</span>
              {profile.favourite_location === "" ? (
                <i className="fa-solid fa-ban" />
              ) : (
                profile?.favourite_location
              )}
            </div>
            <div
              className={`${styles.ProfileTextContent} ${styles.ProfileBioContent}`}
            >
              <span>Bio:</span>
              {profile.hasOwnProperty("bio") && profile.bio ? (
                profile.bio
              ) : (
                <i className="fa-solid fa-ban" />
              )}
            </div>
          </Col>
        )}
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <h4 className="text-center">{profile?.owner}'s posts</h4>
      <hr />
      {/* Display total posts from the logged in user using InfiniteScroll component */}
      {profilePosts.results.length ? (
        <InfiniteScroll
          children={profilePosts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setProfilePosts} />
          ))}
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted yet.`}
        />
      )}
    </>
  );

  return (
    <Row className={`${styles.RowWidth}`}>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <MostFollowed mobile />
        <Container className={appStyles.ProfileContent}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block mt-2 p-lg-2">
        <MostFollowed />
      </Col>
    </Row>
  );
}

export default ProfilePage;
