import { Prisma } from '@prisma/client';
import { ExchangeRateRepository } from '@/repositories/exchange-rate-repository';
import { prisma } from '@/lib/prisma';
import { Pagination, DateFilter } from '@/@Types/pagination';
import { ICurrency } from '@/@Types/currency';

export class PrismaExchangeRateRepository implements ExchangeRateRepository {
  async save(data: Prisma.ExchangeRateCreateInput) {
    const user = await prisma.exchangeRate.create({
      data,
    });

    return user;
  }

  async findMostRecent(currency: ICurrency) {
    const exchangeRate = await prisma.exchangeRate.findFirst({
      where: {
        currency: currency,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return exchangeRate;
  }

  async findByCurrentDay(currency: ICurrency) {
    const actualDate = new Date();

    const exchangeRate = await prisma.exchangeRate.findMany({
      where: {
        currency: currency,
        created_at: {
          gte: new Date(actualDate.setHours(0, 0, 0, 0)),
          lt: new Date(actualDate.setHours(23, 59, 59, 999)),
        },
      },
    });

    return exchangeRate;
  }

  async fetchExchangeRate(currency: ICurrency, { page, to, from }: Pagination) {
    if ((to === undefined && from === undefined) || (to === '' && from === '')) {
      return await prisma.exchangeRate.findMany({
        skip: (page - 1) * 10,
        take: 10,
        where: {
          currency: {
            equals: currency,
          },
        },
        orderBy: {
          created_at: 'desc',
        },
      });
    }

    const fromDate = new Date(from!);
    const toDate = new Date(to!);

    return await prisma.exchangeRate.findMany({
      skip: (page - 1) * 10,
      take: 10,
      where: {
        currency: {
          equals: currency,
        },
        created_at: {
          gte: fromDate,
          lt: toDate,
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async count(currency: ICurrency) {
    return await prisma.exchangeRate.count({
      where: {
        currency: currency,
      },
    });
  }

  async countWithFilter(currency: ICurrency, { to, from }: DateFilter) {
    if ((to === undefined && from === undefined) || (to === '' && from === '')) {
      return await prisma.exchangeRate.count({
        where: {
          currency: currency,
        },
      });
    }

    const fromDate = new Date(from!);
    const toDate = new Date(to!);

    return await prisma.exchangeRate.count({
      where: {
        currency: currency,
        created_at: {
          gte: fromDate,
          lt: toDate,
        },
      },
    });
  }
}
