import { it, expect, describe, beforeAll, afterAll } from 'vitest';
import request from 'supertest';

import { createAndAuthenticateUser } from '@/util/test/create-and-authenticate-user';
import { prisma } from '@/lib/prisma';
import { app } from '@/app';

describe('Exchange Rate Info (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able get info', async () => {
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
      .get('/api/exchange-rate/info')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      data: expect.objectContaining({
        avg: 5.5,
        max: 5.5,
        min: 5.5,
      }),
    });
  });
});
