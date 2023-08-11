import React from "react";
import styles from "./Loading.module.scss";

export const Loading: React.FC = () => {
  return (
    <div className={styles.loadingBlock}>
      <h2>Loading...</h2>
    </div>
  );
};
