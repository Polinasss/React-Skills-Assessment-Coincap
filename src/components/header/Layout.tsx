import styles from "./Header.module.scss";
import { Outlet } from "react-router-dom";

export const Layout: React.FC = () => {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Header</h1>
      </header>
      <Outlet />
    </>
  );
};
