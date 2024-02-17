import { Prisma } from '@prisma/client';
import { ExchangeRateRepository } from '@/repositories/exchange-rate-repository';
import { prisma } from '@/lib/prisma';
import { Pagination } from '@/@Types/pagination';

export class PrismaExchangeRateRepository implements ExchangeRateRepository {
  async save(data: Prisma.ExchangeRateCreateInput) {
    const user = await prisma.exchangeRate.create({
      data,
    });

    return user;
  }

  async findMostRecent() {
    const exchangeRate = await prisma.exchangeRate.findFirst({
      orderBy: {
        created_at: 'desc',
      },
    });

    return exchangeRate;
  }

  async findByCurrentDay() {
    const actualDate = new Date();

    const exchangeRate = await prisma.exchangeRate.findMany({
      where: {
        created_at: {
          gte: new Date(actualDate.setHours(0, 0, 0, 0)),
          lt: new Date(actualDate.setHours(23, 59, 59, 999)),
        },
      },
    });

    return exchangeRate;
  }

  async fetchExchangeRate({ page, date }: Pagination) {
    if (date === '') {
      return await prisma.exchangeRate.findMany({
        skip: (page - 1) * 10,
        take: 10,
      });
    } else {
      return await prisma.exchangeRate.findMany({
        skip: (page - 1) * 10,
        take: 10,
        where: {
          created_at: {
            equals: date,
          },
        },
      });
    }
  }

  async count() {
    return await prisma.exchangeRate.count();
  }
}
