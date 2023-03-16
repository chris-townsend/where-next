import styles from "./App.module.css";
import NavigationBar from "./components/NavigationBar";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className={styles.App}>
      <NavigationBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Homepage</h1>} />
        </Switch>
        <Switch>
          <Route exact path="/signin" render={() => <h1>Sign In</h1>} />
        </Switch>
        <Switch>
          <Route exact path="/signup" render={() => <h1>Sign Up</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
