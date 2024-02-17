import { ExchangeRate } from '@prisma/client';
import { ExchangeRateRepository } from '@/repositories/exchange-rate-repository';

interface FetchFromExternalApiRequest {
  page: number;
  date?: string;
}

interface FetchFromExternalApiResponse {
  total: number;
  hasNext: boolean;
  data: ExchangeRate[];
}

export class FetchExchangeRateUseCase {
  constructor(private exchangeRateRepository: ExchangeRateRepository) {}

  async execute({
    page,
    date,
  }: FetchFromExternalApiRequest): Promise<FetchFromExternalApiResponse> {
    const data = await this.exchangeRateRepository.fetchExchangeRate({
      page,
      date,
    });

    const total = await this.exchangeRateRepository.count();

    const hasNext = 10 * page <= total;

    return {
      total,
      hasNext,
      data,
    };
  }
}
