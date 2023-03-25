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


function App() {
  const currentUser = useCurrentUser();
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
          <Route exact path="/" render={() => <PostsPage />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route render={() => <p> 404 Page not found</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
