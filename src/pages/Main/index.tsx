import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Main.module.scss";
import { ListRender } from "../../components";

const Main: React.FC = () => {
  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  return (
    <div className={styles.main}>
       <ListRender pageNum={Number(searchParams.get('page')) || 1} />
    </div>
  );
};

export default Main;