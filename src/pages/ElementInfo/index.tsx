import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Charts } from "../../components";
import { fetchData } from "../../api";
import styles from "./ElementInfo.module.scss";
import { Modal } from "../Modal";
import { IData } from "../../types";
import { startData } from "../../data";

const ElementInfo: React.FC = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>();
  const [modalWindow, setModalWindow] = useState<boolean>(false);
  const [modalData, setModalData] = useState<IData>(startData[0]);

  useEffect(() => {
    if (id) {
      fetchData(id).then(setData);
    }
  }, [id]);

  const setModal = (val: boolean) => {
    setModalWindow(val);
  };

  return (
    data && (
      <div className={styles.container}>
        <Modal
        modalWindow={modalWindow}
        setModalWindow={setModal}
        data={{name: location.search.slice(1), id: '', rank: '', symbol: '', supply: '', maxSupply: '', marketCapUsd: '', volumeUsd24Hr: '', priceUsd: '', changePercent24Hr: '', vwap24Hr: '', explorer: ''}}
      />
        <div className={styles.elementInfoBlock}>
          <div className={styles.title}>
          <h3>{data.data.name}</h3>
          <button
            className={styles.addToProfile}
            onClick={() => {
              setModalWindow(true);
              setModalData(data);
            }}
          >
            +
          </button></div>
          <p>
            CHANGE: 
            <span
              style={
                Number(data.data.changePercent24Hr) < 0
                  ? { color: "red" }
                  : { color: "green" }
              }
            >
              {Number(data.data.changePercent24Hr).toFixed(2) + "%"}
            </span>
          </p>
          <button className={styles.button} onClick={() => navigate(-1)}>
            go Back
          </button>
          <Charts />
        </div>
      </div>
    )
  );
};

export const elementInfoLoader = async ({ params }: any) => {
  const id = params.id;
  const response = await fetch(`https://api.coincap.io/v2/assets/${id}`);
  const data = await response.json();
  return { data, id };
};

export default ElementInfo;
