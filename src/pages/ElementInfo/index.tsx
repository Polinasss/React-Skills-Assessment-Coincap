import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./ElementInfo.module.scss";
import { Charts } from "../../components";
import { fetchCoincapApi } from "../../api";
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
      fetchCoincapApi(id).then(setData);
    }
  }, [id]);

  const setModal = (val: boolean) => setModalWindow(val);

  return (
    data && (
      <div className={styles.container}>
        <Modal modalWindow={modalWindow} setModalWindow={setModal} data={location.state} />
        <div className={styles.elementInfoBlock}>
          <div className={styles.title}>
            <h3>{data.data.name}</h3>
            <button className={styles.addToProfile} onClick={() => {setModalWindow(true); setModalData(data);}}>+</button>
          </div>
          <p> CHANGE: 
            <span style={Number(data.data.changePercent24Hr) < 0 ? { color: "red" } : { color: "green" }}>
              {Number(data.data.changePercent24Hr).toFixed(2) + "%"}
            </span>
          </p>
          <button className={styles.button} onClick={() => navigate(-1)}>go Back</button>
          <Charts />
        </div>
      </div>
    )
  );
};

export default ElementInfo;
