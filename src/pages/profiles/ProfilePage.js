import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { Col, Row, Container, Button, Image } from "react-bootstrap";
import Asset from "../../components/Asset";
import PopularProfiles from "./PopularProfiles";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { fetchMoreData } from "../../utils/utils";
import Post from "../posts/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import NoResults from "../../assets/images/no-results.png";
import { ProfileEditDropdown } from "../../components/ProfileDropdownBar";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/ProfilePage.module.css";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;
  const [profilePosts, setProfilePosts] = useState({ results: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profilePosts }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/posts/?owner__profile=${id}`),
          ]);
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
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      <Row className="px-3 text-center">
        <Col lg={12}>
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>

        <Col lg={12}>
          <h3 className="m-2 mt-4">{profile?.owner}</h3>
          <Row className="justify-content-center no-gutters mt-3">
            <Col xs={3} className="my-2">
              <div>{profile?.posts_count}</div>
              <div>posts</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.following_count}</div>
              <div>following</div>
            </Col>
          </Row>
        </Col>
        <br />
        <Col lg={12} className="text-lg-center align-items-center mt-2">
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
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
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
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;
