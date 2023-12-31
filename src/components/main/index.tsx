import { IData, IListRender } from "../../types";
import { Link } from "react-router-dom";
import styles from "../../pages/Main/Main.module.scss";
import React, { useEffect, useState } from "react";
import { Pagination } from "../pagination/Pagination";
import { Modal } from "../../pages";
import { startData } from "../../constants";
import { fetchData } from "../../services/api";
import { Loading } from "../loading";

export const ListRender: React.FC<IListRender> = ({ pageNum }) => {
  const [startPage, setStartPage] = useState(pageNum);
  const [modalWindow, setModalWindow] = useState<boolean>(false);
  const [modalData, setModalData] = useState<IData>(startData[0]);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IData[]>(startData);

  const setPaginate = (pageNumber: number) => setStartPage(pageNumber);
  const setModal = (val: boolean) => setModalWindow(val);

  useEffect(() => {
    async function getApi () {
      await setLoading(true);
      const result = await fetchData(pageNum);
      await setData(result);
      await setLoading(false);
    }
    getApi();
  }, [pageNum])

  return (
    <div>
      <Modal modalWindow={modalWindow} setModalWindow={setModal} data={modalData} />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Price</th>
            <th>Market Cap</th>
            <th>VWAP(24Hr)</th>
            <th>Supply</th>
            <th>Volume</th>
            <th>{window.screen.width < 500 ? '24Hr' : 'Change(24Hr)'}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading ? <Loading /> : data.map((obj) => {
            return (
              <tr key={obj.id}>
                <td>{obj.rank}</td>
                <td><Link to={`/${obj.id}`} state={obj}>{obj.name}</Link></td>
                <td>{"$" + Number(obj.priceUsd).toFixed(2)}</td>
                <td>{"$" + new Intl.NumberFormat("de-DE").format(Number(obj.marketCapUsd)).slice(0, obj.marketCapUsd.length - 23) + "b"}</td>
                <td>{"$" + Number(obj.vwap24Hr).toFixed(2)}</td>
                <td>{new Intl.NumberFormat("de-DE").format(Number(obj.supply)).slice(0, obj.supply.length - 20) + "m"}</td>
                <td>{"$" + new Intl.NumberFormat("de-DE").format(Number(obj.volumeUsd24Hr)).slice(0, obj.volumeUsd24Hr.length - 20) + "m"}</td>
                <td style={Number(obj.changePercent24Hr) < 0 ? { color: "red" } : { color: "green" }}>{Number(obj.changePercent24Hr).toFixed(2) + "%"}</td>
                <td>
                  <button className={styles.button} onClick={() => { setModalWindow(true); setModalData(obj); }}>+</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination paginate={setPaginate} />
    </div>
  );
};