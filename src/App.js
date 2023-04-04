import styles from "./App.module.css";
import NavigationBar from "./components/NavigationBar";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import SideNavigationBar from "./components/SideNavigationBar";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import PostEditForm from "./pages/posts/PostEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import ContactCreateForm from "./pages/contact/ContactCreateForm";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      {currentUser ? (
        <NavigationBar loggedIn={!!currentUser} />
      ) : (
        <NavigationBar loggedIn={false} />
      )}
      {currentUser ? <SideNavigationBar /> : null}
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <PostsPage message="No results found. Please adjust search keyword." />
            )}
          />
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
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route
            exact
            path="/contact/create/"
            render={() => <ContactCreateForm />}
          />
          <Route render={() => <p> 404 Page not found</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
