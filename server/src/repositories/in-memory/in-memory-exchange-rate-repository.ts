import { randomUUID } from 'node:crypto';

import { Prisma, ExchangeRate } from '@prisma/client';
import { ExchangeRateRepository } from '@/repositories/exchange-rate-repository';
import { Pagination, DateFilter } from '@/@Types/pagination';

export class InMemoryExchangeRateRepository implements ExchangeRateRepository {
  public items: ExchangeRate[] = [];

  async save(data: Prisma.ExchangeRateCreateInput) {
    const exchangeRate = {
      id: randomUUID(),
      ask: data.ask,
      bid: data.bid,
      high: data.high,
      low: data.low,
      value: data.value,
      created_at: (data.created_at as Date) || new Date(),
      updated_at: (data.created_at as Date) || new Date(),
    };

    this.items.push(exchangeRate);

    return exchangeRate;
  }

  async findMostRecent() {
    const exchangeRates = this.items.sort(
      (a, b) => b.created_at.getTime() - a.created_at.getTime(),
    );

    return exchangeRates[0];
  }

  async findByCurrentDay() {
    const currentDate = new Date();

    return this.items.filter((item) => {
      const itemDate = new Date(item.created_at);
      return (
        itemDate.getDate() === currentDate.getDate() &&
        itemDate.getMonth() === currentDate.getMonth() &&
        itemDate.getFullYear() === currentDate.getFullYear()
      );
    });
  }

  async fetchExchangeRate({ page, to = '', from = '' }: Pagination) {
    if ((to === undefined && from === undefined) || (to === '' && from === '')) {
      return this.items
        .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
        .slice((page - 1) * 10, page * 10);
    }

    const fromDate = new Date(to);
    const toDate = new Date(from);

    return this.items
      .filter((item) => item.created_at >= fromDate && item.created_at <= toDate)
      .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
      .slice((page - 1) * 10, page * 10);
  }

  async countWithFilter({ to = '', from = '' }: DateFilter) {
    if ((to === undefined && from === undefined) || (to === '' && from === '')) {
      return this.items.length;
    }

    const fromDate = new Date(to);
    const toDate = new Date(from);

    return this.items.filter((item) => item.created_at >= fromDate && item.created_at <= toDate)
      .length;
  }

  async count() {
    return this.items.length;
  }
}
