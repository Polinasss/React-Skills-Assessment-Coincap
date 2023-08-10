import React, { Suspense } from "react";
import { ListRender } from "./ListRender";
import { IMain } from "../../types";
import styles from "./Main.module.scss";
import { useLoaderData, defer, Await, useLocation } from "react-router-dom";
import { fetchData } from "../../api";

const Main: React.FC = () => {
  const { data } = useLoaderData() as IMain;
  const location = useLocation();
  return (
    <Suspense fallback={<h2>loading...</h2>}>
      <Await resolve={data}>
        <div className={styles.main}>
          <ListRender pageNum={Number(location.search[6])} />
        </div>
      </Await>
    </Suspense>
  );
};
export const mainLoader = async () => {
  return defer({
    data: fetchData(''),
  });
};

export default Main;