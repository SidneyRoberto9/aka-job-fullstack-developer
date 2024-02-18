import {
  ExchangeRateFormattedDate,
  toExchangeRateFormattedDate,
} from '@/use-cases/dto/exchange-rate-formatted-date';
import { ExchangeRateRepository } from '@/repositories/exchange-rate-repository';

interface FetchFromExternalApiRequest {
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
    page,
    to,
    from,
  }: FetchFromExternalApiRequest): Promise<FetchFromExternalApiResponse> {
    const data = await this.exchangeRateRepository.fetchExchangeRate({
      page,
      to,
      from,
    });

    const total = await this.exchangeRateRepository.count();

    const hasNext = 10 * page <= total;

    return {
      total,
      hasNext,
      data: data.map(toExchangeRateFormattedDate),
    };
  }
}
