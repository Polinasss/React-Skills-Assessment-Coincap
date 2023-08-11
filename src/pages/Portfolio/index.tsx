import React from "react";
import { useDataContext } from "../../providers/DataContextProvider";
import { IPortfolio, IProfileDataObject } from "../../types";
import styles from "./ModalWindow.module.scss";
import trash from "../../assets/trash.png"

export const Portfolio: React.FC<IPortfolio> = ({
  setModalWindow,
  modalWindow,
}) => {
  const { userCryptocurrency, setUserCryptocurrency } = useDataContext();

  const deleteItem = (itemName: string) => {
    setUserCryptocurrency(userCryptocurrency.filter(obj => obj.name !== itemName))
  } 

  const getTotalCost = () => {}

  const arr: number[] = [];
  userCryptocurrency.forEach((obj) => arr.push(Number(obj.amount)));
  const totalAmount = arr.reduce((sum, el) => sum + el);
  console.log(totalAmount)

  return (
    <div className={modalWindow ? styles.visible : styles.hidden}>
      <div className={styles.modalBlock}>
        <h2>Total cost of user portfolio - {totalAmount}</h2>
          {userCryptocurrency.slice(1, userCryptocurrency.length).map((obj: IProfileDataObject) => {
            return (
              <div>
                <p>{obj.name} : {obj.amount}</p>
                <button onClick={() => deleteItem(obj.name)} className={styles.trash}><img className={styles.img} src={trash} alt="trash" /></button>
              </div>
            );
          })}
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
