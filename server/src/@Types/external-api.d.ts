export interface FetchFromExternalApiResponse {
  USDBRL: IExchangeData;
  EURBRL: IExchangeData;
  JPYBRL: IExchangeData;
}

export interface IExchangeData {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: Date;
}
