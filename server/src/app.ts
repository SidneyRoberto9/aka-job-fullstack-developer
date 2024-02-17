import fastifyCron from 'fastify-cron';
import fastify from 'fastify';

import fastifyJwt from '@fastify/jwt';
import { makeFetchAndSaveExchangeRateUseCase } from '@/use-cases/factories/make-fetch-and-save-exchange-rate-use-case';
import { usersRoutes } from '@/http/controller/users/routes';
import { exchangeRateRoutes } from '@/http/controller/exchange-rate/routes';
import { env } from '@/env';

export const app = fastify({
  logger: true,
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
