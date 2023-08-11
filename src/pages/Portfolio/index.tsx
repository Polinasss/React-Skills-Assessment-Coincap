import React from "react";
import { useDataContext } from "../../providers/DataContextProvider";
import { IPortfolio, IProfileDataObject } from "../../types";
import styles from "./ModalWindow.module.scss";

export const Portfolio: React.FC<IPortfolio> = ({
  setModalWindow,
  modalWindow,
}) => {
  const { userCryptocurrency } = useDataContext();

  return (
    <div className={modalWindow ? styles.visible : styles.hidden}>
      <div className={styles.modalBlock}>
        <ul>
          {userCryptocurrency.map((obj: IProfileDataObject) => {
            return (
              <li>
                {obj.name} : {obj.amount}
              </li>
            );
          })}
        </ul>
        <button
          className={styles.closeBtn}
          onClick={() => setModalWindow(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};
