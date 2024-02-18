import { it, expect, describe, beforeEach } from 'vitest';

import { FetchExchangeRateUseCase } from '@/use-cases/cases/fetch-exchange-rate/fetch-exchange-rate';
import { InMemoryExchangeRateRepository } from '@/repositories/in-memory/in-memory-exchange-rate-repository';

let exchangeRateRepository: InMemoryExchangeRateRepository;
let sut: FetchExchangeRateUseCase;

describe('Fetch Exchange Rate Use Case', () => {
  beforeEach(() => {
    exchangeRateRepository = new InMemoryExchangeRateRepository();
    sut = new FetchExchangeRateUseCase(exchangeRateRepository);
  });

  it('should be able to fetch items with zero items in database', async () => {
    const { data, hasNext, total } = await sut.execute({ page: 1 });

    expect(data).toHaveLength(0);
    expect(hasNext).toBe(false);
    expect(total).toBe(0);
  });

  it('should be able to fetch items ', async () => {
    for (let i = 0; i < 11; i++) {
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

    const { data, hasNext, total } = await sut.execute({ page: 1, currency: 'USD' });

    expect(data).toHaveLength(10);
    expect(hasNext).toBe(true);
    expect(total).toBe(11);
  });

  it('should be able to fetch items in second page', async () => {
    for (let i = 0; i < 12; i++) {
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

    const { data, hasNext, total } = await sut.execute({ page: 2, currency: 'USD' });

    expect(data).toHaveLength(2);
    expect(hasNext).toBe(false);
    expect(total).toBe(12);
  });

  it('should be able to fetch items with date filter far', async () => {
    for (let i = 0; i < 12; i++) {
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

    const { data, hasNext, total } = await sut.execute({
      page: 2,
      to: '2022-09-01T03:00:00Z',
      from: '2022-09-01T03:00:00Z',
    });

    expect(data).toHaveLength(0);
    expect(hasNext).toBe(false);
    expect(total).toBe(0);
  });

  it('should be able to fetch items with date filter nearby', async () => {
    for (let i = 0; i < 10; i++) {
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

    await exchangeRateRepository.save({
      ask: 5.5,
      bid: 5.5,
      high: 5.5,
      low: 5.5,
      value: 5.5,
      currency: 'USD',
      created_at: new Date('2022-09-01T03:30:00Z'),
      updated_at: new Date('2022-09-01T03:30:00Z'),
    });

    const { data, hasNext, total } = await sut.execute({
      currency: 'USD',
      page: 1,
      to: '2022-09-01T03:00:00Z',
      from: '2022-09-01T04:00:00Z',
    });

    expect(data).toHaveLength(1);
    expect(hasNext).toBe(false);
    expect(total).toBe(1);
  });
});
