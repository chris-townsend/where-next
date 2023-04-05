import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

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
      <h1>Groups</h1>
      {group.results &&
        group.results.map((group) => (
          <div key={group.id}>
            <h2>{group.name}</h2>
            <p>{group.description}</p>
          </div>
        ))}
    </div>
  );
};

export default GroupPage;
