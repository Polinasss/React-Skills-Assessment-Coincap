import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IData } from '../../types';

export const ElementInfo: React.FC = () => {
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
      
      <button onClick={() => navigate(-1)}>go Back</button>
    </>
  );
};