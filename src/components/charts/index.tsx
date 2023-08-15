import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement} from "chart.js";
import { Line } from "react-chartjs-2";
import { ICharts } from "../../types";
import { useParams } from "react-router-dom";
import { fetchCoincapApi } from "../../services/api";
import { startDataCharts } from "../../constants";
import styles from "./Charts.module.scss";
import { getFormatHours, getHightPrice } from '../../utils/charts'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export const Charts: React.FC = () => {
  const [data, setData] = useState<ICharts[]>(startDataCharts);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchCoincapApi(`${id}/history?interval=h1`).then((res) =>
        setData(res.data.slice(0, 24))
      );
    }
  }, [id]);

  const formatedHours: string[] = [];
  const chartPrices: string[] = [];
  data.forEach((el) => formatedHours.push(getFormatHours(el.date)));
  data.forEach((el) => chartPrices.push(el.priceUsd));

  const chartData = {
    labels: formatedHours,
    datasets: [
      {
        label: id,
        data: chartPrices,
        borderColor: "red",
      },
    ],
  };

  return (
    <div className={styles.chart}>
      <Line className={styles.canvas} data={chartData} />
      <div className={styles.details}>
        <p>HIGH: {"$" + Number(getHightPrice(data)[0].priceUsd).toFixed(2)}</p>
        <p>LOW: {"$" + Number(getHightPrice(data)[getHightPrice(data).length - 1].priceUsd).toFixed(2)}</p>
        <p>AVARAGE: {"$" +((Number(getHightPrice(data)[0].priceUsd) + Number(getHightPrice(data)[getHightPrice(data).length - 1].priceUsd)) / 2).toFixed(2)}</p>
      </div>
    </div>
  );
};