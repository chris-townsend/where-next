import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import styles from "../../styles/GroupDetail.module.css";
import btnStyles from "../../styles/Button.module.css";

const GroupDetail = () => {
  const [group, setGroup] = useState({ members: [], is_member: false });
  const [isJoined, setIsJoined] = useState(false);
  const { id } = useParams();

  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosReq.get(`/groups/${id}`);
        setGroup({ ...data, members: data.members, is_member: data.is_member });
        setIsJoined(data.is_member);
        console.log({ ...data, members: data.members });
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  const handleJoinGroup = async (id) => {
    try {
      await axiosReq.post(`/groups/${id}/join`);
      setGroup((prevGroup) => ({
        ...prevGroup,
        members: [...prevGroup.members, currentUser],
        is_member: true,
      }));
      setIsJoined(true);
    } catch (err) {
      console.log(err);
    }
  };

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
    } catch (err) {
      console.log(err);
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
                  {group.group_name}
                </h1>
                <hr className={`${styles.Hr} w-25 mx-auto mb-4`} />
              </div>
              <div>
                <h2 className="text-center mt-1">Group Description</h2>
                <p className={`${styles.GroupDetailDescription} text-center`}>
                  {group.description}
                </p>
              </div>
              <h2>Members</h2>
              {group.members.length > 0 ? (
                <div className="d-flex justify-content-center">
                  {group.members.map((member) => (
                    <Avatar
                      src={member.image}
                      id={member.id}
                      user={member.user}
                      height={45}
                      alt={member.username}
                      key={member.id}
                    />
                  ))}
                </div>
              ) : (
                <p>No members yet.</p>
              )}
              <div className="mt-3">
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
