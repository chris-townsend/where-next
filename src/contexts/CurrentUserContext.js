import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { response } from "msw";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext)
export const useSetCurrentUser = () => useContext(SetCurrentUserContext)

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory()

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401){
          try {
            await axios.post('/dj-rest-auth/token/refresh/')
          } catch(err){
            setCurrentUser(prevCurrentUser => {
              if (prevCurrentUser) {
                history.push('/signin')
              }
              return null
            })
          }
          return axios(err.config)
        }
        return Promise.reject(err)
      }
    )
  })

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
