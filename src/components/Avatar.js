// React
import React from "react";
// Styles
import styles from "../styles/Avatar.module.css";

const Avatar = ({ src, height = 45, text }) => {
  // Generate a timestamp to force the image to reload when its source changes
  const timestamp = new Date().getTime(); //
  return (
    <span>
      <img
        className={styles.Avatar}
        src={`${src}?t=${timestamp}`} // add the timestamp to the image source
        height={height}
        width={height}
        alt="avatar"
      />
      {text}
    </span>
  );
};

export default Avatar;
