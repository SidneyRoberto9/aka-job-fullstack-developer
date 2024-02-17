import { FastifyInstance } from 'fastify';

import { verifyJwt } from '@/http/middleware/verify-jwt';
import { session } from '@/http/controller/users/session/session';
import { register } from '@/http/controller/users/register/register';
import { profile } from '@/http/controller/users/profile/profile';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/session', session);

  app.get('/me', { onRequest: [verifyJwt] }, profile);
}
