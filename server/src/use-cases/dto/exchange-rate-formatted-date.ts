import { ExchangeRate } from '@prisma/client';

export interface ExchangeRateFormattedDate {
  id: string;
  value: number;
  bid: number;
  ask: number;
  high: number;
  low: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export function toExchangeRateFormattedDate(exchangeRate: ExchangeRate): ExchangeRateFormattedDate {
  return {
    id: exchangeRate.id,
    value: exchangeRate.value,
    bid: exchangeRate.bid,
    ask: exchangeRate.ask,
    high: exchangeRate.high,
    low: exchangeRate.low,
    currency: exchangeRate.currency,
    createdAt: exchangeRate.created_at.toString(),
    updatedAt: exchangeRate.updated_at.toString(),
  };
}
