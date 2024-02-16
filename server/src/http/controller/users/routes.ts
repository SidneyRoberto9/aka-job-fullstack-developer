import { FastifyInstance } from 'fastify';

import { session } from '@/http/controller/users/session/session';
import { register } from '@/http/controller/users/register/register';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/session', session);
}
