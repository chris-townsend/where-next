// React / router
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// API
import { axiosReq } from "../../api/axiosDefaults";
// Hooks
import useRedirect from "../../hooks/useRedirect";
// Contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// React Bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
// React infinite scroll component
import InfiniteScroll from "react-infinite-scroll-component";
// Components
import Asset from "../../components/Asset";
// Other pages
import Group from "./Group";
// Notifications
import { NotificationManager } from "react-notifications";
// Styles
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/GroupCreate.module.css";

const GroupList = () => {
  // Define state variables
  const [groups, setGroups] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  // Redirect the user if the user is signed out and trys to vist this page
  useRedirect("loggedOut");
  // Get the current user from CurrentUserContext.js
  const currentUser = useCurrentUser();

  useEffect(() => {
    // Fetch the list of groups from the API endpoint "/groups/" when the component mounts
    const fetchGroups = async () => {
      try {
        // Call the API endpoint using axiosReq.get()
        const { data } = await axiosReq.get("/groups/");
        // If there are results in the data object, update the groups state variable with the results
        if (data.results) {
          setGroups(data.results);
          setNextPageUrl(data.next);
        }
      } catch (err) {
        // For any errors, log it to the console for debugging purposes
        // console.log(err);
      }
    };
    // Call the fetchGroups function
    fetchGroups();
    // Empty dependency array [] ensures that the hook only runs once when the component mounts
  }, []);

  // Handle the deletion of a group
  const handleDeleteGroup = async (groupId) => {
    try {
      await axiosReq.delete(`/groups/${groupId}`);
      setGroups(groups.filter((group) => group.id !== groupId));
      // Show a success notification
      NotificationManager.info("Group Removed");
    } catch (err) {
      // Show an error notification
      NotificationManager.error(
        "There was an issue removing your group",
        "Error"
      );
    }
  };
  // Fetch more groups when the user scrolls to the bottom of the page
  const fetchMoreGroups = async () => {
    try {
      const { data } = await axiosReq.get(nextPageUrl);
      setGroups([...groups, ...data.results]);
      setNextPageUrl(data.next);
    } catch (err) {
      // console.log(err);
    }
  };
  // Check if the current user is the owner of a group
  const isOwner = (groupId) => {
    const group = groups.find((group) => group.id === groupId);
    return currentUser && group && currentUser.username === group.owner;
  };

  return (
    <Row className={styles.RowWidth}>
      <Container
        className={`${styles.Container} d-flex flex-column justify-content-center`}
      >
        <Col className="py-2 p-0 p-md-2" md={8} lg={12}>
          {/* Link to create a new group */}
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
          {/* Use the InfiniteScroll component to display groups */}
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
                {isOwner(group.id) ? (
                  <div className="d-flex justify-content-center">
                    <Button
                      className={`${btnStyles.Button} ${btnStyles.Green} mb-2`}
                      onClick={() => handleDeleteGroup(group.id)}
                    >
                      Delete
                    </Button>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center">
                    <Link to={`/groups/${group.id}`}>
                      <Button
                        className={`${btnStyles.Button} ${btnStyles.Green} mb-2`}
                      >
                        View Group
                      </Button>
                    </Link>
                  </div>
                )}
              </Card>
            ))}
          </InfiniteScroll>
        </Col>
      </Container>
    </Row>
  );
};

export default GroupList;
