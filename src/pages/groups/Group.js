import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Group = (props) => {
  const { id, group_name, description, members } = props;

  return (
    <Container>
      <div>
        <Link to={{ pathname: `/groups/${id}`, state: { group: props } }}>
          <h3 className="text-center mt-2">{group_name}</h3>
        </Link>
        <p className="text-center">{description}</p>
        <p className="text-center">{members.length} members</p>
      </div>
    </Container>
  );
};

export default Group;
