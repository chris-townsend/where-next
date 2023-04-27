// React / router
import { Route, Switch } from "react-router-dom";
// API
import "./api/axiosDefaults";
// Contexts
import { useCurrentUser } from "./contexts/CurrentUserContext";
// React Bootstrap components
import { Container } from "react-bootstrap";
// Components
import NavigationBar from "./components/NavigationBar";
import SideNavigationBar from "./components/SideNavigationBar";
// Styles
import styles from "./App.module.css";
// Auth pages
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
// Posts pages
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import PostEditForm from "./pages/posts/PostEditForm";
// Profiles pages
import ProfilePage from "./pages/profiles/ProfilePage";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import ContactCreateForm from "./pages/contact/ContactCreateForm";
import UsernameEditForm from "./pages/profiles/UsernameEditForm";
import PasswordEditForm from "./pages/profiles/PasswordEditForm";
// Groups pages
import GroupCreateForm from "./pages/groups/GroupCreateForm";
import GroupList from "./pages/groups/GroupList";
import GroupDetail from "./pages/groups/GroupDetail";
// 404 page
import PageNotFound from "./components/PageNotFound";
// Notifications
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

function App() {
  // getting the current user from the CurrentUserContext
  const currentUser = useCurrentUser();
  // getting the profile ID of the current user or setting it to an empty string if there's no user
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      {/* Rendering the NavigationBar component */}
      {currentUser ? (
        <NavigationBar loggedIn={!!currentUser} />
      ) : (
        <NavigationBar loggedIn={false} />
      )}
      {/* Rendering the SideNavigationBar component if there's a current user */}
      {currentUser ? <SideNavigationBar /> : null}
      <Container className={styles.Main}>
        {/* Rendering the NotificationContainer component */}
        <NotificationContainer />
        {/* Defining the routes using Switch and Route components */}
        <Switch>
          {/* Defining the route for the home page */}
          <Route
            exact
            path="/"
            render={() => (
              <PostsPage message="No results found. Please adjust search keyword." />
            )}
          />
          {/* Defining the route for the user's feed */}
          <Route
            exact
            path="/feed"
            render={() => (
              <PostsPage
                message="No results found. Please adjust search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          {/* Defining the route for the user's liked posts */}
          <Route
            exact
            path="/liked"
            render={() => (
              <PostsPage
                message="No results found. Please adjust search keyword or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          {/* Defining the route for the user's bookmarks */}
          <Route
            exact
            path="/bookmarks"
            render={() => (
              <PostsPage
                message="No results found. Please adjust search keyword or bookmark the post you are interested in."
                filter={`bookmark__owner__profile=${profile_id}&ordering=-bookmark__created_date&`}
              />
            )}
          />
          {/* Defining the routes for the auth pages */}
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          {/* Defining the routes for the post pages */}
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          {/* Defining the routes for the profiles pages */}
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameEditForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <PasswordEditForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          {/* Defining the routes for the groups pages */}
          <Route exact path="/groups" render={() => <GroupList />} />
          <Route
            exact
            path="/groups/create"
            render={() => <GroupCreateForm />}
          />
          <Route exact path="/groups/:id" render={() => <GroupDetail />} />
          {/* Defining the route for the contact page */}
          <Route
            exact
            path="/contact/create/"
            render={() => <ContactCreateForm />}
          />
          {/* Defining the route for the 404 page */}
          <Route render={() => <PageNotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
