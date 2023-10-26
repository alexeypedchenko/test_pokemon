import React from "react";
import Image from "../../assets/pokemon-logo.png";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <img className={styles.img} src={Image} alt="" />
    </div>
  );
};

export default Header;
