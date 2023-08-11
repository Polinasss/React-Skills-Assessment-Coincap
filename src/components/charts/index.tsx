import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ICharts } from "../../types";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../api";
import { startDataCharts } from "../../data";
import styles from "./Charts.module.scss";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export const Charts:React.FC = () => {
  const [data, setData] = useState<ICharts[]>(startDataCharts);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchData(`${id}/history?interval=h1`).then((res) =>
        setData(res.data.slice(0, 24))
      );
    }
  }, [id]);

  const arr: string[] = [];
  function getFormatHours (el:string) {
    let hours = (new Date(el)).getHours();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours%12;
    let strTime = hours + ampm;
    return strTime;
  }
  data.forEach((el) => arr.push(getFormatHours(el.date)));

  const chartdatas: string[] = [];
  data.forEach((el) => chartdatas.push(el.priceUsd));


  function getHightPrice () {
    const result = [...data]
    result.sort((a, b) => Number(b.priceUsd) - Number(a.priceUsd));
    return result;
  }

  const chartData = {
    labels: arr,
    datasets: [
      {
        label: id,
        data: chartdatas,
        borderColor: "red",
      },
    ],
  };

  return (
    <div className={styles.chart}>
      <Line className={styles.canvas} data={chartData} />
      <div className={styles.details}>
        <p> HIGH: {'$' + Number(getHightPrice()[0].priceUsd).toFixed(2)}</p>
        <p> LOW: {'$' + Number(getHightPrice()[(getHightPrice()).length - 1].priceUsd).toFixed(2)}</p>
        <p> AVARAGE: {'$' + ((Number(getHightPrice()[0].priceUsd) + Number(getHightPrice()[(getHightPrice()).length - 1].priceUsd)) / 2).toFixed(2)}</p>
      </div>
    </div>
  );
}
