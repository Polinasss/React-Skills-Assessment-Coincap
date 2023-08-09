import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ICharts } from '../../types';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchData } from '../../api';
import { startDataCharts } from '../../data';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
);

export function Charts() {
  const [data, setData] = useState<ICharts[]>(startDataCharts);
  const { id } = useParams();
  
  useEffect(() => {
    if (id) {
      fetchData(`${id}/history?interval=d1`).then(res => setData(res.data.slice(0,10)));
    }
  }, [id]);

  const arr: string[] = [];
  data.forEach(el => arr.push(el.date))
  console.log(arr);

  const chartdatas:string[] = [];
  data.forEach(el => chartdatas.push(el.priceUsd))
  console.log(chartdatas);

  const chartData = {
    labels: arr,
    datasets: [
      {
        label: id,
        data: chartdatas,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'white',
      },
    ],
  };

  return <Line data={chartData} />;
}
