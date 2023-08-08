import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main, ElementInfo } from "../pages";
import styles from "./Container.module.scss";
import { Layout } from "../components";

const Navigation: React.FC = () => {
  return (
    <div className={styles.container}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Main />} />
            <Route path="/:id" element={<ElementInfo />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};
export default Navigation;
