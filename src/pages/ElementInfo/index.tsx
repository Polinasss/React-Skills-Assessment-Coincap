import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Charts } from "../../components";
import { fetchData } from "../../api";

const ElementInfo: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>();

  useEffect(() => {
    if (id) {
      fetchData(id).then(setData);
    }
  }, [id]);
  return (
    data && (
      <>
        <p>{data.data.id}</p>
        <p>{data.data.name}</p>
        <button onClick={() => navigate(-1)}>go Back</button>
        <Charts />
      </>
    )
  );
};

export const elementInfoLoader = async ({ params }: any) => {
  const id = params.id;
  const response = await fetch(`https://api.coincap.io/v2/assets/${id}`);
  const data = await response.json();
  return { data, id };
};

export default ElementInfo;