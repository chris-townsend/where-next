import React from "react";
import { Container } from "react-bootstrap";

const Group = (props) => {
  const { id, owner, group_name, description, members } = props;

  return (
    <Container>
      <div>
        <h3 className="text-center mt-2">{group_name}</h3>
        <p className="text-center">{description}</p>
        <p className="text-center">{members.length} members</p>
      </div>
    </Container>
  );
};

export default Group;
