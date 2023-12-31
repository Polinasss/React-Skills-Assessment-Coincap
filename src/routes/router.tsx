import React, { lazy, Suspense } from "react";
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import styles from "./Router.module.scss";
import { Layout, ErrorPage, Loading } from "../components";
import DataContextProvider from "../contexts/DataContextProvider";
import TotalCostContext from "../contexts/PriceContextProvider";

const LazyMain: React.FC = lazy(() => import(`../pages/Main/index`));
const LazyElementInfo: React.FC = lazy(() => import(`../pages/ElementInfo`));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<LazyMain />} errorElement={<ErrorPage />} />
      <Route path="/:id" element={<LazyElementInfo />} />
    </Route>
  )
);

const Navigation: React.FC = () => {
  return (
    <div className={styles.routerContainer}>
      <DataContextProvider>
        <TotalCostContext>
          <Suspense fallback={<Loading />}>
            <RouterProvider router={router} />
          </Suspense>
        </TotalCostContext>
      </DataContextProvider>
    </div>
  );
};

export default Navigation;
