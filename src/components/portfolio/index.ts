import { IProfileDataObject } from "../../types";

export const getTotalCost = (userCryptocurrency: IProfileDataObject[] = []) => {
  const arr: number[] = [];
  if (userCryptocurrency.length !== 0) {
    userCryptocurrency.forEach((obj) =>
      arr.push(Number(obj.price) * Number(obj.amount))
    );
    const totalCost =
      "$" + Number(arr.slice(1).reduce((sum, el) => sum + el, 0)).toFixed(2);
    return totalCost;
  } else {
    return "";
  }
};
