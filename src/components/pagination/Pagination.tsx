import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IPagination } from "../../types";
import styles from "./Pagination.module.scss";
import rightArrow from "../../assets/rightArrow.png";
import leftArrow from "../../assets/leftArrow.png";

export const Pagination: React.FC<IPagination> = ({ paginate, pageNumbers }) => {
  const location = useLocation();
  const navigation = useNavigate();
  const currentLocation = Number(location.search.slice(6));

  const goPrevious = () => {
    if (currentLocation !== 1) {
      paginate(currentLocation - 1);
      navigation(`/?page=${currentLocation - 1}`);
    }
  };
  const goNext = () => {
    if (currentLocation !== 10) {
      paginate(currentLocation + 1);
      navigation(`/?page=${currentLocation + 1}`);
    }
  };

  return (
    <div className={styles.pagination}>
      <button onClick={goPrevious} className={styles.button}>
        <img className={styles.img} src={leftArrow} alt="left arrow" />
      </button>
      <ul className={styles.list}>
        {pageNumbers.map((num: number) => (
          <li key={num}>
            <Link
              className={
                num === Number(location.search.slice(6))
                  ? styles.active
                  : styles.item
              }
              to={`/?page=${num}`}
              onClick={() => {
                paginate(num);
              }}
            >
              {num}
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={goNext} className={styles.button}>
        <img className={styles.img} src={rightArrow} alt="right arrow" />
      </button>
    </div>
  );
};
