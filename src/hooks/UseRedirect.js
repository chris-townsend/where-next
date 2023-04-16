// React / router
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
// API
import axios from "axios";

export const useRedirect = (userAuthStatus) => {
  // Using the useHistory hook to handle navigation history
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        // Make a POST request to refresh the authentication token
        await axios.post("/dj-rest-auth/token/refresh/");
        // If the user is logged in, redirect to the home page
        if (userAuthStatus === "loggedIn") {
          history.push("/");
        }
      } catch (error) {
        // If there's an error refreshing the token, redirect to the home page
        if (userAuthStatus === "loggedOut") {
          history.push("/");
        }
      }
    };

    handleMount();
  }, [history, userAuthStatus]);
};

export default useRedirect;
