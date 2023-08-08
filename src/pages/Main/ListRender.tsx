import { IMain } from "../../types";
import { Link } from "react-router-dom";
import styles from './Container.module.scss';

export const ListRender: React.FC<IMain> = ({ data }) => {
  return (
    <div>
       <table className={styles.table}>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Change(24Hr)</th>
          <th>Action</th>
        </tr>
        {data.map((obj) => {
        return (
          <tr key={obj.id}>
            <th><Link to={`/${obj.id}`}>{obj.name}</Link></th>
            <th>{obj.priceUsd}</th>
            <th>{obj.changePercent24Hr}</th>
            <th>Add to portfolio</th>
          </tr>
        );
      })}
       </table>
    </div>
  );
};
