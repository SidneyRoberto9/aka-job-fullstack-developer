import { calculateTotalAverage } from '@/util/calculate-avg-from-exchange-rate';
import { NotFoundError } from '@/use-cases/errors/not-found-error';
import { ExchangeRateRepository } from '@/repositories/exchange-rate-repository';
import { ICurrency } from '@/@Types/currency';

interface GetInfoExchangeRateUseCaseRequest {
  currency?: ICurrency;
}

interface GetInfoExchangeRateUseCaseResponse {
  avg: number;
  min: number;
  max: number;
}

export class GetInfoExchangeRateUseCase {
  constructor(private exchangeRateRepository: ExchangeRateRepository) {}

  async execute({
    currency,
  }: GetInfoExchangeRateUseCaseRequest): Promise<GetInfoExchangeRateUseCaseResponse> {
    const actualCurrency = currency === undefined ? 'USD' : currency;

    const mostRecentExchangeRates = await this.exchangeRateRepository.findMostRecent(
      actualCurrency,
    );

    if (!mostRecentExchangeRates) {
      throw new NotFoundError();
    }

    const exchangeRates = await this.exchangeRateRepository.findByCurrentDay(actualCurrency);

    const dto: GetInfoExchangeRateUseCaseResponse = {
      avg: calculateTotalAverage(exchangeRates),
      min: mostRecentExchangeRates.low,
      max: mostRecentExchangeRates.high,
    };

    return dto;
  }
}
