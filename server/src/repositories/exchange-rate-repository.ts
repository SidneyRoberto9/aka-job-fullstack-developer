import { Prisma, ExchangeRate } from '@prisma/client';
import { Pagination } from '@/@Types/pagination';

export interface ExchangeRateRepository {
  save(data: Prisma.ExchangeRateCreateInput): Promise<ExchangeRate>;
  findMostRecent(): Promise<ExchangeRate | null>;
  findByCurrentDay(): Promise<ExchangeRate[]>;
  fetchExchangeRate({ page, to, from }: Pagination): Promise<ExchangeRate[]>;
  count(): Promise<number>;
}
