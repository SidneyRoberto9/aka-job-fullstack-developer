import { FastifyInstance } from 'fastify';

import { info } from '@/http/controller/exchange-rate/info/info';

export async function exchangeRateRoutes(app: FastifyInstance) {
  app.get('/exchange-rate/info', info);
}
