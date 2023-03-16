import styles from './App.module.css'
import NavigationBar from './components/NavigationBar';
import { Container } from 'react-bootstrap';



function App() {
  return (
    <div className={styles.App}>
      < NavigationBar/>
      <Container className={styles.Main}>
        <h1>Homepage</h1>
        <h1>Sign In</h1>
        <h1>Sign Up</h1>
      </Container>
    </div>
  );
}

export default App;