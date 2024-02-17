import { FetchExchangeRateUseCase } from '@/use-cases/cases/fetch-exchange-rate/fetch-exchange-rate';
import { PrismaExchangeRateRepository } from '@/repositories/prisma/exchange-rate-prisma-repository';

export function makeFetchExchangeRateUseCase() {
  const exchangeRateRepository = new PrismaExchangeRateRepository();
  const fetchExchangeRateUseCase = new FetchExchangeRateUseCase(exchangeRateRepository);

  return fetchExchangeRateUseCase;
}
