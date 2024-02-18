import {
  ExchangeRateFormattedDate,
  toExchangeRateFormattedDate,
} from '@/use-cases/dto/exchange-rate-formatted-date';
import { ExchangeRateRepository } from '@/repositories/exchange-rate-repository';
import { ICurrency } from '@/@Types/currency';

interface FetchFromExternalApiRequest {
  currency?: ICurrency;
  page: number;
  to?: string;
  from?: string;
}

interface FetchFromExternalApiResponse {
  total: number;
  hasNext: boolean;
  data: ExchangeRateFormattedDate[];
}

export class FetchExchangeRateUseCase {
  constructor(private exchangeRateRepository: ExchangeRateRepository) {}

  async execute({
    currency,
    page,
    to,
    from,
  }: FetchFromExternalApiRequest): Promise<FetchFromExternalApiResponse> {
    const actualCurrency = currency === undefined ? 'USD' : currency;

    const data = await this.exchangeRateRepository.fetchExchangeRate(actualCurrency, {
      page,
      to,
      from,
    });

    const total = await this.exchangeRateRepository.countWithFilter(actualCurrency, {
      to,
      from,
    });

    const hasNext = 10 * page <= total;

    return {
      total,
      hasNext,
      data: data.map(toExchangeRateFormattedDate),
    };
  }
}
