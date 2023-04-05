import React, { useState, useEffect } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Group from "./Group";
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

  const loadMoreGroups = async () => {
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
    <div>
      <h1>Groups</h1>
      {groups.map((group) => (
        <li key={group.id}>
          <Group
            id={group.id}
            owner={group.owner}
            group_name={group.group_name}
            description={group.description}
            members={group.members}
          />
          <button onClick={() => handleDeleteGroup(group.id)}>Delete</button>
        </li>
      ))}
      {nextPageUrl && (
        <Button variant="primary" onClick={loadMoreGroups}>
          Load More Groups
        </Button>
      )}
      <Link to="/groups/create">
        <Button variant="primary">Create Group</Button>
      </Link>
    </div>
  );
};

export default GroupList;
