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

    return {
      exchangeRate: exchangeRate.map(toExchangeRateFormattedDate),
    };
  }
}
