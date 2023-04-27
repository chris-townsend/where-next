// React / router
import React from "react";
import { useHistory } from "react-router";
// React Bootstrap components
import Tooltip from "react-bootstrap/Tooltip";
import Dropdown from "react-bootstrap/Dropdown";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
// Styles
import styles from "../styles/PostDropdownBar.module.css";

// OverlayTrigger used to display 'Settings' on hover
const ProfileDropdown = React.forwardRef(({ onClick }, ref) => (
  <OverlayTrigger placement="top" overlay={<Tooltip>Settings</Tooltip>}>
    <i
      className={`${styles.ProfileMenu} fas fa-ellipsis-h`} // Dropdown menu item
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
  </OverlayTrigger>
));

// ProfileDropdownBar component that renders a dropdown bar with edit options
export function ProfileEditDropdown({ id }) {
  const history = useHistory();
  return (
    <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
      {/* Custom dropdown menu component */}
      <Dropdown.Toggle as={ProfileDropdown} />
      <Dropdown.Menu>
        {/* Edit profile dropdown item */}
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit`)}
          aria-label="edit-profile"
        >
          <i className="fas fa-edit" /> Edit profile {/* Edit icon */}
        </Dropdown.Item>
        {/* Edit username dropdown item */}
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
          aria-label="edit-username"
        >
          <i className="far fa-id-card" /> {/* Card icon */}
          Change Username
        </Dropdown.Item>
        {/* Edit password dropdown item */}
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/password`)}
          aria-label="edit-password"
        >
          <i className="fas fa-key" /> {/* Key icon */}
          Change Password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
