// React / router
import React from "react";
// Contexts
import { useProfileData } from "../../contexts/ProfileDataContext";
// React Bootstrap components
import { Container } from "react-bootstrap";
// Components
import Asset from "../../components/Asset";
// Other pages
import Profile from "./Profile";
// Styles
import appStyles from "../../App.module.css";
import styles from "../../styles/PopularProfiles.module.css";

const PopularProfiles = ({ mobile }) => {
  // Get popular profiles data from contexts
  const { popularProfiles } = useProfileData();

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-md-none text-center mb-3"
      }`}
    >
      {/* Check if the popular profiles data has been loaded */}
      {popularProfiles.results.length ? (
        <>
          <div className={`text-center mt-1 ${styles.PopularProfilesTitle}`}>
            {" "}
            Most followed
          </div>
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
