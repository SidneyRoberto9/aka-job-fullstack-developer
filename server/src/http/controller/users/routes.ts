import { FastifyInstance } from 'fastify';

import { register } from '@/http/controller/users/register/register';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register);
}
