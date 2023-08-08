import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, Main, ElementInfo } from "../pages";

const Navigation: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<ElementInfo />} />
      </Routes>
    </Router>
  );
};
export default Navigation;
