import React, { useState } from "react";
import styles from "./ModalWindow.module.scss";
import { IModal } from "../../types";
import { useDataContext } from "../../providers/DataContextProvider";

export const Modal: React.FC<IModal> = ({
  setModalWindow,
  modalWindow,
  data,
}) => {
  const [cryptocurrencyItem, setCryptocurrencyItem] = useState("");
  const { setUserCryptocurrency, userCryptocurrency } = useDataContext();

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    if (!cryptocurrencyItem) {
      return;
    }
    setUserCryptocurrency([
      ...userCryptocurrency,
      { name: data.name, amount: String(cryptocurrencyItem) },
    ]);
    setCryptocurrencyItem("");
    setModalWindow(false);
  };

  return (
    <div className={modalWindow ? styles.visible : styles.hidden}>
      <div className={styles.modalBlock}>
        <h2>Добавить в портфель криптовалюту {data.name}</h2>
        <form onSubmit={handleOnSubmit}>
          <input
            value={cryptocurrencyItem}
            onChange={(e) => setCryptocurrencyItem(e.target.value)}
            type="number"
            max={100}
            min={0.01}
            step={0.01}
          />
          <button type="submit">Submit</button>
        </form>
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
