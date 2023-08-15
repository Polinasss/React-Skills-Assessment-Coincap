import { IData } from "../../types";

export const getListOfItems = ( startPage: number, countOfPages: number, data: IData[] ) => {
  const lastIndex = startPage * countOfPages;
  const firstIndex = lastIndex - countOfPages;
  const currentIndexes = data.slice(firstIndex, lastIndex);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / countOfPages); i++) {
    pageNumbers.push(i);
  }
  return { currentIndexes: currentIndexes, pageNumbers: pageNumbers };
};