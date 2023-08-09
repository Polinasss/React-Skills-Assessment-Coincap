import { IData, IMain } from "../../types";
import { Link, useAsyncValue } from "react-router-dom";
import styles from "./Container.module.scss";
import React, {useState} from "react";
import { Pagination } from "../../components";
import { Modal } from "../Modal";
import { startData } from "../../data";

export const ListRender: React.FC = () => {
  const {data} = useAsyncValue() as IMain;
  const [startPage, setStartPage] = useState(1);
  const [countOfPages, setCountOfPages] = useState(10);
  const [modalWindow, setModalWindow] = useState<boolean>(false);
  const [modalData, setModalData] = useState<IData>(startData[0]);

  const lastIndex = startPage * countOfPages;
  const firstIndex = lastIndex - countOfPages;
  const currentIndexes = data.slice(firstIndex, lastIndex);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / countOfPages); i++) {
     pageNumbers.push(i);
   }
  const setPaginate = (pageNumber: number) => setStartPage(pageNumber);
  const setModal = (val:boolean) => {
    setModalWindow(val);
  }
  return (
    <div>
      <Modal modalWindow={modalWindow} setModalWindow={setModal} data={modalData}/>
      <table className={styles.table}>
        <thead>
          <th>Name</th>
          <th>Price</th>
          <th>Change(24Hr)</th>
          <th>Action</th>
        </thead>
        {currentIndexes.map((obj) => {
          return (
            <tbody key={obj.id}>
              <th>
                <Link to={`/${obj.id}`}>{obj.name}</Link>
              </th>
              <th>{obj.priceUsd}</th>
              <th>{obj.changePercent24Hr}</th>
              <th><button onClick={() => {setModalWindow(true); setModalData(obj)}}>Add to portfolio</button></th>
            </tbody>
          );
        })}
      </table>
      <Pagination paginate={setPaginate} pageNumbers={pageNumbers}/>
    </div>
  );
};
