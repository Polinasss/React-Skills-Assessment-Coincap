import React, { useState, useEffect } from "react";
import { ListRender } from "./ListRender";
import { IData } from "../../types";
import { startData, Pagination } from "../../components";
import styles from './Container.module.scss';

export const Main: React.FC = () => {
  const [data, setData] = useState<IData[]>(startData);
  useEffect(() => {
    fetch("https://api.coincap.io/v2/assets")
      .then((response) => response.json())
      .then((json) => setData(json.data));
  }, []);

  const [startPage, setStartPage] = useState(1);
  const [countOfPages, setCountOfPages] = useState(10);

  const lastIndex = startPage * countOfPages;
  const firstIndex = lastIndex - countOfPages;
  const currentIndexes = data.slice(firstIndex, lastIndex);

  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(data.length / countOfPages); i++) {
    pageNumbers.push(i);
  }

  const setPaginate = (pageNumber: number) => setStartPage(pageNumber);

  return (
    <div className={styles.container}>
      <ListRender data={currentIndexes}/>
      <Pagination pageNumbers={pageNumbers} paginate={setPaginate}/>
    </div>
  );
};
