import React, { useState } from "react";
import { IModal, IProfileDataObject } from "../../types";
import { useDataContext } from "../../contexts/DataContextProvider";
import { useTotalCostContext } from "../../contexts/PriceContextProvider";
import styles from "./ModalWindow.module.scss";

export const Modal: React.FC<IModal> = ({ setModalWindow, modalWindow, data }) => {
  const [cryptocurrencyItem, setCryptocurrencyItem] = useState("");
  const { setUserCryptocurrency, userCryptocurrency } = useDataContext();
  const { setNumberOfRendering, setIsDeleteOrPlus } = useTotalCostContext();
  
  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    if (!cryptocurrencyItem) {
      return;
    }
    const arr = [...userCryptocurrency];
    const res: IProfileDataObject[] = arr.filter((obj) => obj.name === data.name);
    if(res.length === 1) {
      const indexOfItem = arr.findIndex((obj) => obj.name === data.name);
      arr[indexOfItem].price = String(Number(arr[indexOfItem].price) + Number(data.priceUsd))
      arr[indexOfItem].amount = String(Number(arr[indexOfItem].amount) + Number(cryptocurrencyItem));
      setUserCryptocurrency(arr);
    } else {
      setUserCryptocurrency([ ...userCryptocurrency, {
        id: data.id,
        name: data.name,
        amount: String(cryptocurrencyItem),
        price: data.priceUsd,
      },
    ]);
    }
    setCryptocurrencyItem("");
    setNumberOfRendering(prev => prev = prev + 1);
    setIsDeleteOrPlus(false);
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
        <button className={styles.closeBtn} onClick={() => setModalWindow(false)}>Close</button>
      </div>
    </div>
  );
};