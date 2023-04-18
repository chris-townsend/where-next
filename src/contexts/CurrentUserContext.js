// React / router
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
// API
import axios from "axios";
import { axiosRes, axiosReq } from "../api/axiosDefaults";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

// Create context for current user & export
export const CurrentUserContext = createContext();
// Create context for updating current user & export
export const SetCurrentUserContext = createContext();

// Custom hooks for accessing the context values
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

// Component for providing the current user context to its children
export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  // Function for fetching the current user on mount
  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      console.log(err);
    }
  };
  // Fetch the current user on mount
  useEffect(() => {
    handleMount();
  }, []);

  // Memoized function for adding interceptors to axios requests and responses
  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            // If the user was previously logged in, redirect to sign in page
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
            // Remove local storage timestamp
            removeTokenTimestamp();
            return config;
          }
        }

        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            // If the user was previously logged in, redirect to sign in page
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
            // Remove local storage timestamp
            removeTokenTimestamp();
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [history]);
  // Provide the currentUser and function for updating it to the child components
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
