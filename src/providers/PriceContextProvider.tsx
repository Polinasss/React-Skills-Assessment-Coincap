import { createContext, useContext, useState, useEffect } from "react";
import { ITotalCostDataObject, ITotalCostContextInterface, ITotalCostContextProps, IContextTotalCostValue } from "../types";

const DataContext = createContext<ITotalCostContextInterface>({} as ITotalCostContextInterface);

const TotalCostContext = ({ children }: ITotalCostContextProps) => {
  const [userTotalCost, setUserTotalCost] = useState<number[]>([0]);

//   Сохраняем данные в локал сторадж
//   useEffect(() => {
//     const userCryptocurrencyStore = JSON.parse(localStorage.getItem("userCryptocurrencyStore") || "");
//     if (userCryptocurrencyStore.length !== 1) {
//       stUserTotalCost(userCryptocurrencyStore);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("userCryptocurrencyStore", JSON.stringify(useruserTotalCost));
//   }, [useruserTotalCost]);

  const contextValue: IContextTotalCostValue = {
    userTotalCost: userTotalCost,
    setUserTotalCost: setUserTotalCost,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};
export const useTotalCostContext = () => useContext(DataContext);

export default TotalCostContext;
