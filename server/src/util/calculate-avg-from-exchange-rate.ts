import { ExchangeRate } from '@prisma/client';

export function calculateTotalAverage(exchangeRates: ExchangeRate[]): number {
  const result = exchangeRates.reduce(
    (acc, rate) => {
      acc.total += (rate.bid + rate.ask) / 2;
      acc.count += 1;
      return acc;
    },
    { total: 0, count: 0 },
  );

  const total = (result.total / result.count).toFixed(4);

  return Number(total);
}
