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
import { useEffect, useState } from "react";
import { fetchData } from "../../api";
import { startDataCharts } from "../../data";
import styles from "./Charts.module.scss";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export function Charts() {
  const [data, setData] = useState<ICharts[]>(startDataCharts);
  const [interval, setInterval] = useState("h1");
  const [price, setPrice] = useState<string[]>([]);
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchData(`${id}/history?interval=${interval}`).then((res) =>
        setData(res.data.slice(res.data.length - 24, res.data.length))
      );
      oneD(interval);
    }
  }, [id, interval]);

  const oneD = (interval: string) => {
    setInterval(interval);

    const arr: string[] = [];
    data.forEach((el) => arr.push(new Date(el.date).toDateString()));
    setChartLabels(arr);

    const chartdatas: string[] = [];
    data.forEach((el) => chartdatas.push(el.priceUsd));
    setPrice(chartdatas);
  };

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: id,
        data: price,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "white",
      },
    ],
  };

  return (
    <div className={styles.chart}>
      <div>
        <button onClick={() => oneD("h1")}>1D</button>
        <button onClick={() => oneD("d1")}>1W</button>
        <button onClick={() => oneD("d1")}>1M</button>
        <button onClick={() => oneD("d1")}>3M</button>
        <button onClick={() => oneD("d1")}>6M</button>
        <button onClick={() => oneD("d1")}>1Y</button>
      </div>
      <Line data={chartData} />
    </div>
  );
}
