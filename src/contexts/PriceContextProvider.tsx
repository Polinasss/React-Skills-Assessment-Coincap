import { createContext, useContext, useState, useEffect } from "react";
import { ITotalCostContextInterface, ITotalCostContextProps, IProfileDataObject} from "../types";

const DataContext = createContext<ITotalCostContextInterface>({} as ITotalCostContextInterface);

const TotalCostContext = ({ children }: ITotalCostContextProps) => {
  const [userTotalCost, setUserTotalCost] = useState<string>("");
  const [numberOfRendering, setNumberOfRendering] = useState<number>(0);
  const [isDeleteOrPlus, setIsDeleteOrPlus] = useState<boolean>(false);
  const [deleteObj, setDeletedObj] = useState<IProfileDataObject>({name: '', amount: '', price: ''});

  useEffect(() => {
    try {
      const totalCostStore = JSON.parse(localStorage.getItem("totalCostStore") as string);
      if (totalCostStore) {
        setUserTotalCost(totalCostStore);
      }
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }, []);

  useEffect(() => {
      localStorage.setItem("totalCostStore", JSON.stringify(userTotalCost));
  }, [userTotalCost]);

  const delateTotalCost = (userCryptocurrency: IProfileDataObject[] = [], delatedObj:IProfileDataObject[] = []) => {
    const arr: number[] = [];
    userCryptocurrency.forEach((obj) => arr.push(Number(obj.price) * Number(obj.amount)));
    const totalCost = Number(arr.slice(1).reduce((sum, el) => sum + el, 0));
    const y = Number(delatedObj[0].price) === undefined ? 0 : Number(delatedObj[0].price) * Number(delatedObj[0].amount);
    setUserTotalCost(totalCost.toFixed(2));
    return `${(y + totalCost).toFixed(2)}$ - ${y.toFixed(2)}$ = ${totalCost.toFixed(2)}$ (-${(y / (y + totalCost) * 100).toFixed(2)}%)`
  };

  const getTotalCost = (userCryptocurrency: IProfileDataObject[] = []) => {
    if (numberOfRendering >= 1) {
      if (userCryptocurrency.length !== 1) {
        const arr: number[] = [];
        userCryptocurrency.forEach((obj) => arr.push(Number(obj.price) * Number(obj.amount)));
        const totalCost = arr.reduce((sum, el) => sum + el, 0);
        const previousValue = arr.reduce((sum, el) => sum + el, 0) - arr[arr.length - 1];
        const percent = (Number(arr[arr.length - 1]) / Number(previousValue) * 100).toFixed(2) === "Infinity" ? '100' : (Number(arr[arr.length - 1]) / Number(previousValue) * 100).toFixed(2)
        setUserTotalCost(totalCost.toFixed(2));
        return `${previousValue.toFixed(2)}$ + ${arr[arr.length - 1].toFixed(2)}$ = ${totalCost.toFixed(2)}$ (+${percent}%)`
      } else {
        return ''
      }
    } else {
      return userTotalCost === "" ? "portfolio is empty" : userTotalCost + '$';
    }
  };

  const getPortfolioPrice = (userCryptocurrency: IProfileDataObject[] = []) => {
    if (isDeleteOrPlus === false) {
      return getTotalCost(userCryptocurrency);
    } else {
      const emptyPortfolio = () => {setUserTotalCost(''); return 'portfolio is empty'}
      return userCryptocurrency.length !== 1 ? delateTotalCost(userCryptocurrency, [deleteObj]) : emptyPortfolio();
    }

  }

  const contextValue: ITotalCostContextInterface = {
    setNumberOfRendering: setNumberOfRendering,
    getPortfolioPrice: getPortfolioPrice,
    setIsDeleteOrPlus: setIsDeleteOrPlus, 
    setDeletedObj: setDeletedObj,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};
export const useTotalCostContext = () => useContext(DataContext);

export default TotalCostContext;