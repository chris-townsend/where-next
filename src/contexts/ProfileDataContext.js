// React / router
import { createContext, useContext, useEffect, useState } from "react";
// API
import { axiosReq, axiosRes } from "../api/axiosDefaults";
// Contexts
import { useCurrentUser } from "./CurrentUserContext";
// Utils
import { followHelper, unfollowHelper } from "../utils/utils";
// Notifications
import { NotificationManager } from "react-notifications";

// Create context for profile data & export
export const ProfileDataContext = createContext();
// Create context for updating profile data & export
export const SetProfileDataContext = createContext();

// Custom hooks for accessing the context values
export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

// Component for providing profile data
export const ProfileDataProvider = ({ children }) => {
  // Initialize state for profile data
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] }, // initial state for the user's own profile page
    mostFollowed: { results: [] }, // initial state for the list of popular profiles
  });

  // Get the current user from the CurrentUserContext
  const currentUser = useCurrentUser();

  // Function to handle following a profile
  const handleFollow = async (clickedProfile) => {
    try {
      // Send a POST request to create a new follower relationship
      const { data } = await axiosRes.post("/followers/", {
        followed: clickedProfile.id,
      });
      // Update the pageProfile and popularProfiles lists with the new follower data
      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
        mostFollowed: {
          ...prevState.mostFollowed,
          results: prevState.mostFollowed.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
      }));
      // Show a success notification
      NotificationManager.success("Following user", "Success!");
    } catch (err) {
      // Show an error notification
      NotificationManager.error(
        "There was an issue following this user",
        "Error"
      );
    }
  };

  // Function to handle unfollowing a profile
  const handleUnfollow = async (clickedProfile) => {
    try {
      // Send a DELETE request to delete the follower relationship
      await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);
      // Update the pageProfile and popularProfiles lists with the removed follower data
      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
        mostFollowed: {
          ...prevState.mostFollowed,
          results: prevState.mostFollowed.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
      }));
      // Show an info notification
      NotificationManager.info("Unfollowed user");
    } catch (err) {
      // Show an error notification
      NotificationManager.error(
        "There was an issue unfollowing this user",
        "Error"
      );
    }
  };
  // Fetch the list of popular profiles on mount and whenever the currentUser changes
  useEffect(() => {
    const handleMount = async () => {
      // Send a GET request to fetch the list of popular profiles
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-followers_count"
        );
        // Update the popularProfiles state with the fetched data
        setProfileData((prevState) => ({
          ...prevState,
          mostFollowed: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [currentUser]);

  // Render context providers with current profile data and functions to update it
  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider
        value={{ setProfileData, handleFollow, handleUnfollow }}
      >
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
