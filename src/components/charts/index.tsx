import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement } from "chart.js";

export const Charts: React.FC = () => {
  ChartJS.register(BarElement);

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Dataset",
        data: [10, 9, 11, 5, 7, 14, 12],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <Bar data={data} />
    </>
  );
};
