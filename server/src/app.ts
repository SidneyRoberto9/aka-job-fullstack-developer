import { ZodError } from 'zod';
import fastifyCron from 'fastify-cron';
import fastify from 'fastify';

import { fastifySwaggerUi } from '@fastify/swagger-ui';
import fastifySwagger from '@fastify/swagger';
import fastifyJwt from '@fastify/jwt';
import cors from '@fastify/cors';
import { makeFetchAndSaveExchangeRateUseCase } from '@/use-cases/factories/make-fetch-and-save-exchange-rate-use-case';
import { usersRoutes } from '@/http/controller/users/routes';
import { exchangeRateRoutes } from '@/http/controller/exchange-rate/routes';
import { authenticationRoutes } from '@/http/controller/authentification/routes';
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
    expiresIn: '7d',
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

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'AKASOFT API',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: '/api/docs',
});

app.register(usersRoutes, { prefix: '/api' });
app.register(authenticationRoutes, { prefix: '/api' });
app.register(exchangeRateRoutes, { prefix: '/api' });

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Validation error.', issues: error.format() });
  }

  console.log(error);

  return reply.status(500).send({ message: 'Internal server error.' });
});
