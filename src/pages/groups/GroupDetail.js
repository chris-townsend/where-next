import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import styles from "../../styles/GroupDetail.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";

function GroupDetail() {
  const [group, setGroup] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const { id } = useParams();

  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: group } = await axiosReq.get(`/groups/${id}`);
        setGroup(group);
        setIsJoined(group.is_member);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  const handleJoinGroup = async (groupId) => {
    try {
      console.log("Before axiosReq.post");
      await axiosReq.post(`/groups/${groupId}/join`, {});
      const newMember = {
        id: currentUser.id,
        username: currentUser.username,
        avatar: currentUser.avatar,
      };
      const updatedMembers = [...group.members, newMember];
      console.log(updatedMembers);
      setGroup((prevGroup) => ({
        ...prevGroup,
        members: updatedMembers,
        members_count: prevGroup.members_count + 1,
        is_member: true,
      }));
      setIsJoined(true);
      console.log(group)
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleLeaveGroup = async () => {
    try {
      await axiosReq.delete(`/groups/${id}/leave`);
      setIsJoined(false);
      setGroup((prevGroup) => ({
        ...prevGroup,
        members: prevGroup.members.filter(
          (member) => member.id !== currentUser.id
        ),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  if (!group) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Asset spinner />
      </div>
    );
  }

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
                  {group.group_name}
                </h1>
                <hr className={`${styles.Hr} w-25 mx-auto mb-4`} />
              </div>
              <div>
                <p className={`${styles.GroupDetailDescription} text-center`}>
                  <h2 className="text-center mt-1">Group Description</h2>
                  {group.description}
                </p>
              </div>
              <h2>Members</h2>
              {group.members.length > 0 ? (
                <div className="d-flex justify-content-center">
                  {group.members.map((member) => (
                    <Avatar
                      key={member.id}
                      src={member.avatar}
                      height={45}
                      text={member.username}
                    />
                  ))}
                </div>
              ) : (
                <p>No members yet.</p>
              )}
              <div className="mt-3">
                {isJoined ? (
                  <Button variant="danger" onClick={handleLeaveGroup}>
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
              </div>
            </Card.Body>
          </Card>
        </Container>
      </Col>
    </Row>
  );
}

export default GroupDetail;
