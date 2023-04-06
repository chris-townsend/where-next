import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Row, Col, Card, Container } from "react-bootstrap";
import Avatar from "../../components/Avatar";

import styles from "../../styles/GroupDetail.module.css";
import Asset from "../../components/Asset";

function GroupDetail() {
  const [group, setGroup] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosReq.get(`/groups/${id}`);
        setGroup(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  if (!group) {
    return <p loader={<Asset spinner />}> Loading group information...</p>;
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
            </Card.Body>
          </Card>
        </Container>
      </Col>
    </Row>
  );
}

export default GroupDetail;
