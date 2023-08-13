import { createContext, useContext, useState, useEffect } from "react";
import { ITotalCostContextInterface, ITotalCostContextProps, IContextTotalCostValue } from "../types";
import { IProfileDataObject } from "../types";

const DataContext = createContext<ITotalCostContextInterface>({} as ITotalCostContextInterface);

const TotalCostContext = ({ children }: ITotalCostContextProps) => {
  const [userTotalCost, setUserTotalCost] = useState<string>('');

  useEffect(() => {
    const userTotalCostStore = JSON.parse(localStorage.getItem("userTotalCostStore") || "");
    if (userTotalCostStore) {
      setUserTotalCost(userTotalCostStore);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userTotalCostStore", JSON.stringify(userTotalCost));
  }, [userTotalCost]);

  

const getTotalCost = (userCryptocurrency: IProfileDataObject[] = []) => {
  const arr: number[] = [];
  if (userCryptocurrency.length !== 0) {
    userCryptocurrency.forEach((obj) =>
      arr.push(Number(obj.price) * Number(obj.amount))
    );
    
    const totalCost = Number(arr.slice(1).reduce((sum, el) => sum + el, 0)).toFixed(2);
    const previousValue = (Number(arr.slice(1).reduce((sum, el) => sum + el, 0)) - arr[arr.length - 1]).toFixed(2);
    const res = `${previousValue}$ + ${arr[arr.length-1].toFixed(2)}$ = ${totalCost}$ (${(arr[arr.length-1] / Number(totalCost) * 100).toFixed(2)}%)`
    return res
  } else {
    return "";
  }
};

  const contextValue: IContextTotalCostValue = {
    userTotalCost: userTotalCost,
    setUserTotalCost: setUserTotalCost,
    getTotalCost: getTotalCost,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};
export const useTotalCostContext = () => useContext(DataContext);

export default TotalCostContext;
