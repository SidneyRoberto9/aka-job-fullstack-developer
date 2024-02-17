import { GetInfoExchangeRateUseCase } from '@/use-cases/cases/get-info-exchange-rate/get-info-exchange-rate';
import { PrismaExchangeRateRepository } from '@/repositories/prisma/exchange-rate-prisma-repository';

export function makeGetInfoExchangeRateUseCase(): GetInfoExchangeRateUseCase {
  const exchangeRateRepository = new PrismaExchangeRateRepository();
  const getInfoUseCase = new GetInfoExchangeRateUseCase(exchangeRateRepository);

  return getInfoUseCase;
}
