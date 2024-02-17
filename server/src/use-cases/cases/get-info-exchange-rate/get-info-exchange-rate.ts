import { calculateTotalAverage } from '@/util/calculate-avg-from-exchange-rate';
import { NotFoundError } from '@/use-cases/errors/not-found-error';
import { ExchangeRateRepository } from '@/repositories/exchange-rate-repository';

interface GetInfoExchangeRateUseCaseResponse {
  avg: number;
  min: number;
  max: number;
}

export class GetInfoExchangeRateUseCase {
  constructor(private exchangeRateRepository: ExchangeRateRepository) {}

  async execute(): Promise<GetInfoExchangeRateUseCaseResponse> {
    const mostRecentExchangeRates = await this.exchangeRateRepository.findMostRecent();

    if (!mostRecentExchangeRates) {
      throw new NotFoundError();
    }

    const exchangeRates = await this.exchangeRateRepository.findByCurrentDay();

    const dto: GetInfoExchangeRateUseCaseResponse = {
      avg: calculateTotalAverage(exchangeRates),
      min: mostRecentExchangeRates.low,
      max: mostRecentExchangeRates.high,
    };

    return dto;
  }
}
