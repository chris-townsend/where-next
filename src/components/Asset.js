// React
import React from "react";
// Styles
import styles from "../styles/Asset.module.css";
// Images
import earthSpinner from "../assets/images/earth-spinner.gif";

// Asset function that accepts props
const Asset = ({ spinner, src, message }) => {
  return (
    <div className={`${styles.Asset} p-4`}>
      {/* If spinner prop is true, render earthSpinner */}
      {spinner && (
        <img src={earthSpinner} alt="Loading" className={styles.spinner} />
      )}
      {/* If src prop is present, render an image with message alt text */}
      {src && <img src={src} alt={message} />}
      {/* If message prop is present, render a paragraph with the message */}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Asset;
