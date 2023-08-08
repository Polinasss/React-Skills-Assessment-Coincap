import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { IMainProps, IData } from '../../types';

const ElementInfo: React.FC<IMainProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<IData>();
  
  useEffect(() => {
    fetch(`https://api.coincap.io/v2/assets/${id}`)
      .then((response) => response.json())
      .then((json) => setData(json.data));
  }, []);

  return (
    <>
      <h3>{id}</h3>
      <p>{data?.rank}</p>
      <p>{data?.symbol}</p>
      <p>{data?.supply}</p>
      <p>{data?.priceUsd}</p>
      <p>{data?.explorer}</p>
      <button onClick={() => navigate(-1)}>Назад</button>
    </>
  );
};

export default ElementInfo;