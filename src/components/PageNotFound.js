// React
import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
// Components
import Asset from "./Asset";
// Images
import NoResults from "../assets/images/page-not-found.webp";
// React Bootstrap components
import { Button } from "react-bootstrap";
// Styles
import styles from "../styles/PageNotFound.module.css";
import btnStyles from "../styles/Button.module.css";

const PageNotFound = () => {
  return (
    <div className={`${styles.PageNotFound} mt-2`}>
      <Asset
        src={NoResults}
        message={
          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Sorry, the page you're looking for doesn't exist
          </p>
        }
      />
      <div className="d-flex justify-content-center">
        <Link to="/">
          <Button
            className={`${btnStyles.Button} ${btnStyles.Green} text-center mb-2`}
          >
            Return to homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
