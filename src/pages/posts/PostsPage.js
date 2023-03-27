import React, { useState, useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Post from "./Post";
import Asset from "../../components/Asset";
import { axiosReq } from "../../api/axiosDefaults";


import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import NoResults from "../../assets/images/no-results.png";

function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathName } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchPosts();
  }, [filter, pathName]);

  return (
    <Row className={`${styles.RowWidth}`}>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles mobile</p>
        {hasLoaded ? (
          <>
            {posts.results.length ? (
              posts.results.map((post) => (
                <Post key={post.id} {...post} setPosts={setPosts} />
              ))
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
        <p>Popular profiles for desktop</p>
      </Col>
    </Row>
  );
}

export default PostsPage;
