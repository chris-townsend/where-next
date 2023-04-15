// React / router
import React from "react";
import { Link } from "react-router-dom";
// React Bootstrap components
import { Container } from "react-bootstrap";

const Group = (props) => {
  // Destructure the props object
  const { id, group_name, description, members } = props;

  return (
    <Container>
      <div>
        {/* Link to the group detail page */}
        <Link to={{ pathname: `/groups/${id}`, state: { group: props } }}>
          {/* Display the group name */}
          <h3 className="text-center mt-2">{group_name}</h3>
        </Link>
        {/* Display the group description */}
        <p className="text-center">{description}</p>
        {/* Display the number of members in the group */}
        <p className="text-center">{members.length} members</p>
      </div>
    </Container>
  );
};

export default Group;
