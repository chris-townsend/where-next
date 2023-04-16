// API
import { axiosReq } from "../api/axiosDefaults";

// Function to fetch more data asynchronously
export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    // Update setResource state by spreading previous state and updating values
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      // Remove duplicates from the 'results' array using the 'reduce()' method
      results: data.results.reduce((acc, cur) => {
        // Check if current result already exists in accumulator array
        return acc.some((accResult) => accResult.id === cur.id)
          ? // If it does, return accumulator as is
            acc
          : // If it doesn't, add current result to accumulator
            [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {}
  // Catch any errors
};

// Function to help follow a profile
export const followHelper = (profile, clickedProfile, following_id) => {
  // If 'profile' and 'clickedProfile' have the same id
  return profile.id === clickedProfile.id
    ? // Return new object with 'followers_count' incremented and 'following_id' property updated
      {
        ...profile,
        followers_count: profile.followers_count + 1,
        following_id,
      }
    : // If the profile is the owner of the account
    profile.is_owner
    ? // Return new object with 'following_count' property incremented
      { ...profile, following_count: profile.following_count + 1 }
    : // Otherwise, return the original 'profile' object
      profile;
};
// Function to help unfollow a profile
export const unfollowHelper = (profile, clickedProfile) => {
  // If 'profile' and 'clickedProfile' have the same id
  return profile.id === clickedProfile.id
    ? {
        // Return new object with 'followers_count' property decremented and 'following_id' property set to null
        ...profile,
        followers_count: profile.followers_count - 1,
        following_id: null,
      }
    : // If the profile is the owner of the account
    profile.is_owner
    ? // Return new object with 'following_count' decremented
      { ...profile, following_count: profile.following_count - 1 }
    : // Otherwise, return the original 'profile' object
      profile;
};
