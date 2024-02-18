export const currentDayVariationDocs = {
  schema: {
    security: [{ bearerAuth: [] }],
    description:
      "The current-day-variation endpoint returns all variations of the day's dollar to real conversion rate.",
    tags: ['Exchange Rate'],
    summary: 'Get Exchange Rate Data Variation of the Current Day',
  },
};
import { it, expect, describe, beforeAll, afterAll } from 'vitest';
import request from 'supertest';

import { createAndAuthenticateUser } from '@/util/test/create-and-authenticate-user';
import { prisma } from '@/lib/prisma';
import { app } from '@/app';

describe('Current Day Variation (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able get current day variation', async () => {
    const { token } = await createAndAuthenticateUser(app);

    for (let i = 0; i < 5; i++) {
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
    }

    const response = await request(app.server)
      .get('/api/exchange-rate/variation')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toHaveLength(5);
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
    });
  });
});
