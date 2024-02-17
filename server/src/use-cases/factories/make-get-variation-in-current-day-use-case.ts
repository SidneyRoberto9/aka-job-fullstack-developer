import { GetVariationInCurrentDayUseCase } from '@/use-cases/cases/get-variation-in-current-day/get-variation-in-current-day';
import { PrismaExchangeRateRepository } from '@/repositories/prisma/exchange-rate-prisma-repository';

export function makeGetVariationExchangeRateUseCase() {
  const exchangeRateRepository = new PrismaExchangeRateRepository();
  const getVariationInCurrentDayUseCase = new GetVariationInCurrentDayUseCase(
    exchangeRateRepository,
  );

  return getVariationInCurrentDayUseCase;
}
