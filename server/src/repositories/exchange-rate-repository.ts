import { Prisma, ExchangeRate } from '@prisma/client';

export interface ExchangeRateRepository {
  save(data: Prisma.ExchangeRateCreateInput): Promise<ExchangeRate>;
  findMostRecent(): Promise<ExchangeRate | null>;
  findByCurrentDay(): Promise<ExchangeRate[]>;
}
