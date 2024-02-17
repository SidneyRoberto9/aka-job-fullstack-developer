import { FetchAndSaveExchangeRateUseCase } from '@/use-cases/cases/fetch-and-save-exchange-rate/fetch-and-save-exchange-rate';
import { PrismExchangeRateRepository } from '@/repositories/prisma/exchange-rate-prisma-repository';

export function makeFetchAndSaveExchangeRateUseCase(): FetchAndSaveExchangeRateUseCase {
  const exchangeRateRepository = new PrismExchangeRateRepository();
  const fetchAndSaveExchangeRateUseCase = new FetchAndSaveExchangeRateUseCase(
    exchangeRateRepository,
  );

  return fetchAndSaveExchangeRateUseCase;
}
