import { IPagination } from "../../types";
import styles from "./Pagination.module.scss";

export const Pagination: React.FC<IPagination> = ({
  paginate,
  pageNumbers,
}) => {
  return (
    <div className={styles.pagination}>
      <ul className={styles.list}>
        {pageNumbers.map((num: number) => (
          <li className={styles.item} onClick={() => paginate(num)} key={num}>
            {num}
          </li>
        ))}
      </ul>
    </div>
  );
};
