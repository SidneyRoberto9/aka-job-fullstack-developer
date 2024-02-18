import { it, expect, describe, beforeAll, afterAll } from 'vitest';
import request from 'supertest';

import { app } from '@/app';

describe('Session (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to authenticate', async () => {
    await request(app.server).post('/api/users').send({
      name: 'John Doe',
      email: 'johnDoe@example.com',
      password: '123456',
    });

    const response = await request(app.server).post('/api/session').send({
      email: 'johnDoe@example.com',
      password: '123456',
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      token: expect.any(String),
      user: expect.objectContaining({
        email: 'johnDoe@example.com',
      }),
    });
  });
});
