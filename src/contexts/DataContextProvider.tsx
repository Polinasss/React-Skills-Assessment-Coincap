import { createContext, useContext, useState, useEffect } from "react";
import { IProfileDataObject, IUserContextInterface, IUserContextProps } from "../types";

const DataContext = createContext<IUserContextInterface>({} as IUserContextInterface);

const DataContextProvider = ({ children }: IUserContextProps) => { const [userCryptocurrency, setUserCryptocurrency] = useState<IProfileDataObject[]>([{ name: "", amount: "", price: ""}]);

  useEffect(() => {
    const сryptocurrencyStore = localStorage.getItem("userCryptocurrencyStore");
    if (сryptocurrencyStore) {
      const userCryptocurrencyStore = JSON.parse(сryptocurrencyStore)
      setUserCryptocurrency(userCryptocurrencyStore);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userCryptocurrencyStore", JSON.stringify(userCryptocurrency));
  }, [userCryptocurrency]);

  const contextValue: IUserContextInterface = {
    userCryptocurrency,
    setUserCryptocurrency,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};
export const useDataContext = () => useContext(DataContext);

export default DataContextProvider;