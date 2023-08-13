import React, { useState } from "react";
import styles from "./ModalWindow.module.scss";
import { IModal } from "../../types";
import { useDataContext } from "../../providers/DataContextProvider";

export const Modal: React.FC<IModal> = ({ setModalWindow, modalWindow, data }) => {
  const [cryptocurrencyItem, setCryptocurrencyItem] = useState("");
  const { setUserCryptocurrency, userCryptocurrency } = useDataContext();

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    if (!cryptocurrencyItem) {
      return;
    }
    setUserCryptocurrency([ ...userCryptocurrency, {
        name: data.name,
        amount: String(cryptocurrencyItem),
        price: data.priceUsd,
      },
    ]);
    setCryptocurrencyItem("");
    setModalWindow(false);
  };

  return (
    <div className={modalWindow ? styles.visible : styles.hidden}>
      <div className={styles.modalBlock}>
        <h2 className={styles.title}>Add cryptocurrency to portfolio - {data.name}</h2>
        <p>Cryptocurrency cost = {"$" + Number(data.priceUsd).toFixed(2)} for 1</p>
        <form onSubmit={handleOnSubmit}>
          <input
            className={styles.input}
            value={cryptocurrencyItem}
            onChange={(e) => setCryptocurrencyItem(e.target.value)}
            type="number"
            max={100}
            placeholder="0.00"
            min={0.01}
            step={0.01}
          />
          <button className={styles.submit} type="submit">Submit</button>
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
