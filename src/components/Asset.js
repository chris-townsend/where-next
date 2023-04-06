import React from "react";
import styles from "../styles/Asset.module.css";
import earthSpinner from "../assets/images/earth-spinner.gif";

const Asset = ({ spinner, src, message }) => {
  return (
    <div className={`${styles.Asset} p-4`}>
      {spinner && (
        <img src={earthSpinner} alt="Loading" className={styles.spinner} />
      )}
      {src && <img src={src} alt={message} />}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Asset;
