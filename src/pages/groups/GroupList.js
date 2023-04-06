import React, { useState, useEffect } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Link } from "react-router-dom";
import { Button, Row, Col, Container, Card } from "react-bootstrap";
import Group from "./Group";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";

import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/GroupCreate.module.css";

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const { data } = await axiosReq.get("/groups/");
        console.log(data);
        if (data.results) {
          setGroups(data.results);
          setNextPageUrl(data.next);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchGroups();
  }, []);

  const handleDeleteGroup = async (groupId) => {
    try {
      await axiosReq.delete(`/groups/${groupId}`);
      setGroups(groups.filter((group) => group.id !== groupId));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMoreGroups = async () => {
    try {
      const { data } = await axiosReq.get(nextPageUrl);
      console.log(data);
      setGroups([...groups, ...data.results]);
      setNextPageUrl(data.next);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Row className={styles.RowWidth}>
      <Container
        className={`${styles.Container} d-flex flex-column justify-content-center`}
      >
        <Col className="py-2 p-0 p-md-2" md={5} lg={12}>
          <Link to="/groups/create">
            <Button
              className={`ml-4 ${styles.Button} ${btnStyles.Green}`}
              variant="primary"
            >
              Create Group
            </Button>
          </Link>
          <h1 className={`text-center display-4 ${styles.GroupHeader}`}>
            Groups
          </h1>
          <hr className={`${styles.Hr} w-25 mx-auto mb-4`} />
          <br />
          <InfiniteScroll
            dataLength={groups.length}
            next={fetchMoreGroups}
            hasMore={nextPageUrl !== null}
            loader={<Asset spinner />}
          >
            {groups.map((group) => (
              <Card className="pb-1 mb-2" key={group.id}>
                <Group
                  id={group.id}
                  owner={group.owner}
                  group_name={group.group_name}
                  description={group.description}
                  members={group.members}
                />
                <Button
                  className={`${btnStyles.Button} ${btnStyles.Green} mb-2`}
                  onClick={() => handleDeleteGroup(group.id)}
                >
                  Delete
                </Button>
              </Card>
            ))}
          </InfiniteScroll>
        </Col>
      </Container>
    </Row>
  );
};

export default GroupList;
