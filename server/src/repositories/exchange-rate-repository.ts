import { Prisma, ExchangeRate } from '@prisma/client';
import { Pagination, DateFilter } from '@/@Types/pagination';
import { ICurrency } from '@/@Types/currency';

export interface ExchangeRateRepository {
  save(data: Prisma.ExchangeRateCreateInput): Promise<ExchangeRate>;
  findMostRecent(currency: ICurrency): Promise<ExchangeRate | null>;
  findByCurrentDay(currency: ICurrency): Promise<ExchangeRate[]>;
  fetchExchangeRate(currency: ICurrency, { page, to, from }: Pagination): Promise<ExchangeRate[]>;
  countWithFilter(currency: ICurrency, { to, from }: DateFilter): Promise<number>;
  count(currency: ICurrency): Promise<number>;
}
