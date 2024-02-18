import { it, expect, describe, beforeEach } from 'vitest';

import { NotFoundError } from '@/use-cases/errors/not-found-error';
import { GetInfoExchangeRateUseCase } from '@/use-cases/cases/get-info-exchange-rate/get-info-exchange-rate';
import { InMemoryExchangeRateRepository } from '@/repositories/in-memory/in-memory-exchange-rate-repository';

let exchangeRateRepository: InMemoryExchangeRateRepository;
let sut: GetInfoExchangeRateUseCase;

describe('Get Info Exchange Rate Use Case', () => {
  beforeEach(() => {
    exchangeRateRepository = new InMemoryExchangeRateRepository();
    sut = new GetInfoExchangeRateUseCase(exchangeRateRepository);
  });

  it('should be able to not get info', async () => {
    await expect(() =>
      sut.execute({
        currency: 'USD',
      }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should be able to get info', async () => {
    await exchangeRateRepository.save({
      ask: 5.5,
      bid: 5.5,
      high: 5.5,
      low: 5.5,
      value: 5.5,
      currency: 'USD',
    });

    const { avg, max, min } = await sut.execute({
      currency: 'USD',
    });

    expect(avg).toEqual(5.5);
    expect(max).toEqual(5.5);
    expect(min).toEqual(5.5);
  });
});
