import React from "react";
import { Link } from "react-router-dom";
import styles from "./Pagination.module.scss";

interface IRenderingPagination {
    num: number,
  location: number,
  paginate: (num: number) => void
}

export const RenderingPagination:React.FC<IRenderingPagination> = ( {num, location, paginate} ) => {
  location = location === 0 ? 1 : location;
  return (
    <>
      <li key={num}>
        <Link
          key={crypto.randomUUID()}
          className={num === location ? styles.active : styles.item}
          to={`/React-Skills-Assessment-Coincap/?page=${num}`}
          onClick={() => paginate(num)}
        >
          {num}
        </Link>
      </li>
    </>
  );
};