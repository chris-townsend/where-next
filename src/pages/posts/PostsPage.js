// React / router
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// API
import { axiosReq } from "../../api/axiosDefaults";
// Contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// Utils
import { fetchMoreData } from "../../utils/utils";
// React Bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
// React components
import InfiniteScroll from "react-infinite-scroll-component";
// Components
import Asset from "../../components/Asset";
// Other pages
import Post from "./Post";
import MostFollowed from "../profiles/MostFollowed";
// Styles
import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
// Images
import NoResults from "../../assets/images/no-results.png";

// State variables
const PostsPage = ({ message, filter = "" }) => {
  const [posts, setPosts] = useState({ results: [] });
  const { pathname } = useLocation();
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const [query, setQuery] = useState("");

  useEffect(() => {
    // Setup async function to fetch posts
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        // Set the posts state variable to the returned data
        setPosts(data);
        // Set hasLoaded state variable to true
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    setHasLoaded(false);
    // Add timer to delay the fetchPosts function by 1 second
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);
    // Clean up function for the useEffect hook
    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]);

  return (
    <Row className={`${styles.RowWidth}`}>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <MostFollowed mobile />
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchInput}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search for posts, profiles and more.."
          />
        </Form>
        {/* // If posts have loaded and there are results, render infinite scroll component with Post page */}
        {hasLoaded ? (
          <>
            {posts.results.length ? (
              <InfiniteScroll
                children={posts.results.map((post) => (
                  <Post key={post.id} {...post} setPosts={setPosts} />
                ))}
                dataLength={posts.results.length}
                loader={<Asset spinner />}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        {/* Render MostFollowed page */}
        <MostFollowed />
        <br />
      </Col>
    </Row>
  );
};

export default PostsPage;
