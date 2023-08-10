import React from "react";
import styles from "./ModalWindow.module.scss";
import { IModal } from "../../types";

export const Modal: React.FC<IModal> = ({ setModalWindow, modalWindow, data }) => {

  return (
    <div className={modalWindow ? styles.visible : styles.hidden}>
      <div className={styles.modalBlock}>
        <h2>Добавить в портфель криптовалюту {data.name}</h2>
        <form>
        <input type="number" max={100} min={0.01} step={0.01}/>
        <button>Submit</button>
        </form>
        <button className={styles.closeBtn} onClick={() => setModalWindow(false)}>Close</button>
      </div>
    </div>
  );
};
