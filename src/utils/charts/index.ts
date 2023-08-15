import { ICharts } from "../../types";

export const getFormatHours = (el: string) => {
  let hours = new Date(el).getHours();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  let strTime = hours + ampm;
  return strTime;
};

export const getHightPrice = (data: ICharts[]) => {
  const result = [...data];
  result.sort((a, b) => Number(b.priceUsd) - Number(a.priceUsd));
  return result;
};