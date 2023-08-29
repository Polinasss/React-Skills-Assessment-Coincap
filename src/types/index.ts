import { SetStateAction, Dispatch } from "react";

export interface IData {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  explorer: string;
}

export interface IMain {
  data: IData[];
}

export interface IPagination {
  paginate: (num: number) => void;
}

export interface IRenderingPagination {
  num: number,
  location: number,
  paginate: (num: number) => void;
}

export interface IInfo {
  data: IData;
}
export interface IElementInfo {
  data: IInfo;
}

export interface ICharts {
  priceUsd: string;
  time: number;
  date: string;
}

export interface IModal {
  modalWindow: boolean;
  setModalWindow: (val: boolean) => void;
  data: IData;
}

export interface IPortfolio {
  modalWindow: boolean;
  setModalWindow: (val: boolean) => void;
}

export interface IListRender {
  pageNum: number;
}

export type IProfileDataObject = {
  id: string;
  name: string;
  amount: string;
  price: string;
};
export interface IUserContextInterface {
  userCryptocurrency: IProfileDataObject[];
  setUserCryptocurrency: Dispatch<SetStateAction<IProfileDataObject[]>>;
}
export interface IUserContextProps {
  children: React.ReactNode;
}

export interface ITotalCostContextInterface {
  currentTotalCost: string, 
  setCurrentTotalCost: Dispatch<SetStateAction<string>>;
  setNumberOfRendering: Dispatch<SetStateAction<number>>;
  getPortfolioPrice: (userCryptocurrency: IProfileDataObject[]) => string;
  setIsDeleteOrPlus: Dispatch<SetStateAction<boolean>>;
  setDeletedObj: Dispatch<SetStateAction<IProfileDataObject>>;
}
export interface ITotalCostContextProps {
  children: React.ReactNode;
}