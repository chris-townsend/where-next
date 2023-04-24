// React / router
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// API
import { axiosReq } from "../../api/axiosDefaults";
// Hooks
import useRedirect from "../../hooks/useRedirect";
// Contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// React Bootstrap components
import { Row, Col, Card, Container, Button } from "react-bootstrap";
// Components
import Avatar from "../../components/Avatar";
// Notifications
import { NotificationManager } from "react-notifications";
// Styles
import styles from "../../styles/GroupDetail.module.css";
import btnStyles from "../../styles/Button.module.css";

const GroupDetail = () => {
  // Define state variables
  const [group, setGroup] = useState({ members: [], is_member: false });
  const [isJoined, setIsJoined] = useState(false);
  // Getting the group ID from the URL using useParams hook from React Router
  const { id } = useParams();
  // Redirect the user if the user is signed out and trys to vist this page
  useRedirect("loggedOut");
  // Getting the current user from the CurrentUserContext
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching the group data from the API using Axios and setting state accordingly
        const { data } = await axiosReq.get(`/groups/${id}`);
        setGroup({ ...data, members: data.members, is_member: data.is_member });
        // checks if the user is a member of the group and update the state accordingly
        setIsJoined(data.is_member);
      } catch (err) {
        // For any errors, log it to the console for debugging purposes
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  // Handling the joining of a group
  const handleJoinGroup = async (id) => {
    try {
      await axiosReq.post(`/groups/${id}/join`);
      setGroup((prevGroup) => ({
        ...prevGroup,
        members: [...prevGroup.members, currentUser],
        is_member: true,
      }));
      setIsJoined(true);
      // Notification for success
      NotificationManager.success(
        "You are now a member of the group",
        "Success!"
      );
    } catch (err) {
      // Notification for error
      NotificationManager.error(
        "There was an issue joining the group",
        "Error"
      );
    }
  };

  // Handle leaving a group
  const handleLeaveGroup = async (id) => {
    try {
      await axiosReq.delete(`/groups/${id}/leave/`);
      setGroup((prevGroup) => ({
        ...prevGroup,
        members: prevGroup.members.filter(
          (member) => member.id !== currentUser.id
        ),
        is_member: false,
      }));
      setIsJoined(false);
      // Notification for leaving the group
      NotificationManager.info("You are no longer a member of the group");
    } catch (err) {
      // Notification for error
      NotificationManager.error(
        "There was an issue leaving the group",
        "Error"
      );
    }
  };

  return (
    <Row className={`${styles.RowWidth} text-center`}>
      <Col className="py-2 p-0 p-lg-2" lg={12}>
        <Container
          className={`d-flex flex-column ${styles.GroupDetailContainer}`}
        >
          <Card>
            <Card.Body>
              <div>
                <h1
                  className={`${styles.GroupDetailHeader} text-center mt-2 mb-1 display-4`}
                >
                  {/* Display group name*/}
                  {group.group_name}
                </h1>
                <hr className={`${styles.Hr} w-25 mx-auto mb-4`} />
              </div>
              <div>
                <h2 className="text-center mt-1">Group Description</h2>
                <p className={`${styles.GroupDetailDescription} text-center`}>
                  {/* Display group description */}
                  {group.description}
                </p>
              </div>
              <h2>Members</h2>
              {/* Map over the members array and display the members in the group using the Avatar component*/}
              {group.members.length > 0 ? (
                <div className="d-flex justify-content-center">
                  {group.members.map((member) => (
                    <Avatar
                      src={member.image}
                      id={member.id}
                      user={member.user}
                      height={45}
                      alt={member.username}
                      key={`avatar-${member.id}`}
                    />
                  ))}
                </div>
              ) : (
                <p>No members yet.</p>
              )}
              <div className="mt-3">
                {/* Display if its the current user and isJoined used for the state of button */}
                {currentUser && (
                  <>
                    {isJoined ? (
                      <Button
                        className={`${btnStyles.Button} ${btnStyles.Green} mb-2`}
                        onClick={() => handleLeaveGroup(group.id)}
                      >
                        Leave Group
                      </Button>
                    ) : (
                      <Button
                        className={`${btnStyles.Button} ${btnStyles.Green} mb-2`}
                        onClick={() => handleJoinGroup(group.id)}
                      >
                        Join
                      </Button>
                    )}
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        </Container>
      </Col>
    </Row>
  );
};

export default GroupDetail;
