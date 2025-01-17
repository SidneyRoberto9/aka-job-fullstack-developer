import { it, expect, describe, beforeAll, afterAll } from 'vitest';
import request from 'supertest';

import { app } from '@/app';

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to register', async () => {
    const response = await request(app.server).post('/api/users').send({
      name: 'John Doe',
      email: 'johnDoe@example.com',
      password: '123456',
    });

    expect(response.statusCode).toBe(201);
  });
});
