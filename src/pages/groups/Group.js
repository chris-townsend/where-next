import React from "react";

const Group = (props) => {
  const { id, owner, group_name, description, members } = props;

  return (
    <div>
      <h2>{group_name}</h2>
      <p>{description}</p>
      <p>{members.length} members</p>
    </div>
  );
};

export default Group;
