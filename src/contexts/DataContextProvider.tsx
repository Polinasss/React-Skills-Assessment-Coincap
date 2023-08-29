import { createContext, useContext, useState, useEffect } from "react";
import { IProfileDataObject, IUserContextInterface, IUserContextProps } from "../types";

const DataContext = createContext<IUserContextInterface>({} as IUserContextInterface);

const DataContextProvider = ({ children }: IUserContextProps) => { const [userCryptocurrency, setUserCryptocurrency] = useState<IProfileDataObject[]>([{ id: "", name: "", amount: "", price: ""}]);

  useEffect(() => {
    try {
      const userCryptocurrencyStore = JSON.parse(localStorage.getItem("userCryptocurrencyStore") as string);
      if (userCryptocurrencyStore.length > 1) {
        setUserCryptocurrency(userCryptocurrencyStore);
      }
    } catch (err) {
      console.log(`Error: ${err}`);
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