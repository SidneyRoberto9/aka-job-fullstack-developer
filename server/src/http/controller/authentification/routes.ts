import { FastifyInstance } from 'fastify';

import { sessionDocs } from '@/http/controller/authentification/session/session.docs';
import { session } from '@/http/controller/authentification/session/session';
import { registerDocs } from '@/http/controller/authentification/register/register.docs';
import { register } from '@/http/controller/authentification/register/register';

export async function authenticationRoutes(app: FastifyInstance) {
  app.post('/users', registerDocs, register);
  app.post('/session', sessionDocs, session);
}
