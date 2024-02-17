import { ZodError } from 'zod';
import fastifyCron from 'fastify-cron';
import fastify from 'fastify';

import fastifyJwt from '@fastify/jwt';
import cors from '@fastify/cors';
import { makeFetchAndSaveExchangeRateUseCase } from '@/use-cases/factories/make-fetch-and-save-exchange-rate-use-case';
import { usersRoutes } from '@/http/controller/users/routes';
import { exchangeRateRoutes } from '@/http/controller/exchange-rate/routes';
import { env } from '@/env';

export const app = fastify({
  logger: true,
});

app.register(cors, {
  origin: '*',
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '10m',
  },
});

app.register(fastifyCron, {
  jobs: [
    {
      cronTime: '*/1 * * * *',
      onTick: () => makeFetchAndSaveExchangeRateUseCase().execute(app),
    },
  ],
});

app.register(usersRoutes);
app.register(exchangeRateRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Validation error.', issues: error.format() });
  }

  return reply.status(500).send({ message: 'Internal server error.' });
});
