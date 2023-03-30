import React from "react";
import { Container } from "react-bootstrap";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/PopularProfiles.module.css"

const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-md-none text-center mb-3"
      }`}
    >
      {popularProfiles.results.length ? (
        <>
          <div className={`text-center mt-1 ${styles.PopularProfilesTitle}`}> Most followed</div>
          <hr className={styles.Hr} />
          {mobile ? (
            <div className="d-flex justify-content-around">
              {popularProfiles.results.slice(0, 4).map((profile) => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            popularProfiles.results.map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularProfiles;
