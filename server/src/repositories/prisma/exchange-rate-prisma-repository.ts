import { Prisma } from '@prisma/client';
import { ExchangeRateRepository } from '@/repositories/exchange-rate-repository';
import { prisma } from '@/lib/prisma';

export class PrismExchangeRateRepository implements ExchangeRateRepository {
  async save(data: Prisma.ExchangeRateCreateInput) {
    const user = await prisma.exchangeRate.create({
      data,
    });

    return user;
  }
}
