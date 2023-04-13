import React from "react";
import styles from "../styles/Avatar.module.css";

const Avatar = ({ src, height = 45, text }) => {
  const timestamp = new Date().getTime(); //
  return (
    <span>
      <img
        className={styles.Avatar}
        src={`${src}?t=${timestamp}`}
        height={height}
        width={height}
        alt="avatar"
      />
      {text}
    </span>
  );
};

export default Avatar;
