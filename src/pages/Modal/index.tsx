import React from "react";
import styles from "./ModalWindow.module.scss";
import { IModal } from "../../types";

export const Modal: React.FC<IModal> = ({ setModalWindow, modalWindow, data }) => {
    console.log(modalWindow)
  return (
    <div className={modalWindow ? styles.modal : styles.active}>
      <div className={styles.modalBlock}>
        <h2>Modal</h2>
        <p>{data.name}</p>
        <button onClick={() => setModalWindow(false)}>Close</button>
      </div>
    </div>
  );
};
