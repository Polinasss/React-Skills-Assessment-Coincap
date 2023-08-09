import React, { lazy } from "react";
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import { mainLoader, elementInfoLoader } from "../pages";
import styles from "./Container.module.scss";
import { Layout } from "../components";
const LazyMain:React.FC = lazy(() => import(`../pages/Main/index`));
const LazyElementInfo:React.FC = lazy(() => import(`../pages/ElementInfo`));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<LazyMain />} loader={mainLoader} />
      <Route path="/:id" element={<LazyElementInfo />} loader={elementInfoLoader} />
    </Route>
  )
);

const Navigation: React.FC = () => {
  return (
    <div className={styles.container}>
      <RouterProvider router={router} />
    </div>
  );
};
export default Navigation;
