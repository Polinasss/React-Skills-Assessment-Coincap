import { IMain } from "../../types";
import { Link } from "react-router-dom";

export const ListRender: React.FC<IMain> = ({ data }) => {
  return (
    <div>
      {data.map((obj) => {
        return (
          <p key={obj.id}>
            <Link to={`/${obj.id}`}>{obj.id}</Link>
          </p>
        );
      })}
    </div>
  );
};
