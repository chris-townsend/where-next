// React
import React from "react";
// React Bootstrap components
import { Dropdown } from "react-bootstrap";
// Styles
import styles from "../styles/PostDropdownBar.module.css";

const DropdownMenu = React.forwardRef(({ onClick }, ref) => (
  // Dropdown menu icon
  <i
    className={`${styles.Menu} fas fa-ellipsis-v `}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));
// PostDropdownBar component that renders a dropdown bar with edit and delete options
export const PostDropdownBar = ({ handleDelete, handleEdit }) => {
  return (
    // Bootstrap dropdown component with left alignment
    <Dropdown className="ml-3" drop="left">
      {/* Custom dropdown menu component */}
      <Dropdown.Toggle as={DropdownMenu} />
      {/* Dropdown menu items */}
      <Dropdown.Menu
        className="text-center"
        popperConfig={{ strategy: "fixed" }}
      >
        {/* Edit post dropdown item */}
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleEdit}
          aria-label="edit"
        >
          <i className="fas fa-edit" /> {/* Edit icon */}
        </Dropdown.Item>
        {/* Delete post dropdown item */}
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleDelete}
          aria-label="delete"
        >
          <i className="fas fa-trash-alt" /> {/* Trash icon */}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
