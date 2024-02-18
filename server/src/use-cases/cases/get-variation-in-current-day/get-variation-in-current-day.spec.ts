import { it, expect, describe, beforeEach } from 'vitest';

import { GetVariationInCurrentDayUseCase } from '@/use-cases/cases/get-variation-in-current-day/get-variation-in-current-day';
import { InMemoryExchangeRateRepository } from '@/repositories/in-memory/in-memory-exchange-rate-repository';

let exchangeRateRepository: InMemoryExchangeRateRepository;
let sut: GetVariationInCurrentDayUseCase;

describe('Get Variation in Current Day Use Case', () => {
  beforeEach(() => {
    exchangeRateRepository = new InMemoryExchangeRateRepository();
    sut = new GetVariationInCurrentDayUseCase(exchangeRateRepository);
  });

  it('should be able to get variation in current day', async () => {
    await exchangeRateRepository.save({
      ask: 5.5,
      bid: 5.5,
      high: 5.5,
      low: 5.5,
      value: 5.5,
      currency: 'USD',
      created_at: new Date('2022-09-01T03:00:00Z'),
      updated_at: new Date('2022-09-01T03:00:00Z'),
    });

    for (let i = 0; i < 5; i++) {
      await exchangeRateRepository.save({
        ask: 5.5,
        bid: 5.5,
        high: 5.5,
        low: 5.5,
        value: 5.5,
        currency: 'USD',
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    const { exchangeRate } = await sut.execute({
      currency: 'USD',
    });

    expect(exchangeRate).toHaveLength(5);
  });

  it('should be able to get variation in current day', async () => {
    await exchangeRateRepository.save({
      ask: 5.5,
      bid: 5.5,
      high: 5.5,
      low: 5.5,
      value: 5.5,
      created_at: new Date('2022-09-01T03:00:00Z'),
      updated_at: new Date('2022-09-01T03:00:00Z'),
    });

    const { exchangeRate } = await sut.execute({
      currency: 'USD',
    });

    expect(exchangeRate).toHaveLength(0);
  });
});
