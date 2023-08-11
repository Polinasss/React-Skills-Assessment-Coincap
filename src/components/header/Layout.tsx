import styles from "./Header.module.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchData } from "../../api";
import { IMain } from "../../types";
import { Portfolio } from "../../pages/Portfolio";

export const Layout: React.FC = () => {
  const [data, setData] = useState<IMain>();
  const [modalWindow, setModalWindow] = useState<boolean>(false);

  useEffect(() => {
    fetchData("").then(setData);
  }, []);

  data?.data.sort((a, b) => Number(b.priceUsd) - Number(a.priceUsd));

  const navigate = useNavigate();
  useEffect(() => {
    navigate("/?page=1");
  }, []);

  const setModal = (val: boolean) => {
    setModalWindow(val);
  };

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
          <button
            onClick={() => setModalWindow(true)}
            className={styles.portfolio}
          >
            Портфель
          </button>
          <p className={styles.portfolio_info}>
            стоимость портфеля пользователя
          </p>
        </div>
      </header>
      <Outlet />
    </>
  );
};
