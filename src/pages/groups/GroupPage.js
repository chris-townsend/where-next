import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Group from "./Group";
import { Link } from "react-router-dom";
import { Button, Row } from "react-bootstrap";

import styles from "../../styles/GroupCreate.module.css";

const GroupPage = () => {
  const [group, setGroup] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: group }] = await Promise.all([
          axiosReq.get(`/groups/${id}`),
        ]);
        setGroup({ results: [group] });
        console.log(group);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Row className={`${styles.RowWidth}`}>

    <div>
      <h1>Group Page</h1>
      <Link to="/groups/create">
        <Button variant="primary">Create Group</Button>
      </Link>
      {group.results && <Group {...group.results[0]} />}
    </div>
    </Row>
  );
};

export default GroupPage;
