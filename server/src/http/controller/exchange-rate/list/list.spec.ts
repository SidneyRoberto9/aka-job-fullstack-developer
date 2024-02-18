import { it, expect, describe, beforeAll, afterAll } from 'vitest';
import request from 'supertest';

import { createAndAuthenticateUser } from '@/util/test/create-and-authenticate-user';
import { prisma } from '@/lib/prisma';
import { app } from '@/app';

describe('Exchange Rate List (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able get exchange rate list', async () => {
    const { token } = await createAndAuthenticateUser(app);

    await prisma.exchangeRate.create({
      data: {
        ask: 5.5,
        bid: 5.5,
        high: 5.5,
        low: 5.5,
        value: 5.5,
        currency: 'USD',
      },
    });

    const response = await request(app.server)
      .post('/api/exchange-rate')
      .set('Authorization', `Bearer ${token}`)
      .send({
        page: 1,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      data: expect.arrayContaining([
        expect.objectContaining({
          ask: 5.5,
          bid: 5.5,
          high: 5.5,
          low: 5.5,
          value: 5.5,
          currency: 'USD',
        }),
      ]),
      hasNext: expect.any(Boolean),
      total: expect.any(Number),
    });
  });
});
