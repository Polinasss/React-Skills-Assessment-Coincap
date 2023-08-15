import React from "react";
import styles from "./Loading.module.scss";
import loading from '../../assets/loading.gif';

export const Loading: React.FC = () => {
  return (
    <div className={styles.loadingBlock}>
      <img className={styles.image} src={loading} alt="loading" />
    </div>
  );
};