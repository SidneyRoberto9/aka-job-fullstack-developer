import { ExchangeRate } from '@prisma/client';
import { NotFoundError } from '@/use-cases/errors/not-found-error';
import { ExchangeRateRepository } from '@/repositories/exchange-rate-repository';

interface GetVariationInCurrentDayResponse {
  exchangeRate: ExchangeRate[];
}

export class GetVariationInCurrentDayUseCase {
  constructor(private exchangeRateRepository: ExchangeRateRepository) {}

  async execute(): Promise<GetVariationInCurrentDayResponse> {
    const exchangeRate = await this.exchangeRateRepository.findByCurrentDay();

    if (exchangeRate.length === 0) {
      throw new NotFoundError();
    }

    return {
      exchangeRate,
    };
  }
}
