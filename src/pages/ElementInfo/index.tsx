import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./ElementInfo.module.scss";
import { Charts, Loading } from "../../components";
import { fetchCoincapApi } from "../../services/api";
import { Modal } from "../Modal";
import { IData, IMain } from "../../types";
import { startData } from "../../constants";

const ElementInfo: React.FC = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [data, setData] = useState<IData>(startData[0]);
  const [modalWindow, setModalWindow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getApi () {
      await setLoading(true);
      const result = await fetchCoincapApi(id);
      await setData(result.data);
      await setLoading(false);
    }
      getApi();
  }, [id]);

  const setModal = (val: boolean) => setModalWindow(val);

  return (
    loading ? <Loading/> : (
      <div className={styles.container}>
        <Modal modalWindow={modalWindow} setModalWindow={setModal} data={location.state} />
        <div className={styles.elementInfoBlock}>
          <div className={styles.title}>
            <h3>{data.name}</h3>
            <button className={styles.addToProfile} onClick={() => setModalWindow(true)}>+</button>
          </div>
          <p> CHANGE: 
            <span style={Number(data.changePercent24Hr) < 0 ? { color: "red" } : { color: "green" }}>
              {Number(data.changePercent24Hr).toFixed(2) + "%"}
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