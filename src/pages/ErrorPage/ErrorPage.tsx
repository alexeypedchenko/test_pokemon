import React from "react";
import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.scss";

const ErrorPage = () => {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Page not found</h1>
      <Link className={styles.link} to="/">
        Go to home page
      </Link>
    </div>
  );
};

export default ErrorPage;
