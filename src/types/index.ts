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