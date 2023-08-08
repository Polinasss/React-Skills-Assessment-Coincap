import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../pages/Header";
import Main from "../pages/Main";
import ElementInfo from "../pages/ElementInfo";
import { IData } from "../types";
import { startData } from "../components";

const Navigation: React.FC = () => {
  const [data, setData] = useState<IData[]>(startData);

  useEffect(() => {
    fetch("https://api.coincap.io/v2/assets")
      .then((response) => response.json())
      .then((json) => setData(json.data));
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main data={data} />} />
        <Route path="/:id" element={<ElementInfo data={data} />} />
      </Routes>
    </Router>
  );
};
export default Navigation;
