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
  pageNumbers: number[];
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

export type IProfileDataObject = {
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
export interface IContextValue {
  userCryptocurrency: IProfileDataObject[];
  setUserCryptocurrency: Dispatch<SetStateAction<IProfileDataObject[]>>;
}

export interface IListRender {
  pageNum: number;
}
