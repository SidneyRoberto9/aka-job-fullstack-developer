import { FastifyInstance } from 'fastify';

import { verifyJwt } from '@/http/middleware/verify-jwt';
import { profileDocs } from '@/http/controller/users/profile/profile.docs';
import { profile } from '@/http/controller/users/profile/profile';

export async function usersRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.get('/me', profileDocs, profile);
}
