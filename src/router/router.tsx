import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, Main, ElementInfo } from "../pages";
import styles from './Container.module.scss'

const Navigation: React.FC = () => {
  return (
    <div className={styles.container}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:id" element={<ElementInfo />} />
        </Routes>
      </Router>
    </div>
  );
};
export default Navigation;
