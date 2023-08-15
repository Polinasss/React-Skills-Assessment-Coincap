import React from "react";
import { useDataContext } from "../../providers/DataContextProvider";
import { IPortfolio, IProfileDataObject } from "../../types";
import trash from "../../assets/trash.png";
import { useTotalCostContext } from "../../providers/PriceContextProvider";
import styles from "./Portfolio.module.scss";

export const Portfolio: React.FC<IPortfolio> = ({ setModalWindow, modalWindow }) => {
  const { userCryptocurrency, setUserCryptocurrency } = useDataContext();
  const { setIsDeleteOrPlus, setDeletedObj, getPortfolioPrice } = useTotalCostContext();
  
  const deleteItem = (delObj: IProfileDataObject) => {
    setUserCryptocurrency( userCryptocurrency.filter((obj) => obj.name !== delObj.name));
    setIsDeleteOrPlus(true);
    setDeletedObj(delObj);
  };

  return (
    <div className={modalWindow ? styles.visible : styles.hidden}>
      <div className={styles.modalBlock}>
        <h2 className={styles.title}> Total cost of user portfolio = {getPortfolioPrice(userCryptocurrency)} </h2>
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
                  <tr key={crypto.randomUUID()}>
                    <td key={crypto.randomUUID()}>{obj.name}</td>
                    <td key={crypto.randomUUID()}>{obj.amount}</td>
                    <td key={crypto.randomUUID()}>${(Number(obj.price) * Number(obj.amount)).toFixed(2)}</td>
                    <td key={crypto.randomUUID()}>
                      <button key={crypto.randomUUID()} onClick={() => deleteItem(obj)} className={styles.trash}>
                        <img key={crypto.randomUUID()} className={styles.img} src={trash} alt="trash" />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <button className={styles.closeBtn} onClick={() => setModalWindow(false)}>Close</button>
      </div>
    </div>
  );
};
