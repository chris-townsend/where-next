import React from "react";
import { Dropdown } from "react-bootstrap";
import { useHistory } from "react-router";

import styles from "../styles/PostDropdownBar.module.css";

const ProfileDropdown = React.forwardRef(({ onClick }, ref) => (
  <i
    className={`${styles.ProfileMenu} fas fa-ellipsis-h`}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

export function ProfileEditDropdown({ id }) {
  const history = useHistory();
  return (
    <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
      <Dropdown.Toggle as={ProfileDropdown} />
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => history.push(`/profiles/${id}/edit`)} aria-label="edit-profile">
          <i className="fas fa-edit" /> Edit profile
        </Dropdown.Item>
        <Dropdown.Item onClick={() => {}} aria-label="edit-username">
          <i className="far fa-id-card" />
          Change Username
        </Dropdown.Item>
        <Dropdown.Item onClick={() => {}} aria-label="edit-password">
          <i className="fas fa-key" />
          Change Password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
