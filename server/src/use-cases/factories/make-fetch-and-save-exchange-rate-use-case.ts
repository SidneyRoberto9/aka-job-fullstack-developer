import { FetchAndSaveExchangeRateUseCase } from '@/use-cases/cases/fetch-and-save-exchange-rate/fetch-and-save-exchange-rate';
import { PrismaExchangeRateRepository } from '@/repositories/prisma/exchange-rate-prisma-repository';

export function makeFetchAndSaveExchangeRateUseCase(): FetchAndSaveExchangeRateUseCase {
  const exchangeRateRepository = new PrismaExchangeRateRepository();
  const fetchAndSaveExchangeRateUseCase = new FetchAndSaveExchangeRateUseCase(
    exchangeRateRepository,
  );

  return fetchAndSaveExchangeRateUseCase;
}
