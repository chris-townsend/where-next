// React / router
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom";
// Contexts
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { ProfileDataProvider } from "./contexts/ProfileDataContext";
// Styles
import "./index.css";
// Other pages
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  // Wrap the entire application in a <Router> component to enable routing
  <Router>
    {/* Wrap the app in the CurrentUserProvider to provide current user data */}
    <CurrentUserProvider>
      {/* Wrap the app in the ProfileDataProvider to provide profile data */}
      <ProfileDataProvider>
        {/* The main app component */}
        <App />
      </ProfileDataProvider>
    </CurrentUserProvider>
  </Router>,
  // Attach the app to the root element
  document.getElementById("root")
);
// Report performance metrics
reportWebVitals();
