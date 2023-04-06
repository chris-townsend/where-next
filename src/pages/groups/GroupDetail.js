import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Card } from "react-bootstrap";

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
    return <p>Loading group information...</p>;
  }

  return (
    <Card>
      <h1>{group.group_name}</h1>
      <p>{group.description}</p>
      <h2>Members</h2>
      <ul>
        {group.members.map((member) => (
          <li key={member.id}>{member.username}</li>
        ))}
      </ul>
    </Card>
  );
}

export default GroupDetail;
