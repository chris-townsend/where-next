import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Group from "./Group";

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
    <div>
      <h1>Group Page</h1>
      {group.results && <Group {...group.results[0]} />}
    </div>
  );
};

export default GroupPage;
