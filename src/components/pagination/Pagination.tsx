import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IPagination } from "../../types";
import styles from "./Pagination.module.scss";
import rightArrow from "../../assets/rightArrow.png";
import leftArrow from "../../assets/leftArrow.png";
import { RenderingPagination } from ".";
import { useMemo } from "react";

export const Pagination: React.FC<IPagination> = ({
  paginate,
  pageNumbers,
}) => {
  const location = useLocation();
  const navigation = useNavigate();
  const searchParams = useMemo(
    () => console.log(new URLSearchParams(location.search)),
    [location.search]
  );

  const [pageNumberLimit, setPageNumberLimit] = useState(
    window.screen.width < 550 ? 3 : 5
  );
  const [maxPageLimit, setMaxPageLimit] = useState(
    window.screen.width < 550 ? 3 : 5
  );
  const [minPageLimit, setMinPageLimit] = useState(0);

  let pageIncrementBtn = null;
  if (pageNumbers.length > maxPageLimit) {
    pageIncrementBtn = (
      <p
        className={styles.pageIncrementBtn}
        onClick={() => goNext(currentLocation)}
      >
        ...
      </p>
    );
  }
  let pageDecrementBtn = null;
  if (minPageLimit >= 1) {
    pageDecrementBtn = (
      <p
        className={styles.pageDecrementBtn}
        onClick={() => goPrevious(currentLocation)}
      >
        ...
      </p>
    );
  }

  const currentLocation = Number(location.search.slice(6));

  const goPrevious = (currentLocation: number) => {
    if (currentLocation !== 1) {
      paginate(currentLocation - 1);
      navigation(`/?page=${currentLocation - 1}`);
      if (window.screen.width < 1050 && currentLocation - 1 < minPageLimit) {
        setMaxPageLimit(maxPageLimit - pageNumberLimit);
        setMinPageLimit(minPageLimit - pageNumberLimit);
      }
    }
  };
  const goNext = (currentLocation: number) => {
    if (currentLocation !== 10) {
      paginate(currentLocation + 1);
      navigation(`/?page=${currentLocation + 1}`);
      if (window.screen.width < 1050 && currentLocation + 1 > maxPageLimit) {
        setMaxPageLimit(maxPageLimit + pageNumberLimit);
        setMinPageLimit(minPageLimit + pageNumberLimit);
      }
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => goPrevious(currentLocation)}
        className={styles.button}
      >
        <img className={styles.img} src={leftArrow} alt="left arrow" />
      </button>
      {window.screen.width < 1050 ? pageDecrementBtn : null}
      <ul className={styles.list}>
        {pageNumbers.map((num) => {
          if (window.screen.width < 1050) {
            if (num < maxPageLimit + 1 && num > minPageLimit) {
              return (
                <RenderingPagination
                  num={num}
                  location={Number(location.search.slice(6))}
                  paginate={paginate}
                />
              );
            } else {
              return null;
            }
          } else {
            return (
              <RenderingPagination
                num={num}
                location={Number(location.search.slice(6))}
                paginate={paginate}
              />
            );
          }
        })}
      </ul>
      {window.screen.width < 1050 ? pageIncrementBtn : null}
      <button onClick={() => goNext(currentLocation)} className={styles.button}>
        <img className={styles.img} src={rightArrow} alt="right arrow" />
      </button>
    </div>
  );
};
