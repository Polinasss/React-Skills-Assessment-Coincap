import React, { Suspense } from "react";
import { ListRender } from "./ListRender";
import { IMain } from "../../types";
import styles from "./Container.module.scss";
import { useLoaderData, defer, Await } from "react-router-dom";

const Main: React.FC = () => {
  const { data } = useLoaderData() as IMain;
  return (
    <Suspense fallback={<h2>loading...</h2>}>
      <Await resolve={data}>
        <div className={styles.container}>
          <ListRender />
        </div>
      </Await>
    </Suspense>
  );
};
async function getData() {
  const response = await fetch("https://api.coincap.io/v2/assets");
  return response.json();
}
export const mainLoader = async () => {
  return defer({
    data: getData(),
  });
};

export default Main;