import React from "react";
import { useDataContext } from "../../providers/DataContextProvider";
import { IPortfolio, IProfileDataObject } from "../../types";
import styles from "./Portfolio.module.scss";
import trash from "../../assets/trash.png"
import { getTotalCost } from "../../components/portfolio";

export const Portfolio: React.FC<IPortfolio> = ({setModalWindow, modalWindow}) => {
  const { userCryptocurrency, setUserCryptocurrency } = useDataContext();

  const deleteItem = (itemName: string) => {
    setUserCryptocurrency(userCryptocurrency.filter(obj => obj.name !== itemName))
  };

  return (
    <div className={modalWindow ? styles.visible : styles.hidden}>
      <div className={styles.modalBlock}>
        <h2>Total cost of user portfolio = {getTotalCost(userCryptocurrency)}</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {userCryptocurrency.slice(1, userCryptocurrency.length).map((obj: IProfileDataObject) => {
            return (
              <tr>
                <td>{obj.name}</td>
                <td>{obj.amount}</td>
                <td>${(Number(obj.price) * Number(obj.amount)).toFixed(2)}</td>
                <td><button onClick={() => deleteItem(obj.name)} className={styles.trash}><img className={styles.img} src={trash} alt="trash" /></button></td>
              </tr>
            )
          })}
          </tbody>
        </table>
        <button className={styles.closeBtn} onClick={() => setModalWindow(false)}>Close</button>
      </div>
    </div>
  );
};
