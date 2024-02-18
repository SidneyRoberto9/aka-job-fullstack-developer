import { ExchangeRate } from '@prisma/client';
import { NotFoundError } from '@/use-cases/errors/not-found-error';
import {
  ExchangeRateFormattedDate,
  toExchangeRateFormattedDate,
} from '@/use-cases/dto/exchange-rate-formatted-date';
import { ExchangeRateRepository } from '@/repositories/exchange-rate-repository';

interface GetVariationInCurrentDayResponse {
  exchangeRate: ExchangeRateFormattedDate[];
}

export class GetVariationInCurrentDayUseCase {
  constructor(private exchangeRateRepository: ExchangeRateRepository) {}

  async execute(): Promise<GetVariationInCurrentDayResponse> {
    const exchangeRate = await this.exchangeRateRepository.findByCurrentDay();

    if (exchangeRate.length === 0) {
      throw new NotFoundError();
    }

    return {
      exchangeRate: exchangeRate.map(toExchangeRateFormattedDate),
    };
  }
}
