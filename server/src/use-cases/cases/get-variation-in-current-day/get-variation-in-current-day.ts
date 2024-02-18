import {
  ExchangeRateFormattedDate,
  toExchangeRateFormattedDate,
} from '@/use-cases/dto/exchange-rate-formatted-date';
import { ExchangeRateRepository } from '@/repositories/exchange-rate-repository';
import { ICurrency } from '@/@Types/currency';

interface GetVariationInCurrentDayRequest {
  currency?: ICurrency;
}

interface GetVariationInCurrentDayResponse {
  exchangeRate: ExchangeRateFormattedDate[];
}

export class GetVariationInCurrentDayUseCase {
  constructor(private exchangeRateRepository: ExchangeRateRepository) {}

  async execute({
    currency,
  }: GetVariationInCurrentDayRequest): Promise<GetVariationInCurrentDayResponse> {
    const exchangeRate = await this.exchangeRateRepository.findByCurrentDay(
      currency === undefined ? 'USD' : currency,
    );

    return {
      exchangeRate: exchangeRate.map(toExchangeRateFormattedDate),
    };
  }
}
