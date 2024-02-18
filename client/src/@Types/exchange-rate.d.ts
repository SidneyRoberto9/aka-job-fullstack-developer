export interface ExchangeRate {
  id: string;
  value: number;
  bid: number;
  ask: number;
  high: number;
  low: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface ExchangeRateInfo {
  avg: number;
  min: number;
  max: number;
}

export interface ExchangeRateList {
  total: number;
  hasNext: boolean;
  data: ExchangeRate[];
}

export type ICurrency = 'USD' | 'EUR' | 'JPY';
