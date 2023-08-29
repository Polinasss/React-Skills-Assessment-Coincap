import React, { useState, useEffect } from "react";
import { useDataContext } from "../../contexts/DataContextProvider";
import { IPortfolio, IProfileDataObject } from "../../types";
import trash from "../../assets/trash.png";
import { useTotalCostContext } from "../../contexts/PriceContextProvider";
import styles from "./Portfolio.module.scss";
import { fetchCurrentCoints } from "../../services/api";
import { startData } from "../../constants";

export const Portfolio: React.FC<IPortfolio> = ({
  setModalWindow,
  modalWindow,
}) => {
  const { userCryptocurrency, setUserCryptocurrency } = useDataContext();
  const { setIsDeleteOrPlus, setDeletedObj, getPortfolioPrice, setCurrentTotalCost } =
    useTotalCostContext();
  const [getPrice, setGetPrice] = useState<string>("");

  const [dataChange, setDataChange] = useState(startData);

  function getCurrentPrices() {
    const arr: string[] = [];
    userCryptocurrency.forEach((obj) => arr.push(obj.id));
    fetchCurrentCoints(arr).then((data) => setDataChange(data));
  }

  function chanfePortfolio () {
    const portfolio:number[] = [];
    const currentPortfolio:number[] = [];
    userCryptocurrency.slice(1, userCryptocurrency.length).forEach((obj: IProfileDataObject) => {
      let indexes = userCryptocurrency.indexOf(obj);
      portfolio.push(Number(obj.price) * Number(obj.amount));
      currentPortfolio.push(Number(dataChange[indexes-1]?.priceUsd) * Number(obj.amount));
    })
    const reduceRes = portfolio.reduce((a,b) => a +b, 0);
    const reduceCurres = currentPortfolio.reduce((a,b) => a +b, 0);
    const persent = reduceCurres === reduceRes ? 0 : ((reduceCurres / reduceRes) - 1 || 0);
    console.log(persent)
    setCurrentTotalCost(`${(reduceRes).toFixed(2)} → ${(reduceCurres).toFixed(2)} (${(persent).toFixed(5)}%)`)
    return `${(reduceRes).toFixed(2)}$ → ${(reduceCurres).toFixed(2)}$ (${(persent).toFixed(5)}%)`
  }

  const deleteItem = (delObj: IProfileDataObject) => {
    setUserCryptocurrency(
      userCryptocurrency.filter((obj) => obj.name !== delObj.name)
    );
    setIsDeleteOrPlus(true);
    setDeletedObj(delObj);
  };

  useEffect(() => {
    setGetPrice(getPortfolioPrice(userCryptocurrency));
    getCurrentPrices();
  }, [userCryptocurrency]);

  return (
    <div className={modalWindow ? styles.visible : styles.hidden}>
      <div className={styles.modalBlock}>
        <h2 className={styles.title}>
          {userCryptocurrency.length >= 1 ? getPrice : 0}
        </h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Purchase price</th>
              <th>Current price</th>
              <th>Change</th>
              <th style={{ maxWidth: 30 }}></th>
            </tr>
          </thead>
          <tbody>
            {userCryptocurrency
              .slice(1, userCryptocurrency.length)
              .map((obj: IProfileDataObject) => {
                return (
                  <tr key={crypto.randomUUID()}>
                    <td key={crypto.randomUUID()}>{obj.name}</td>
                    <td key={crypto.randomUUID()}>{obj.amount}</td>
                    <td key={crypto.randomUUID()}>
                      ${(Number(obj.price) * Number(obj.amount)).toFixed(2)}
                    </td>
                    <td key={crypto.randomUUID()}>
                      {(Number(dataChange.filter((el) => el.name === obj.name)[0]?.priceUsd) * Number(obj.amount)).toFixed(2)}
                    </td>
                    <td key={crypto.randomUUID()}>
                      {((Number(dataChange.filter((el) => el.name === obj.name)[0]?.priceUsd) * Number(obj.amount)) / (Number(obj.price) * Number(obj.amount)) - 1
                      ).toFixed(5)}%
                    </td>
                    <td
                      style={{ width: "fit-content" }}
                      key={crypto.randomUUID()}
                    >
                      <button
                        key={crypto.randomUUID()}
                        onClick={() => deleteItem(obj)}
                        className={styles.trash}
                      >
                        <img
                          key={crypto.randomUUID()}
                          className={styles.img}
                          src={trash}
                          alt="trash"
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <h2>{chanfePortfolio()}</h2>
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
