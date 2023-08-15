import styles from "./Header.module.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCoincapApi } from "../../api";
import { IMain } from "../../types";
import { Portfolio } from "../../pages/Portfolio";
import { useDataContext } from "../../providers/DataContextProvider";
import { useTotalCostContext } from "../../providers/PriceContextProvider";

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const {userCryptocurrency} = useDataContext();
  const { getPortfolioPrice } = useTotalCostContext()

  const [data, setData] = useState<IMain>();
  const [modalWindow, setModalWindow] = useState<boolean>(false);

  useEffect(() => {
    fetchCoincapApi("").then(setData); 
  }, []);
  useEffect(() => {
    navigate("/?page=1");
  }, []);

  data?.data.sort((a, b) => Number(b.priceUsd) - Number(a.priceUsd));
  const setModal = (val: boolean) => setModalWindow(val);

  return (
    <>
      <Portfolio modalWindow={modalWindow} setModalWindow={setModal} />
      <header className={styles.header}>
        <ul className={styles.list}>
          <li className={styles.item}>
            {data?.data[0].name} - ${Number(data?.data[0].priceUsd).toFixed(2)}
          </li>
          <li className={styles.item}>
            {data?.data[1].name} - ${Number(data?.data[1].priceUsd).toFixed(2)}
          </li>
          <li className={styles.item}>
            {data?.data[2].name} - ${Number(data?.data[2].priceUsd).toFixed(2)}
          </li>
        </ul>
        <div className={styles.portfolio_container}>
          <button onClick={() => setModalWindow(true)} className={styles.portfolio}>Portfolio</button>
          <p id="portfolioInfo" className={styles.portfolio_info}>{getPortfolioPrice(userCryptocurrency)}</p>
        </div>
      </header>
      <Outlet />
    </>
  );
};