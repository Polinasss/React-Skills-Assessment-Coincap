import React, { lazy } from "react";
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { mainLoader } from "../pages";
import styles from "./Router.module.scss";
import { Layout, ErrorPage } from "../components";
import DataContextProvider from "../providers/DataContextProvider";

const LazyMain: React.FC = lazy(() => import(`../pages/Main/index`));
const LazyElementInfo: React.FC = lazy(() => import(`../pages/ElementInfo`));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<LazyMain />} loader={mainLoader}  errorElement={<ErrorPage/>}/>
      <Route
        path="/:id"
        element={<LazyElementInfo />}
      />
    </Route>
  )
);

const Navigation: React.FC = () => {
  return (
    <div className={styles.routerContainer}>
      <DataContextProvider>
        <RouterProvider router={router} />
      </DataContextProvider>
    </div>
  );
};

export default Navigation;
