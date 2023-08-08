import { Link } from "react-router-dom";
import { IMainProps } from "../../types";

const Main: React.FC<IMainProps> = (data) => {
  
  return (
    <>
      {data.data.map((obj) => {
        return (
          <p key={obj.id}>
            <Link to={`/${obj.id}`} state={{}}>
              {obj.id}
            </Link>
          </p>
        );
      })}
    </>
  );
};
export default Main;
